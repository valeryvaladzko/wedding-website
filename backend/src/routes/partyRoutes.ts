import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { listParty } from "../controllers/partyController";

export const partyRoutes = Router();

partyRoutes.get("/party", asyncHandler(listParty));
