import express from "express";
import { fetchOngoingAnime } from "../controllers/ongoing-anime.js";
import { fetchCompleteAnime } from "../controllers/complete-anime.js";

const router = express.Router();

router
  .get("/ongoing-anime", fetchOngoingAnime)
  .get("/complete-anime", fetchCompleteAnime);

export default router;
