import { Request, Response } from "express";
import prisma from "../libs/prisma";

const controller = {

  async fetchUser(req: Request, res: Response)  {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  }
}

export default controller