import cors from "cors";
import { createApp } from "./app";
import { env } from "./config/env";

const app = createApp();

app.use(
  cors({
    origin: "*",
  }),
);

app.listen(env.port, () => {
  console.log(
    `Wedding API listening on http://localhost:${env.port} (${env.nodeEnv})`,
  );
});
