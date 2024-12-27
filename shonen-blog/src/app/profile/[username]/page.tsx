import layoutStyles from "../../css/Layout.module.css";

import { getAllPostsFromUsername } from "@/db/queries/userQueries";
import { PostGrid } from "@/app/components/PostGrid";

export interface userProps {
  params: {
    username: string;
  };
}
export default async function ProfileDetails({ params }: userProps) {
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
