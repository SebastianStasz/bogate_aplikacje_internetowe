import { join } from "path";
import express, { static as staticEx } from "express";
import cors from "cors";
import path from "path";
import history from "connect-history-api-fallback";
import { db } from "./database.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {
  validateStringLength,
  validateEmail,
  validateRepeatedString,
  validatePostData,
  validatePositiveNumber,
  validateIsCorrectArray,
} from "./validators.js";
import { changeToList, changeFromList } from "./helperFunctions.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();

// WARNING: order of those app. actually matters

app.use(cookieParser());
app.use(
  cors({
    // origin : [process.env.HOST],
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(401);
      req.user = user;
      next();
    });
  } else res.sendStatus(401);
};

app.post("/api/login", (req, res) => {
  const loginData = req.body;
  const sql = `select id, userName from user WHERE (userName = '${loginData.login}' OR email = '${loginData.login}') AND password = '${loginData.password}'`;
  db.get(sql, [], (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (!row) return res.status(400).json("Niepoprawne dane");
    const token = jwt.sign({ userId: row.id }, process.env.SECRET_KEY);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ auth: { user: row.userName } });
  });
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" });
  res.status(200).json("Wylogowano");
});

app.post("/api/signUp", (req, res) => {
  const newData = req.body;
  const validate = validatePostData(
    validateStringLength(newData.login, 4),
    validateEmail(newData.email),
    validateStringLength(newData.password, 6),
    validateRepeatedString(newData.password, newData.passwordRepeat)
  );
  if (validate) return res.status(400).json(validate);
  var sql = `SELECT id from user WHERE userName = '${newData.login}' OR email = '${newData.email}'`;
  db.get(sql, [], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (row) {
      return res.status(400).json({ error: "Użytkownik już istnieje" });
    } else {
      sql = `INSERT INTO user (email, password, userName, createdAt) VALUES (?,?,?,?) RETURNING id, userName;`;
      db.get(
        sql,
        [newData.email, newData.password, newData.login, Date.now()],
        (err, row) => {
          if (err) {
            return res.status(400).json({ error: err.message });
          }
          const token = jwt.sign({ userId: row.id }, process.env.SECRET_KEY);
          res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          });
          res.status(200).json({ auth: { user: row.userName } });
        }
      );
    }
  });
});

app.post("/api/recipesList/:userName/:page", (req, res) => {
  const recipesPerPage = 6;

  const recipeNameSearch = req.body.recipeName || null;
  const preparationTimeFromSearch = req.body.preparationTimeFrom || null;
  const preparationTimeToSearch = req.body.preparationTimeTo || null;
  const ingredientsSearch = req.body.ingredients || null;
  const currentPage = parseInt(req.params.page);

  const validate = validatePostData(
    validateStringLength(recipeNameSearch, 4, { nullable: true }),
    validatePositiveNumber(preparationTimeFromSearch, { nullable: true }),
    validatePositiveNumber(preparationTimeToSearch, { nullable: true }),
    validateStringLength(ingredientsSearch, 3, { nullable: true })
  );
  if (validate) return res.status(400).json(validate);

  const searchSql = [];
  recipeNameSearch &&
    searchSql.push(`recipe.recipeName LIKE '%${recipeNameSearch}%'`);
  preparationTimeFromSearch &&
    searchSql.push(`recipe.preparationTime >= ${preparationTimeFromSearch}`);
  preparationTimeToSearch &&
    searchSql.push(`recipe.preparationTime <= ${preparationTimeToSearch}`);
  ingredientsSearch !== null &&
    searchSql.push(
      `(${ingredientsSearch
        .replace(/\s/g, "")
        .split(",")
        .filter(Boolean)
        .map((ingr) => `recipe.ingredients LIKE '%${ingr}%'`)
        .join(" OR ")})`
    );
  req.body.category &&
    searchSql.push(`recipe.category LIKE '${req.body.category}'`);

  if (req.params.userName !== "all")
    searchSql.push(`recipe.userId = searchUser`);

  var sql = `select recipe.id, recipe.recipeName, recipe.description, recipe.photo, (SELECT AVG(rating) FROM recipe_rating WHERE recipe_rating.recipeId = recipe.id) AS rating`;
  if (req.params.userName !== "all")
    sql += `, (SELECT id from user WHERE userName LIKE '%${req.params.userName}%') AS searchUser`;
  sql += " from recipe";
  if (searchSql.length > 0) sql += ` WHERE ${searchSql.join(" AND ")}`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({
      recipes: rows.slice(
        (currentPage - 1) * recipesPerPage,
        (currentPage - 1) * recipesPerPage + recipesPerPage
      ),
      recipesNumber: rows.length,
    });
  });
});

