import { Request, Response } from "express";
import service from "../services/service";

const controller = {
  async getUser(req: Request, res: Response) {
    try {
      const data = await service.fetchUser();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async addUser(req: Request, res: Response) {
    try {
      const data = await service.createUser(req);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default controller;
