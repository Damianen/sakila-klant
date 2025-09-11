import * as reservationController from "../controllers/reservation-controller.js";
import { requireAuth } from '../middlewares/auth.js';
import { Router } from "express";

const router = Router();

router.get("/" , requireAuth, reservationController.GetUserRepositories);
router.post("/:id", requireAuth, reservationController.AddReservation);
router.post("/:id/delete", requireAuth, reservationController.DeleteReservation);

export default router;
