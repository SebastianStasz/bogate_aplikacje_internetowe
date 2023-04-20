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
            email text UNIQUE,
            password text,
            userName text UNIQUE,
            createdAt text,
            CONSTRAINT email_unique UNIQUE (email),
            CONSTRAINT userName_unique UNIQUE (userName)
            )`,
        (err) => {}
      );

      db.run(
        `CREATE TABLE recipe (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            recipeName text,
            description text,
            ingredients text,
            preparation text,
            createdAt integer,
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
                "INSERT INTO recipe (userId, recipeName, description, ingredients, preparation, createdAt) VALUES (?,?,?,?,?,?)";
              for (var i = 0; i < 10; i++) {
                db.run(insert, [
                  3,
                  "Kopytka",
                  "Opis potrawy Kopytka. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                  "Składniki Kopytka",
                  "Przygotowanie Kopytka",
                  "01.01.2023",
                ]);
                db.run(insert, [
                  2,
                  "Kotlet",
                  "Opis potrawy Kotlet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu mauris et risus placerat tincidunt vitae in ligula.",
                  "Składniki Kotlet",
                  "Przygotowanie Kotlet",
                  "02.02.2023",
                ]);
                db.run(insert, [
                  1,
                  "Sernik",
                  "Opis potrawy Sernik. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eu mauris et risus placerat tincidunt vitae in ligula. Morbi volutpat consequat dapibus...",
                  "Składniki Sernik",
                  "Przygotowanie Sernik",
                  "03.03.2023",
                ]);
              }

              insert =
                "INSERT INTO recipe_rating (userId, recipeId, rating) VALUES (?,?,?)";
              db.run(insert, [1, 3, 3.5]);
              db.run(insert, [1, 2, 3]);
              db.run(insert, [1, 1, 5]);
              db.run(insert, [2, 3, 1]);
              db.run(insert, [2, 2, 4]);
              db.run(insert, [3, 1, 4.5]);
            });
          }
        }
      );
    });
  }
});
