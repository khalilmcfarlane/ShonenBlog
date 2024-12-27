"use client";

import { Button, FileInput, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SignupForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      username: "",
      password: "",
      email: "",
      image: null as File | null,
    },

    validate: {
      name: (value) => (value.length > 0 ? null : "Name is required"),
      username: (value) => {
        if (value.includes(" ")) {
          return "Username cannot contain spaces";
        }
        if (value.length < 4) {
          return "Username must be at least 4 characters long";
        }
        return null;
      },
      password: (value) =>
        value.length > 5 ? null : "Password of at least length 6 required",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  /*
  type SignupFormValues = {
    name: string;
    password: string;
    email: string;
    image?: File;
    // image
  };
  */

  const router = useRouter();

  const handleSignup = async (values: typeof form.values) => {
    // Maybe split individ values into FormData
    // Also add image
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      if (values.image) {
        formData.append("image", values.image);
      }
      const response = await axios.post("/api/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status == 201) {
        // Idea is to eventually push to user profile
        router.push("/");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          notifications.show({
            title: "Signup Failed!",
            message: "A user with this email or username already exists",
            color: "red",
          });
        } else {
          notifications.show({
            title: "Signup Error",
            message: "Something went wrong. Please try again.",
            color: "red",
          });
        }
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSignup)}>
      <TextInput
        withAsterisk
        label="Name"
        placeholder="Your name"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />

      <TextInput
        withAsterisk
        label="Username"
        placeholder="Your username"
        key={form.key("username")}
        {...form.getInputProps("username")}
      />

      <TextInput
        withAsterisk
        label="Password"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />

      <TextInput
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />

      <FileInput
        label="Profile picture (optional)"
        placeholder="Upload your image"
        accept="image/*"
        {...form.getInputProps("image")}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
