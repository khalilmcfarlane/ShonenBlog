import { Post, Prisma } from "prisma/prisma-client";
import { prisma } from "@/db";
import { notFound } from "next/navigation";

/*
export type PostWithAuthor = Prisma.PostGetPayload<{
  include: {
    author: {
      select: { username: true };
    };
  };
}>;
*/
export type PostWithAuthor = Partial<Post> & {
  author: { username: string } | null;
};

export type PostImage = Prisma.PostGetPayload<{
  select: { title: true; content: true; image: true; id: true };
}>;

export async function getPosts(): Promise<PostWithAuthor[]> {
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
export async function getPostbyId(
  postId: string
): Promise<PostWithAuthor | null> {
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
