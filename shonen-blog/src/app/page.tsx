import Image from "next/image";
import styles from "./page.module.css";
import { getPosts } from "@/db/queries/postQueries";


export default async function Home() {
  const posts = await getPosts();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
       <div>
        {posts.map(post => {
          return <div key={post.id}>
            <h1>{post.title}</h1>
            <h2>{post.author.name}</h2>
            <p>{post.content}</p>
            </div>
        })}
       </div>
      </main>
    </div>
  );
}
