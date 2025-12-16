import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./modules/user/user.routes";
import { swaggerSpec } from "./swagger/swagger.config";
import { errorMiddleware } from "./middlewares/error.middleware";
// import authRoutes from "./lib/authRoutes";
import { toNodeHandler } from "better-auth/node";
import { AUTH_ROUTES, USER_ROUTES} from './routes/routes';
import { auth } from "./lib/auth";

dotenv.config();

export const app = express();

/* Global Middleware */
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use("/api/auths", toNodeHandler(auth));

/* Swagger */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// app.use(authRoutes);
app.use(USER_ROUTES.ROOT, userRoutes);


/* Error Handler */
app.use(errorMiddleware);


export default app;




