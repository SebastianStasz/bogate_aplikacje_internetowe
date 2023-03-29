import sqlite3 from "sqlite3";

const DBSOURCE = "db.sqlite";

export let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.error(err.message);
    throw err;
  } else {
    console.log("Connected to the SQLite database.");
    db.serialize(() => {
      db.run(`PRAGMA foreign_keys = ON`);
      db.run(
        `CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email text,
            password text,
            userName text,
            createdAt text
            )`,
        (err) => {}
      );

      db.run(
        `CREATE TABLE recipe (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            recipeName text,
            ingredients text,
            preparation text,
            createdAt text,
            FOREIGN KEY(userId) REFERENCES user(id)
            )`,
        (err) => {}
      );

      db.run(
        `CREATE TABLE recipe_rating (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            recipeId INTEGER NOT NULL,
            rating REAL,
            FOREIGN KEY(userId) REFERENCES user(id),
            FOREIGN KEY(recipeId) REFERENCES recipe(id)
            )`,
        (err) => {
          if (err) {
            // Table already created
          } else {
            // Table just created, creating some rows
            db.serialize(() => {
              var insert =
                "INSERT INTO user (email, password, userName, createdAt) VALUES (?,?,?,?)";
              db.run(insert, [
                "przemek@example.com",
                "pass123",
                "Przemek",
                "20.01.2023",
              ]);
              db.run(insert, [
                "paweł@example.com",
                "pass456",
                "Pawełk",
                "22.02.2023",
              ]);
              db.run(insert, [
                "sebastian@example.com",
                "pass789",
                "Sebastian",
                "24.03.2023",
              ]);

              insert =
                "INSERT INTO recipe (userId, recipeName, ingredients, preparation, createdAt) VALUES (?,?,?,?,?)";
              db.run(insert, [
                3,
                "Kopytka",
                "Składniki Kopytka",
                "Przygotowanie Kopytka",
                "01.01.2023",
              ]);
              db.run(insert, [
                2,
                "Kotlet",
                "Składniki Kotlet",
                "Przygotowanie Kotlet",
                "02.02.2023",
              ]);
              db.run(insert, [
                1,
                "Sernik",
                "Składniki Sernik",
                "Przygotowanie Sernik",
                "03.03.2023",
              ]);

              insert =
                "INSERT INTO recipe_rating (userId, recipeId, rating) VALUES (?,?,?)";
              db.run(insert, [1, 3, 3.5]);
              db.run(insert, [2, 2, 4]);
              db.run(insert, [3, 1, 1.5]);
            });
          }
        }
      );
    });
  }
});
