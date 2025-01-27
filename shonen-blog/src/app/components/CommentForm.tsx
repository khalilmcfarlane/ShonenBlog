"use client";

import axios from "axios";
import { Button, Group, TextInput } from "@mantine/core";

import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

export interface CommentProps {
  postId: string;
}

export default function CommentForm({ postId }: CommentProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      postId: postId,
      content: "",
      //authorId: "",
    },

    validate: {
      content: (value: string) =>
        value.length >= 1 ? null : "Content must have at least 1 character",
    },
  });

  const router = useRouter();

  const submitData = async (values: typeof form.values) => {
    //e.preventDefault();

    try {
      const formData = new FormData();
      //form.setFieldValue("content", values.content) try using mantine's form method
      formData.append("postId", values.postId);
      formData.append("content", values.content);
      //formData.append("authorId", values.authorId);

      const response = await axios.post("/api/posts/comments", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        // Eventually want to set up redirect to posts/${id}
        // const { id } = response.data.id;
        // router.push(`/posts/${id}`);
        router.push("/");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          notifications.show({
            title: "Failed to create comment",
            message: "Please login before creating a post",
            color: "red",
          });
        } else {
          notifications.show({
            title: "Comment creation error",
            message: "Something went wrong. Please try again.",
            color: "red",
          });
        }

        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(submitData)}>
      <TextInput
        label="Comment"
        placeholder="Enter comment text..."
        key={form.key("content")}
        {...form.getInputProps("content")}
      />
      <Group justify="flex-end" mt={"md"}>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
