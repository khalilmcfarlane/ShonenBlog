import classes from "../../css/PostGrid.module.css";
import { Card, AspectRatio, Image, Text } from "@mantine/core";
import { notFound } from "next/navigation";
//import { prisma } from "@/db"
import CommentForm from "@/app/components/CommentForm";
import CommentList from "@/app/components/CommentList";
import { getPostbyId } from "@/db/queries/postSqlQueries";
import Link from "next/link";

interface Props {
  params: {
    postId: string;
  };
}

export default async function Posts({ params }: Props) {
  const post = await getPostbyId(params.postId);
  if (!post) {
    notFound();
  }
  // change to conditional render if post
  return (
    <Card>
      <Text className={classes.title} mt={5} size="xl">
        {post.title}
      </Text>
      <Link href={`/profile/${post?.author?.username}`}>
        <Text c="dimmed" size="l" tt="uppercase" fw={700} mt="md">
          {post?.author?.username}
        </Text>
      </Link>
      <AspectRatio ratio={16 / 9} maw={800} mx="auto">
        <Image src={post.image} alt={post.title} />
      </AspectRatio>

      <Text className={classes.title} mt={5} size="md">
        {post.content}
      </Text>
      <CommentList postId={params.postId}/>
      <CommentForm postId={params.postId} />
    </Card>
  );
}
