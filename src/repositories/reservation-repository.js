import pool from "../db/pool.js";

export function AddReservation(inventoryId, userId, callback) {
    const sql = `INSERT INTO reservation (inventory_id,
        user_id, start_date, end_date, status, notes) VALUES (
        ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), 'reserved', NULL);`

        pool.query(sql, [inventoryId, userId], (err, rows) => {
            if (err) callback(err);
            callback(null);
        });
}

export function GetUserReservations(userId, callback) {
    const sql = "SELECT * FROM reservation WHERE user_id = ?;";

    pool.query(sql, [userId], (err, rows) => {
        if (err) callback(err);
        callback(null, rows);
    });
}

export function DeleteResorvation(id, userId, callback) {
    const sql = "DELETE FROM reservation WHERE reservation_id = ? AND user_id = ?;";

    pool.query(sql, [id, userId], (err, rows) => {
        if (err) callback(err);
        callback(null);
    });
}
