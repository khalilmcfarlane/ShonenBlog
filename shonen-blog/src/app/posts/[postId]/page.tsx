import layoutStyles from "../../css/Layout.module.css";

//import { prisma } from "@/db"
import { getPostbyId } from "@/db/queries/postSqlQueries";

interface Props {
  params: {
    postId: string;
  };
}

export default async function Posts({ params }: Props) {
  const post = await getPostbyId(params.postId);
  return (
    <div className={layoutStyles.mainContent}>
      <h1>Your posts</h1>
      <h1>{post?.title}</h1>
      <h2>{post?.author?.username}</h2>
      <p>{post?.content}</p>
    </div>
  );
}
