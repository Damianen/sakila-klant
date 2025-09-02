import pool from "../db/pool.js";

export function GetAllFilms(callback) {
    const sql = "SELECT * FROM film";
    pool.query(sql, function(err, rows) {
        if (err) return callback(err);
        callback(null, rows);
    })
}
