export default function (req, res) {
    res.status(404).render("home", { error: "Not found" });
}
