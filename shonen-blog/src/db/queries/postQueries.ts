import type { Post } from "prisma/prisma-client";
//import prisma from "../lib/prisma";
import { prisma } from "@/db";
import { notFound } from "next/navigation";

export async function getPosts(): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
    include: {
      author: {
        select: { username: true },
      },
    },
  });

  return posts;
}
export async function getPostbyId(postId: string): Promise<Post | null> {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      author: {
        select: { username: true },
      },
    },
  });

  if (!post) {
    notFound();
  }

  return post;
}
