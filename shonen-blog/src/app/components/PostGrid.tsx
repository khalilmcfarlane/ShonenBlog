import { SimpleGrid, Card, Text, Container, AspectRatio } from "@mantine/core";
import type { Post } from "prisma/prisma-client";
import classes from "../css/PostGrid.module.css";
import Link from "next/link";

interface PostsProps {
  posts: Post[];
}

export function PostGrid({ posts }: PostsProps) {
  const cards = posts.map((post) => (
    <Link
      key={post.id}
      href={`/posts/${post.id}`}
      style={{ textDecoration: "none" }}
      passHref
    >
      <Card p="md" radius="md" component="a" className={classes.card}>
        <Text className={classes.title} mt={5}>
          <h1>{post.title}</h1>
        </Text>
        <Text className={classes.author}>
          <h3>{post?.author?.username}</h3>
        </Text>
        <Text className={classes.content}>{post.content}</Text>
      </Card>
    </Link>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
}
