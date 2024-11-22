import type { User } from "prisma/prisma-client";
import type { Post } from "prisma/prisma-client";
import { prisma } from "@/db";
import { notFound } from "next/navigation";

export async function getUserFromUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: {
            name: username,
        },
        include: {
        posts: {
            select: { title: true, content: true },
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
            select: { title: true, content: true },
        },
        },
    });

    if (!user) {
        notFound();
    }
    return user;
}

// Function to return all Posts from specific user via userId
export async function getAllPostsFromUserId(userId: string): Promise<Post[] | void> {
    const user = await getUserById(userId);
    if (user === null) {
        return;
    }
    const posts = user?.posts;

    if (!posts) {
        return;
    }

    return posts;
}

// Function to return all Posts from specific user via username
export async function getAllPostsFromUsername(username: string): Promise<Post[]> {
    const user = await getUserFromUsername(username);
    const posts = user?.posts;

    return posts;
}