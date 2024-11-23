//import { prisma } from "@/db"
import { NavbarSimple } from "@/app/components/Navbar";
import { getPostbyId } from "@/db/queries/postSqlQueries";

interface Props {
  params: {
    postId: string;
  };
}

export default async function Posts({ params }: Props) {
  const post = await getPostbyId(params.postId);
  return (
    <>
      <NavbarSimple />
      <div>
        <h1>{post?.title}</h1>
        <h2>{post?.author?.username}</h2>
        <p>{post?.content}</p>
      </div>
    </>
  );
}
