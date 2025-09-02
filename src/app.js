import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import filmRoutes from "./routes/film-routes.js";
import notFound from "./middlewares/not-found.js";
import errorHandler from "./middlewares/error-handler.js";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/films", filmRoutes);

app.use(notFound)
app.use(errorHandler);

export default app;
