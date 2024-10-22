import Image from "next/image";
import styles from "./page.module.css";
import { createClient, sql } from "@vercel/postgres";

export async function getPosts() {
  //Should I use an ORM like Prisma or Drizzle?
  const client = createClient();
  await client.connect();
  try {
    const posts = await sql `SELECT * FROM Posts;`;
    return posts.rows;
  } finally {
    // Avoid sql injection
    await client.end();
  }
  
}
export default function Home() {
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
        <ul>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
        </ul>
      </main>
    </div>
  );
}
