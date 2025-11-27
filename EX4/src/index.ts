import route from "@routes/main-route";
import express from "express";

const app = express();
const port = 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req, res) => res.redirect("/api"));

app.use("/api", route);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
