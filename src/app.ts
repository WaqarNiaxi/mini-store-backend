import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { toNodeHandler } from "better-auth/node";

import { registerRoutes } from "./routes";
import { swaggerSpec } from "./swagger/swagger.config";
import { errorMiddleware } from "./middlewares/error.middleware";
import { auth } from "./lib/auth";

dotenv.config();

export const app = express();

/* Global middleware */
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

/* Auth */
app.use("/api/auth", toNodeHandler(auth));

/* Docs */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/* Routes */
registerRoutes(app);

/* Errors */
app.use(errorMiddleware);

export default app;
