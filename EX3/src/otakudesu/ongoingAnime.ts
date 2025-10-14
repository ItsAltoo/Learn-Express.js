import express from "express";
import axios from "axios";
import {load} from "cheerio";

const app = express();

interface OngoingAnime {
  title: string;
  episode: string;
  imageUrl: string;
}

app.get("/ongoing-anime", async (req, res) => {
    try {
        const url = "https://otakudesu.best/ongoing-anime/";
        const response = await axios.get<string>(url);
        const html = response.data;

        const $ = load(html);
        const ongoingAnimes: OngoingAnime[] = [];

        $("div.detpost").each((index, element) => {
            const title = $(element).find("h2.jdlflm").text().trim();
            const episode = $(element).find("div.epz").text().trim();
            const imageUrl = $(element).find("img").attr("src") || "";

            ongoingAnimes.push({ title, episode, imageUrl });
        });

        res.json(ongoingAnimes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan saat scraping" });
    }
})

export default app;