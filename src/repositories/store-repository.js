import pool from "../db/pool.js";

export function GetStoresAvailableFilm(filmId, callback) {
    const sql =  `SELECT DISTINCT s.store_id, MIN(i.inventory_id) AS inventory_id,
                  a.address, a.address2, a.district,
                  c.city, a.postal_code, a.phone FROM store s
                  JOIN address a ON s.address_id = a.address_id
                  JOIN city c ON a.city_id = c.city_id
                  JOIN inventory i ON s.store_id = i.store_id
                  WHERE i.film_id = ?
                    AND i.inventory_id NOT IN (
                        SELECT r.inventory_id
                        FROM rental r
                        WHERE r.return_date IS NULL
                    )
                    AND i.inventory_id NOT IN (
                        SELECT rs.inventory_id
                        FROM reservation rs
                        WHERE rs.status = 'reserved'
                    AND NOW() BETWEEN rs.start_date AND rs.end_date);`;

    pool.query(sql, [filmId], (err, rows) => {
        if (err) callback(err);
        callback(null, rows);
    })
}
