// components/CommentList.js
"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Avatar, Group, Text, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { CommentProps } from "./CommentForm";
import { formatDate } from "@/utils/dateFormatter";

export default function CommentList({ postId }: CommentProps) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/posts/comments/${postId}`);
        const data = response.data;
        setComments(data);
      } catch (error: unknown) {
        console.log("Error fetching all comments", error);
        notifications.show({
          title: "Failed to create comment",
          message: "Please login before creating a post",
          color: "red",
        });
        
      }
    };
    fetchComments();
  }, [postId]);

  return (
    <Stack gap="lg">
      {comments.map((comment) => (
        <>
          <div key={comment.id}>
            <Group>
              <Avatar src={comment.author?.image} alt="" radius="xl" />
              <div>
                <Text fw={700} size="sm">
                  {comment?.author?.username}
                </Text>
                <Text size="xs" c="dimmed">
                  {formatDate(comment.createdAt)}
                </Text>
              </div>
            </Group>
            <Text pl={54} pt="sm" size="sm">
              {comment.content}
            </Text>
          </div>
        </>
      ))}
    </Stack>
  );
}
