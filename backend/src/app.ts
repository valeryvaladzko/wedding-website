import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { guestRoutes } from "./routes/guestRoutes";
import { photoRoutes } from "./routes/photoRoutes";
import { partyRoutes } from "./routes/partyRoutes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";

export function createApp(): express.Express {
  const app = express();

  app.use(cors({ origin: env.corsOrigin }));
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.json({ status: "ok", service: "wedding-api" });
  });

  app.use("/api", guestRoutes);
  app.use("/api", photoRoutes);
  app.use("/api", partyRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
