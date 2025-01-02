//import type { Prisma, User } from "prisma/prisma-client";
import type { PostWithAuthor } from "./postSqlQueries";
import { prisma } from "@/db";
import { notFound } from "next/navigation";

/*
export type UserWithPosts = Prisma.UserGetPayload<{
  include: {
    posts: {
      select: { title: true; content: true; image: true; id: true };
    };
  };
}>;

export async function getUserFromUsername(
  username: string
): Promise<UserWithPosts | null> {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      posts: {
        orderBy: [
          {
            updatedAt: "desc",
          },
        ],
        select: { title: true, content: true, image: true, id: true },
      },
    },
  });

  if (!user) {
    notFound();
  }
  return user;
}
export async function getUserById(userId: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      posts: {
        orderBy: [
          {
            updatedAt: "desc",
          },
        ],
        select: { title: true, content: true, image: true, id: true },
      },
    },
  });

  if (!user) {
    notFound();
  }
  return user;
}
  */

// Function to return all Posts from specific user via userId
export async function getAllPostsFromUserId(
  userId: string
): Promise<PostWithAuthor[]> {
  //const user = await getUserById(userId);
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      posts: {
        orderBy: [
          {
            updatedAt: "desc",
          },
        ],
        select: { title: true, content: true, image: true, id: true },
      },
    },
  });

  if (!user) {
    notFound();
  }

  const posts = user?.posts;

  return posts as PostWithAuthor[];
}

// Function to return all Posts from specific user via username
export async function getAllPostsFromUsername(
  username: string
): Promise<PostWithAuthor[]> {
  //const user = await getUserFromUsername(username);
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      posts: {
        orderBy: [
          {
            updatedAt: "desc",
          },
        ],
        select: { title: true, content: true, image: true, id: true },
      },
    },
  });

  if (!user) {
    notFound();
  }
  const posts = user?.posts;

  return posts as PostWithAuthor[];
}
