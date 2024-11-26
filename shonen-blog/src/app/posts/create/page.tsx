import layoutStyles from "../../css/Layout.module.css";

import { PostForm } from "@/app/components/PostForm";
import { Title } from "@mantine/core";

// Only be able to create post if logged in
export default function CreatePost() {
  return (
    <>
      <Title>Create Post</Title>
      <div className={layoutStyles.mainContent}>
        <PostForm />
      </div>
    </>
  );
}
