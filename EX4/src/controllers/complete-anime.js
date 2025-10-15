import { scrapeAnimeList } from "../services/scrape-anime-list.js";

export const fetchCompleteAnime = async (req, res) => {
  const url = "https://otakudesu.best/complete-anime/";

  try {
    const animeList = await scrapeAnimeList(url);
    res.json(animeList);
  } catch (err) {
    console.error("Error fetching ongoing anime:", error);
    res.status(500).json({ error: "Failed to fetch ongoing anime" });
  }
};

