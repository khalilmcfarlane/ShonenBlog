import {
  SimpleGrid,
  Card,
  Text,
  Container,
  AspectRatio,
  Image,
} from "@mantine/core";
//import type { Post, User } from "prisma/prisma-client";
import classes from "../css/PostGrid.module.css";
import { PostWithAuthor } from "@/db/queries/postSqlQueries";

export interface PostsProps {
  posts: PostWithAuthor[];
}

export function PostGrid({ posts }: PostsProps) {
  const cards = posts.map((post) => (
    <Card
      key={post.title}
      p="md"
      radius="md"
      component="a"
      href={`/posts/${post.id}`}
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image src={post.image} alt={post.title} />
      </AspectRatio>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        {post?.author?.username || "Unknown Author"}
      </Text>
      <Text className={classes.title} mt={5}>
        {post.title}
      </Text>
    </Card>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
}
