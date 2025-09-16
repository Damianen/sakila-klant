import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';
import expressLayouts from "express-ejs-layouts";

import filmRoutes from "./routes/film-routes.js";
import actorRoutes from "./routes/actor-routes.js";
import notFound from "./middlewares/not-found.js";
import errorHandler from "./middlewares/error-handler.js";
import authRoutes from './routes/auth-routes.js';
import protectedRoutes from './routes/protected-routes.js';
import currentUser from './middlewares/current-user.js';
import userRoutes from './routes/user-routes.js';
import reservationRoutes from './routes/reservation-routes.js';
import categoriesMiddleware from './middlewares/categories.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(currentUser)

app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(categoriesMiddleware);

app.set('layout', 'layouts/main');
app.use("/films", filmRoutes);
app.use("/actors", actorRoutes);
app.use('/auth', authRoutes);
app.use('/account', protectedRoutes);
app.use('/users', userRoutes);
app.use('/reservations', reservationRoutes);

app.get('/about', (req, res) => res.render('about'));
app.get('/', (req, res) => res.render('home'));

app.use(notFound)
app.use(errorHandler);

export default app;
