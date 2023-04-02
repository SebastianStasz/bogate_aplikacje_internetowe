import { join } from "path";
import express, { static as staticEx } from "express";
import cors from "cors";
import path from "path";
import history from "connect-history-api-fallback";
import { db } from "./database.mjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();
const __dirname = path.resolve();

// WARNING: order of those app. actually matters

app.use(cors());

const authenticateToken = (req, res, next) => {
  const token = req.header("auth-token");
  const userName = req.header("auth-userName");
  const sql = `select id from user WHERE userName = '${userName}'`;

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);

      db.get(sql, [], (err, row) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        if (row.id === user.userId) {
          req.user = user;
          next();
        } else res.sendStatus(403);
      });
    });
  } else res.sendStatus(401);
};

app.get("/api/getData", (req, res) => {
  const sql = `select * from recipe`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

app.post("/api/login", (req, res) => {
  var token = jwt.sign({ userId: 1 }, process.env.SECRET_KEY);
  const sql = `select * from recipe`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.status(200).json({ auth: { token: token, userName: "Przemek" } });
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

// This needs to be after all /api/ routes
app.use(history());
app.use(staticEx(join(__dirname, "..", "frontend", "dist")));

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log("server started on port 5000");
});
