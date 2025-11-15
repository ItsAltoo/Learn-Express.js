import { Request, Response } from "express";
import service from "../services/service";

const controller = {
  async getShowData(req: Request, res: Response) {
    try {
      const data = await service.getData();
      res.json(data);
    } catch (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async postData(req: Request, res: Response) {
    try {
      const { text } = req.body;
      const file = req.file; // 🔥 multer menaruh file di sini
      const imageUrl = file ? `/uploads/${file.filename}` : ""; // generate path file

      const post = await service.postData(text, imageUrl);
      res.status(201).json(post);
    } catch (err) {
      console.error("Error creating post:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default controller;
