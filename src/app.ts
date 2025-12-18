import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./modules/user/user.routes";
import walletRoutes from "./modules/wallet/wallet.routes";
import productRoutes from "./modules/product/product.routes";
import walletTransfer from "./modules/walletTransfer/walletTranfer.routes";
import orderItemRoutes from "./modules/oderItem/orderItem.routes";
import orderRoutes from "./modules/order/order.routes";
import giftRoutes from "./modules/gift/gift.routes";
import creditTransferRoutes from "./modules/creaditTransfer/creditTransfer.routes";
import { swaggerSpec } from "./swagger/swagger.config";
import { errorMiddleware } from "./middlewares/error.middleware";
import { toNodeHandler } from "better-auth/node";
import {
  CREDIT_TRANSFER_ROUTES,
  GIFT_ROUTES,
  ORDER_ItEM_ROUTES,
  ORDER_ROUTES,
  PRODUCT_ROUTES,
  USER_ROUTES,
  WALLET_ROUTES,
  WALLET_TRANSFER,
} from "./routes/routes";
import { auth } from "./lib/auth";

dotenv.config();

export const app = express();

/* Global Middleware */
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use("/api/auth", toNodeHandler(auth));

/* Swagger */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// user routes
app.use(USER_ROUTES.ROOT, userRoutes);

// Wallet Routes
app.use(WALLET_ROUTES.ROOT, walletRoutes);

// Produt Routes
app.use(PRODUCT_ROUTES.ROOT, productRoutes);

// Wallet Transfer History
app.use(WALLET_TRANSFER.ROOT, walletTransfer);

// order
app.use(ORDER_ROUTES.ROOT, orderRoutes);

// orderItem
app.use(ORDER_ItEM_ROUTES.ROOT, orderItemRoutes);

// gift
app.use(GIFT_ROUTES.ROOT, giftRoutes);

// creditTransfer
app.use(CREDIT_TRANSFER_ROUTES.ROOT, creditTransferRoutes);

/* Error Handler */
app.use(errorMiddleware);

export default app;
