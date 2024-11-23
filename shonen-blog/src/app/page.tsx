//import Image from "next/image";
import styles from "./page.module.css";
import { getPosts } from "@/db/queries/postSqlQueries";
import { PostGrid } from "./components/PostGrid";
import { NavbarSimple } from "./components/Navbar";

export default async function Home() {
  const posts = await getPosts();
  // Add navbar Post creation, signup, login

  return (
    <main className={styles.main}>
      <NavbarSimple />
      <div className={styles.page}>
        <h1>Recent Posts</h1>
        <div>
          <PostGrid posts={posts} />
        </div>
      </div>
    </main>
  );
}
