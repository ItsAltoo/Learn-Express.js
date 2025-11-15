import { PrismaClient } from "../generated/prisma/client";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

export default prisma;
