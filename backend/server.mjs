import { join } from "path";
import express, { static as staticEx } from "express";
import cors from "cors";
import path from "path";
import history from "connect-history-api-fallback";
import { db } from "./database.mjs";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv'

dotenv.config()
const app = express();
const __dirname = path.resolve();

// WARNING: order of those app. actually matters

app.use(cors());

app.get("/api/getData", (req, res) => {
  // var token = jwt.sign({ userId: 1 }, process.env.SECRET_KEY);
  // var decoded = jwt.verify(token, process.env.SECRET_KEY);
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
    res.status(200).json({ auth: { token: token } });
  });
});

app.get("/api/myRecipes", (req, res) => {
  var token = req.header("auth-token");
  var decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (true) {
    const sql = `select * from recipe`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(200).json(decoded);
    });
  }
});

// This needs to be after all /api/ routes
app.use(history());
app.use(staticEx(join(__dirname, "..", "frontend", "dist")));

// app.get('/*', (req, res) => {
//     res.sendFile(join(__dirname, "..", "frontend", "dist"))
// })

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log("server started on port 5000");
});
