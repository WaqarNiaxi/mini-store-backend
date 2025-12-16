import express from "express";
import routes from "./modules/auth/auth.route";
// import { errorMiddleware } from "./middlewares/error.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swagger.config";


export const app = express();

app.use(express.json());

app.use("/auth", routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use(errorMiddleware);
