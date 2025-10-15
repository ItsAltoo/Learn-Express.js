import { scrapeAnimeList } from "../services/scrape-anime-list.js";

export const fetchOngoingAnime = async (req, res) => {
  const url = "https://otakudesu.best/ongoing-anime/";

  try {
    const animeList = await scrapeAnimeList(url);
    res.json(animeList);
  } catch (error) {
    console.error("Error fetching ongoing anime:", error);
    res.status(500).json({ error: "Failed to fetch ongoing anime" });
  }
};


