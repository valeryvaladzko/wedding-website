import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { listGuestPhotos } from "../controllers/photoController";

export const photoRoutes = Router();

photoRoutes.get("/photos", asyncHandler(listGuestPhotos));
