"use client";
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginForm() {
 

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  const handleLogin = async (values: typeof form.values) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);

      const response = await axios.post("/api/login", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status == 200) {
        // Idea is to eventually push to user profile
        router.push("/");
      }
    } catch (error: any) {
      if (error.response?.status === 404) {
        notifications.show({
          title: "Login Failed!",
          message: "This user doesn't exist!",
          color: "red",
        });
      } else {
        notifications.show({
          title: "Login Error",
          message: "Something went wrong. Please try again.",
          color: "red",
        });
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleLogin)}>
      <TextInput
        withAsterisk
        label="Username"
        placeholder="username"
        key={form.key("username")}
        {...form.getInputProps("username")}
      />

      <TextInput
        withAsterisk
        label="Password"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
