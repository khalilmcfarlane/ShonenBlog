import { PostForm } from "@/app/components/PostForm";
import { Title } from "@mantine/core";
import { NavbarSimple } from "@/app/components/Navbar";

export default function CreatePost() {
  return (
    <div>
      <NavbarSimple />
      <Title>Create Post</Title>
      <PostForm />
    </div>
  );
}
