import express from "express";
import controller from "../controllers/controller";

const route = express.Router();

route.get("/", controller.getUser).post("/", controller.addUser);

export default route;
