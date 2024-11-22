import { getAllPostsFromUsername } from "@/db/queries/userQueries";
import styles from "./page.module.css";
import { PostGrid } from "@/app/components/PostGrid";

interface Props {
  params: {
    username: string;
  };
}
export default async function ProfileDetails({ params }: Props) {
  const posts = await getAllPostsFromUsername(params.username);
  return (
    <div>
      <h1>All of {params.username} posts</h1>
      <div>
        <PostGrid posts={posts} />
      </div>
    </div>
  );
}
