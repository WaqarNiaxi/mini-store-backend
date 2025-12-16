import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config(); // load .env variables
const prisma = new PrismaClient();

export default prisma;
