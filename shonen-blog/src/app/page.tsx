import Image from "next/image";
import styles from "./page.module.css";
import { getPosts } from "../../prisma/queries/postQueries";


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
       
       </div>
      </main>
    </div>
  );
}
