import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser, createWalletForUser } from "./auth.repository";

const JWT_SECRET = process.env.BETTER_AUTH_SECRET!; // must be at least 32 chars

export const registerUser = async (email: string, password: string, name?: string) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) throw new Error("User already exists");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user in DB
  const user = await createUser({ email, name, password: hashedPassword });

  // Create wallet
  await createWalletForUser(user.id);

  // Generate JWT token manually
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

  return { user, token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  // Verify password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  // Generate JWT token
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

  return { user, token };
};
