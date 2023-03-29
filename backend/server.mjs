import { join } from "path";
import express, { static as staticEx } from "express";
import cors from "cors";
import path from "path";
import history from "connect-history-api-fallback";
import { db } from "./database.mjs";

const HOST = "localhost";
const PORT = 5000;
const app = express();
const __dirname = path.resolve();

// WARNING: order of those app. actually matters

app.use(cors());

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

// This needs to be after all /api/ routes
app.use(history());
app.use(staticEx(join(__dirname, "..", "frontend", "dist")));

// app.get('/*', (req, res) => {
//     res.sendFile(join(__dirname, "..", "frontend", "dist"))
// })

app.listen(PORT, HOST, () => {
  console.log("server started on port 5000");
});
