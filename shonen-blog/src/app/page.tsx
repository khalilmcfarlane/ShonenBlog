import Image from "next/image";
import styles from "./page.module.css";
import { getPosts } from "@/db/queries/postSqlQueries";
import { PostGrid } from "./components/PostGrid";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();
  // Add navbar Post creation, signup, login

  return (
    <main className={styles.main}>
      <div>
        <Link href="posts/create" className="CreatePost">
          Create Post
        </Link>
        <Link href="/signup" className="Signup">
          Sign Up
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
