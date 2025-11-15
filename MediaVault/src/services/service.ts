import prisma from "../libs/prisma";

const service = {
  async getData() {
    return await prisma.post.findMany();
  },

  async postData(text: string, imageUrl: string) {
    return await prisma.post.create({
      data: {
        text,
        imageUrl,
      },
    });
  },
};

export default service;
