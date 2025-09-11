import pool from "../db/pool.js";

export function GetAllActors(callback) {
    const sql = "SELECT * FROM actor";
    pool.query(sql, (err, rows) => {
        if (err) callback(err);
        callback(null, rows);
    });
}

export function GetActorById(id, callback) {
    const sql = `SELECT
                    a.actor_id,
                    CONCAT(a.first_name, ' ', a.last_name) AS actor_name,
                    CONCAT(
                        '[',
                        GROUP_CONCAT(
                        JSON_OBJECT(
                            'id', f.film_id,
                            'title', f.title,
                            'release_year', f.release_year
                        )
                        ORDER BY f.release_year, f.title
                        ),
                        ']'
                    ) AS movies
                    FROM actor a
                    JOIN film_actor fa ON fa.actor_id = a.actor_id
                    JOIN film f ON f.film_id = fa.film_id
                    WHERE a.actor_id = 1   -- change to the actor you want (or filter by name)
                    GROUP BY a.actor_id, actor_name;`;
    pool.query(sql, [id], (err, rows) => {
        if (err) callback(err);
        callback(null, rows[0]);
    });
}
