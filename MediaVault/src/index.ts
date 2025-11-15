import express from "express";
import cors from "cors";
import router from "@routes/main-route";

const app = express();
const port = 3000;

app.use(cors()); // 🔥 IZINKAN REQUEST DARI CLIENT LAIN
app.use(express.json());
app.use("/uploads", express.static("uploads")); // agar bisa akses file yg diupload

app.get("/", (req, res) => {
  res.redirect("/api");
});

app.use("/api", router);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
