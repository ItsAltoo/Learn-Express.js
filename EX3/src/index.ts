// Import library dan tipe data yang dibutuhkan dari Express
import express, { Express, Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import ongoing from "./otakudesu/ongoingAnime";

// --- Mendefinisikan Tipe Data (Interface) ---
// Ini membantu TypeScript mengetahui bentuk objek yang kita gunakan

// Interface untuk data kutipan yang akan di-scrape
interface Quote {
  text: string;
  author: string;
  tags: string[];
}

// Interface untuk data post dari JSONPlaceholder API
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Interface untuk data post yang sudah disederhanakan
interface SimplifiedPost {
  id: number;
  judul: string;
}

// Inisialisasi aplikasi Express dengan tipe Express
const app: Express = express();
const PORT: number = 3000;

// --- CONTOH 1: SCRAPING SITUS WEB (HTML) ---
// Endpoint untuk scrape kutipan dari http://quotes.toscrape.com
app.get("/scrape-quotes", async (req: Request, res: Response) => {
  try {
    const url = "http://quotes.toscrape.com/";
    const response = await axios.get<string>(url); // Tentukan bahwa respons data adalah string (HTML)
    const html = response.data;

    const $ = cheerio.load(html);

    // Deklarasikan array 'quotes' dengan tipe 'Quote[]'
    const quotes: Quote[] = [];

    $(".quote").each((index, element) => {
      const quoteText = $(element).find("span.text").text();
      const author = $(element).find("small.author").text();
      const tags = $(element)
        .find("a.tag")
        .map((i, el) => $(el).text())
        .get();

      quotes.push({
        text: quoteText,
        author: author,
        tags: tags,
      });
    });

    res.json(quotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan saat scraping" });
  }
});

// --- CONTOH 2: MENGAMBIL DATA DARI JSON API ---
// Endpoint untuk mengambil data post dari https://jsonplaceholder.typicode.com/posts
app.get("/get-posts", async (req: Request, res: Response) => {
  try {
    const url = "https://jsonplaceholder.typicode.com/posts";

    // Tentukan bahwa respons data adalah array dari objek Post (Post[])
    const response = await axios.get<Post[]>(url);

    const posts: Post[] = response.data;

    // Tipe 'post' di dalam map akan otomatis diinferensikan sebagai 'Post'
    const simplifiedPosts: SimplifiedPost[] = posts.slice(0, 5).map((post) => {
      return {
        id: post.id,
        judul: post.title,
      };
    });

    res.json(simplifiedPosts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengambil data API" });
  }
});


app.use("/", ongoing);

// Menjalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
