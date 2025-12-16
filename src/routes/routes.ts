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
