// import { Router } from "express";
// import { auth } from "./auth";
// import { AUTH_ROUTES } from "../routes/routes";

// const router = Router();

// router.post(AUTH_ROUTES.REGISTER, async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const result = await auth.api.signUpEmail({
//       body: { name, email, password },
//     });

//     res.status(201).json(result);
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// });


// router.post(AUTH_ROUTES.LOGIN, async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const result = await auth.api.signInEmail({
//       body: { email, password },
//     });

//     res.json(result);
//   } catch (error: any) {
//     res.status(401).json({ message: error.message });
//   }
// });


// router.post(AUTH_ROUTES.FORGOT_PASSWORD, async (req, res) => {
//   const { email } = req.body;

//   try {
//     await auth.api.requestPasswordReset({
//       body: { email },
//     });

//     res.json({ message: "Password reset email sent" });
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// });


// router.post(AUTH_ROUTES.RESET_PASSWORD, async (req, res) => {
//   const { token, newPassword } = req.body;

//   try {
//     await auth.api.resetPassword({
//       body: { token, newPassword },
//     });

//     res.json({ message: "Password reset successful" });
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// });


// export default router;
