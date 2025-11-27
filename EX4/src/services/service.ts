import prisma from "../lib/prisma";
import { Request } from "express";

const service = {
  async fetchUser() {
    const users = await prisma.user.findMany({
      include: {
        company: true,
        profile: true,
      },
    });
    return users;
  },

  async createUser(req: Request) {
    const { name, email, age, companyName, companyAddress, imageUrl, bio } =
      req.body;

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        age: age,
        company: {
          create: {
            name: companyName,
            address: companyAddress,
          },
        },
        profile: {
          create: {
            imageUrl: imageUrl,
            bio: bio,
          },
        },
      },
    });
    return newUser;
  },
};

export default service;
