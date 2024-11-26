"use client";

import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

export function PostForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      content: "",
    },

    validate: {
      title: (value: string) => (value.length > 0 ? null : "Title is required"),
      content: (value: string) =>
        value.length >= 5 ? null : "Content must have at least 5 characters",
    },
  });

  const router = useRouter();

  const submitData = async (values: typeof form.values) => {
    //e.preventDefault();

    try {
      //const body = { title, content };
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);

      const response = await axios.post("/api/posts/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        // Eventually want to set up redirect to posts/${id}
        //const { id } = response.data.id;
        //router.push(`/posts/${id}`);
        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.status === 401) {
        notifications.show({
          title: "Failed to create post",
          message: "Please login before creating a post",
          color: "red",
        });
      } else if (error.response?.status === 400) {
        notifications.show({
          title: "Failed to create post",
          message: "A title and content are required!",
          color: "red",
        });
      } else if (error.response?.status === 404) {
        notifications.show({
          title: "Failed to create post",
          message: "User not found",
          color: "red",
        });
      } else {
        notifications.show({
          title: "Post creation Error",
          message: "Something went wrong. Please try again.",
          color: "red",
        });
      }

      console.error(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(submitData)}>
      <TextInput
        withAsterisk
        label="Title"
        placeholder="Enter post title"
        key={form.key("title")}
        {...form.getInputProps("title")}
        required
      />
      <TextInput
        label="Content"
        placeholder="Enter post content..."
        key={form.key("content")}
        {...form.getInputProps("content")}
      />
      <Group justify="flex-end" mt={"md"}>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
