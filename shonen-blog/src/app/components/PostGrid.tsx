import { SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import type { Post } from "prisma/prisma-client";
import classes from '../css/PostGrid.module.css';
import Link from 'next/link';

        /*
        <div key={post.id}>
          <Link key={post.id} href={`/posts/${post.id}`} className="">
            <h2>{post.title}</h2>
          </Link>
          <h3>{post.author.name}</h3>
          <p>{post.content}</p>
        </div>
        */
      
        /*
          Include code below to add post image and date
           <AspectRatio ratio={1920 / 1080}>
            <Image src={post.image} />
          </AspectRatio>
          <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
            {post.createdAt}
          </Text>
        */
        
interface PostsProps {
  posts: Post[]
}

export function PostGrid({ posts }: PostsProps) {
  const cards = posts.map((post) => (
    <Card key={post.id} p="md" radius="md" component="a" href="#" className={classes.card}>
     
      <Text className={classes.title} mt={5}>
        <Link key={post.id} href={`/posts/${post.id}`} className="">
              <h1>{post.title}</h1>
        </Link>
        <h3>{post.author.name}</h3>
        <p>{post.content}</p>
      </Text>
    </Card>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
}