"use client";

import axios from "axios";

export default async function logout() {
  try {
    const response = await axios.post("/api/logout");
    console.log(response.data);
    //window.location.reload();
  } catch (error) {
    console.error("Failed to logout", error);
  }
}
