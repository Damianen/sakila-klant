import express from "express";
import mysql from "mysql2/promise";
import fs from "fs";

const app = express();

const PORT = process.env.PORT || 3000;
const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
}

const pool = mysql.createPool(config);

app.get("/", (req, res) => res.send("Hello world!"));

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`App listening on port ${PORT}!`);
});
