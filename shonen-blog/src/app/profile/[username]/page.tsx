import layoutStyles from "../../css/Layout.module.css";

import { getAllPostsFromUsername } from "@/db/queries/userQueries";
import { PostGrid } from "@/app/components/PostGrid";

interface Props {
  params: {
    username: string;
  };
}
export default async function ProfileDetails({ params }: Props) {
  const posts = await getAllPostsFromUsername(params.username);
  return (
    <div className={layoutStyles.mainContent}>
      <h1>{params.username}&apos;s Posts</h1>
      <div>
        <PostGrid posts={posts} />
      </div>
    </div>
  );
}
