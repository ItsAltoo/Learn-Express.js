import express from "express";
import prisma from "./lib/prisma";

const app = express();
const port = 3000;

app.get("/", (req, res) => res.redirect("/api"));

app.get("/api", async (req, res) => {
  const allEmployed = await prisma.employed.findMany({
    include: {
      user: true,
    },
  });

  const allUser = await prisma.user.findMany();
  return res.json({ allEmployed, allUser });
});

app.get("/api/add", async (req, res) => {
  await prisma.user.create({
    data: {
      name: "Rero",
      age: 12,
    },
  });

  await prisma.employed.create({
    data: {},
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
