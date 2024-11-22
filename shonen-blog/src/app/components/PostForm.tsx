"use client";

import Link from "next/link";
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useRouter } from "next/navigation";

// Need to find way to associate user with post
// OnSubmit, add Post to user.Posts
type FormValues = {
  title: string;
  content: string;
};

const router = useRouter();

export function PostForm() {
  const form = useForm<FormValues>({
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

  const submitData = async (values: FormValues) => {
    //e.preventDefault();

    try {
      //const body = { title, content };
      const response = await axios.post("/api/post", values);

      /*
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      */

      if (response.status === 201) {
        // Eventually want to set up redirect to posts/${id}
        //const { id } = response.data.id;
        //router.push(`/posts/${id}`);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
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
      </form>
      <Group justify="flex-end" mt={"md"}>
        <Button type="submit">Submit</Button>
      </Group>
    </>
  );
}
