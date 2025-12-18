export const BASE_ROUTES = {
  API: "/api",
};

export const AUTH_ROUTES = {
  ROOT: `${BASE_ROUTES.API}/auth`,
  REGISTER: "/register",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
};

export const USER_ROUTES = {
  ROOT: `${BASE_ROUTES.API}/users`,
  PROFILE: "/profile",
};

export const WALLET_ROUTES = {
  ROOT: `${BASE_ROUTES.API}/wallet`,
  WALLET: `/`,
};

export const PRODUCT_ROUTES = {
  ROOT: `${BASE_ROUTES.API}/product`,
  PRODUCT: "/",
};

export const WALLET_TRANSFER = {
  ROOT: `${BASE_ROUTES.API}/walletTransfer`,
  WALLET_TRANSFER: "/",
  BY_ID: `/:id`,
};

export const ORDER_ROUTES = {
  ROOT: `${BASE_ROUTES.API}/order`,
  ORDER: `/`,
};
