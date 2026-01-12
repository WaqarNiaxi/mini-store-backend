// routes/index.ts
import { Express } from "express";

import userRoutes from "../modules/user/user.routes";
import walletRoutes from "../modules/wallet/wallet.routes";
import productRoutes from "../modules/product/product.routes";
import walletTransferRoutes from "../modules/walletTransfer/walletTranfer.routes";
import orderRoutes from "../modules/order/order.routes";
import orderItemRoutes from "../modules/oderItem/orderItem.routes";
import giftRoutes from "../modules/gift/gift.routes";
import creditTransferRoutes from "../modules/creaditTransfer/creditTransfer.routes";

import {
  USER_ROUTES,
  WALLET_ROUTES,
  PRODUCT_ROUTES,
  WALLET_TRANSFER,
  ORDER_ROUTES,
  ORDER_ItEM_ROUTES,
  GIFT_ROUTES,
  CREDIT_TRANSFER_ROUTES,
} from "./routes";

export const registerRoutes = (app: Express) => {
  app.use(USER_ROUTES.ROOT, userRoutes);
  app.use(WALLET_ROUTES.ROOT, walletRoutes);
  app.use(PRODUCT_ROUTES.ROOT, productRoutes);
  app.use(WALLET_TRANSFER.ROOT, walletTransferRoutes);
  app.use(ORDER_ROUTES.ROOT, orderRoutes);
  app.use(ORDER_ItEM_ROUTES.ROOT, orderItemRoutes);
  app.use(GIFT_ROUTES.ROOT, giftRoutes);
  app.use(CREDIT_TRANSFER_ROUTES.ROOT, creditTransferRoutes);
};
