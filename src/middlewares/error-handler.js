export default function(err, req, res, next) {
    console.log(err);
    res.status(500).render("home", { error: "Internal server error." });
}
