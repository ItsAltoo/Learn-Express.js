import express from "express";
import controller from "../controllers/controller";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", controller.getShowData).post("/", upload.single("file"), controller.postData);
export default router;
