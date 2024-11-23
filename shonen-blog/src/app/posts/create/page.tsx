import layoutStyles from "../../css/Layout.module.css";

import { PostForm } from "@/app/components/PostForm";
import { Title } from "@mantine/core";
import { NavbarSimple } from "@/app/components/Navbar";

// Only be able to create post if logged in
export default function CreatePost() {
  return (
    <>
      <Title>Create Post</Title>
      <div className={layoutStyles.container}>
        <NavbarSimple />
        <div className={layoutStyles.mainContent}>
          <PostForm />
        </div>
      </div>
    </>
  );
}
