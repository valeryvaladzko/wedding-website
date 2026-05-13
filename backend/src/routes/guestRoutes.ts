import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { getGuest, upsertGuest } from "../controllers/guestController";

export const guestRoutes = Router();

guestRoutes.get("/guest", asyncHandler(getGuest));
guestRoutes.post("/guest", asyncHandler(upsertGuest));
