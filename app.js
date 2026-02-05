const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const layouts = require("express-ejs-layouts");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(session({
    secret: "fncourier",
    resave: false,
    saveUninitialized: true
}));

app.set("view engine", "ejs");
app.use(layouts);

const db = new sqlite3.Database("./database.db");

db.run(`
CREATE TABLE IF NOT EXISTS parcels(
id INTEGER PRIMARY KEY AUTOINCREMENT,
tracking TEXT,
sender TEXT,
receiver TEXT,
amount TEXT,
status TEXT
)`);

app.use("/", require("./routes/public"));
app.use("/admin", require("./routes/admin"));

app.listen(3000, () =>
    console.log("Server running → http://localhost:3000")
);
