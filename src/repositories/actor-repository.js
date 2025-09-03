import pool from "../db/pool.js";

export function GetAllActors(callback) {
    const sql = "SELECT * FROM actor";
    pool.query(sql, (err, rows) => {
        if (err) callback(err);
        callback(null, rows);
    });
}

export function GetActorById(id, callback) {
    const sql = "SELECT * FROM actor WHERE actor_id = ?";
    pool.query(sql, [id], (err, rows) => {
        if (err) callback(err);
        callback(null, rows);
    });
}
