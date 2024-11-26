//import Image from "next/image";
import styles from "./page.module.css";
import layoutStyles from "./css/Layout.module.css";

import { getPosts } from "@/db/queries/postSqlQueries";
import { PostGrid } from "./components/PostGrid";

export default async function Home() {
  const posts = await getPosts();
  // Add navbar Post creation, signup, login

  return (
    <main className={`${styles.main} ${layoutStyles.mainContent}`}>
      <div className={styles.page}>
        <h2>Recent Posts</h2>
        <div>
          <PostGrid posts={posts} />
        </div>
      </div>
    </main>
  );
}