app.get("/api/recipeDetails/:recipeId", (req, res) => {
  var sql = `select *, (select userName FROM user WHERE recipe.userId = user.id) AS userName,
    (select GROUP_CONCAT(category,';') FROM recipe_category) AS allCategory,
    (SELECT AVG(rating) FROM recipe_rating WHERE recipe_rating.recipeId = recipe.id) AS rating`;
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (!err)
      sql += `, (SELECT rating FROM recipe_rating WHERE recipe_rating.recipeId = recipe.id AND recipe_rating.userId = ${user.userId}) AS myRating`;
  });
  sql += ` from recipe WHERE id = ${req.params.recipeId}`;

  db.get(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    if (rows === undefined)
      return res.status(404).json("Nie ma takiego przepisu");
    rows.ingredients = changeToList(rows.ingredients);
    rows.preparation = changeToList(rows.preparation);
    rows.allCategory = changeToList(rows.allCategory);
    res.status(200).json(rows);
  });
});

app.post("/api/addRecipe", authenticateToken, (req, res) => {
  var newData = req.body;
  const validate = validatePostData(
    validateStringLength(newData.description, 3),
    validatePositiveNumber(newData.preparationTime),
    validateStringLength(newData.recipeName, 3),
    validateIsCorrectArray(newData.preparation),
    validateIsCorrectArray(newData.ingredients)
  );
  if (validate) return res.status(400).json(validate);

  newData.preparation = changeFromList(newData.preparation);
  newData.ingredients = changeFromList(newData.ingredients);

  const sql = `INSERT INTO recipe (userId, description, preparationTime, recipeName, preparation, ingredients, category, photo) VALUES (?,?,?,?,?,?,?,?)`;
  db.run(
    sql,
    [
      req.user.userId,
      newData.description,
      newData.preparationTime,
      newData.recipeName,
      newData.preparation,
      newData.ingredients,
      newData.category,
      newData.photo,
    ],
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json("Success");
    }
  );
});

app.post("/api/editRecipe/:recipeId", authenticateToken, (req, res) => {
  var newData = req.body;
  // Check if logged user is allowed to change this recipe
  const sqlValidateUser = `select id from recipe WHERE userId = ${req.user.userId}`;
  db.all(sqlValidateUser, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    var foundId = rows.some((el) => el.id == req.params.recipeId);
    if (!foundId) res.sendStatus(401);
  });

  const validate = validatePostData(
    validateStringLength(newData.description, 3),
    validatePositiveNumber(newData.preparationTime),
    validateStringLength(newData.recipeName, 3),
    validateIsCorrectArray(newData.preparation),
    validateIsCorrectArray(newData.ingredients)
  );
  if (validate) return res.status(400).json(validate);

  newData.preparation = changeFromList(newData.preparation);
  newData.ingredients = changeFromList(newData.ingredients);

  const sql = `UPDATE recipe SET description = ?, preparationTime = ?, recipeName = ?, preparation = ?, ingredients = ?, category = ?, photo = ? WHERE id = ${req.params.recipeId}`;
  db.run(
    sql,
    [
      newData.description,
      newData.preparationTime,
      newData.recipeName,
      newData.preparation,
      newData.ingredients,
      newData.category,
      newData.photo,
    ],
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json("Success");
    }
  );
});

app.post("/api/deleteRecipe/:recipeId", authenticateToken, (req, res) => {
  // Check if logged user is allowed to change this recipe
  const sqlValidateUser = `select id from recipe WHERE userId = ${req.user.userId}`;
  db.all(sqlValidateUser, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    var foundId = rows.some((el) => el.id == req.params.recipeId);
    if (!foundId) res.sendStatus(401);
  });

  const sql = `DELETE FROM recipe WHERE id = ${req.params.recipeId}`;
  db.run(sql, [], (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json("Success");
  });
});

app.post("/api/changeRating/:recipeId", authenticateToken, (req, res) => {
  const sql = `INSERT INTO recipe_rating (userId, recipeId, rating) VALUES (?,?,?) ON CONFLICT (userId, recipeId) DO UPDATE SET rating = excluded.rating;`;
  db.run(
    sql,
    [req.user.userId, req.params.recipeId, req.body.myRating],
    (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json("Success");
    }
  );
});

app.get("/api/allCategories", (req, res) => {
  const sql = `select GROUP_CONCAT(category,';') AS allCategory FROM recipe_category`;
  db.get(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ allCategory: changeToList(rows.allCategory) });
  });
});

// This needs to be after all /api/ routes
app.use(history());
app.use(staticEx(join(__dirname, "..", "frontend", "dist")));

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`server started on ${process.env.HOST}:${process.env.PORT}`);
});
