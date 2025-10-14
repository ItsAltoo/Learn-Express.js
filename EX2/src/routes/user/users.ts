import { Router, Request, Response } from "express";
import prisma from "../../libs/prisma";

const app: Router = Router();

app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

app.post("/post", async (req: Request, res: Response) => {
  const { email, name, phone_number } = req.body;

  if (!email || !name || !phone_number) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newUser = await prisma.user.create({
      data: { email, name, phone_number },
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

export default app;
