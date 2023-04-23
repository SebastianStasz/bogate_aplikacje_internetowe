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
} from "./validators.js";

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

app.get("/api/getData", (req, res) => {
  const sql = `select * from user`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

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
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });
    res.status(200).json({auth: {user: row.userName}});
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
          res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });
          res.status(200).json("Pomyślnie zarejestrowano");
        }
      );
    }
  });
});

app.get("/api/myRecipes", authenticateToken, (req, res) => {
  const sql = `select * from recipe WHERE userId = ${req.user.userId}`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

app.get("/api/recipesList/:page", (req, res) => {
  const recipesPerPage = 6;
  const currentPage = parseInt(req.params.page);
  const sql = `select recipe.id, recipe.recipeName, recipe.description, (SELECT AVG(rating) FROM recipe_rating WHERE recipe_rating.recipeId = recipe.id) AS rating from recipe`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res
      .status(200)
      .json({
        recipes: rows.slice(
          (currentPage - 1) * recipesPerPage,
          (currentPage - 1) * recipesPerPage + recipesPerPage
        ),
        recipesNumber: rows.length,
      });
  });
});

// This needs to be after all /api/ routes
app.use(history());
app.use(staticEx(join(__dirname, "..", "frontend", "dist")));

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`server started on ${process.env.HOST}:${process.env.PORT}`);
});
