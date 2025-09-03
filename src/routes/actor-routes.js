import { Router } from "express";
import * as ActorController from "../controllers/actor-controller.js";

const router = Router();

router.get("/", ActorController.ListActors);
router.get("/:id", ActorController.GetActor);

export default router;
