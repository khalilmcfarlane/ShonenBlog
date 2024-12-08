"use client";

import axios from "axios";
import { Button, Group, TextInput, FileInput } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { rem } from "@mantine/core";

import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

export function PostForm() {
  /*
  const [file, setFile] = useState("");

  const handleFile = (input_file: File | null) => {
    if (input_file) {
      // Take in file and convert to a string
      const imageUrl = URL.createObjectURL(input_file);
      setFile(imageUrl);
      console.log(file);
    }
  }
*/

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      content: "",
      image: null as File | null,
    },

    validate: {
      title: (value: string) => (value.length > 0 ? null : "Title is required"),
      content: (value: string) =>
        value.length >= 5 ? null : "Content must have at least 5 characters",
    },
  });

  const router = useRouter();

  const icon = (
    <IconPhoto style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );

  const submitData = async (values: typeof form.values) => {
    //e.preventDefault();

    try {
      //const body = { title, content };
      const formData = new FormData();
      //form.setFieldValue("content", values.content) try using mantine's form method
      formData.append("title", values.title);
      formData.append("content", values.content);
      if (values.image) {
        formData.append("image", values.image);
      }

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

      <FileInput
        withAsterisk
        leftSection={icon}
        accept="image/*"
        label="Image"
        key={form.key("image")}
        {...form.getInputProps("image")}
        placeholder="drop your photo"
      />

      <Group justify="flex-end" mt={"md"}>
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
