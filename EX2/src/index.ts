import express from "express";
import user from "@routes/user/users";

const app = express(); 
const port = 3000;

app.use(express.json());

app.get("/api", (req, res) => {
  res.status(200).json("Hello World!");
});

app.use("/api/users", user);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
