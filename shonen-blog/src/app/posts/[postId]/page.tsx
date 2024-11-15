//import { prisma } from "@/db"
import { getPostbyId } from "@/db/queries/postQueries";

interface Props {
  params: {
    postId: string;
  };
}

export default async function Posts({ params }: Props) {
  const post = await getPostbyId(params.postId);
  return (
    <div>
      <h1>{post?.title}</h1>
      <h2>{post?.author?.name}</h2>
      <p>{post?.content}</p>
    </div>
  );
}
