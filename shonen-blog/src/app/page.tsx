import Image from "next/image";
import styles from "./page.module.css";
import { getPosts } from "@/db/queries/postQueries";
import { PostGrid } from "./components/PostGrid";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className={styles.main}>
      <div>
        <Link href="posts/create" className="CreatePost">
          Create Post
        </Link>
      </div>
      <div className={styles.page}>
        <h1>Recent Posts</h1>
        <div>
          <PostGrid posts={posts} />
        </div>
      </div>
    </main>
  );
}
