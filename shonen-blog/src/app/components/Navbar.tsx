// Taken from Mantine's open Source: https://ui.mantine.dev/category/navbars/
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  IconMessageShare,
  IconCashRegister,
  IconHome2,
  IconUser,
  IconLogin,
  IconLogout,
} from "@tabler/icons-react";
import { Code, Group } from "@mantine/core";
import Link from "next/link";
import classes from "../css/NavbarSimple.module.css";
import { JWTPayload } from "jose";

export function NavbarSimple() {
  const logout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/logout");
      console.log(response.data);
      //redirect('/login')
      //router.push("/login"); // Want to make it home page but just for tests
      window.location.reload();
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  const [session, setSession] = useState<JWTPayload | null | undefined>(null);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get("/api/session");
        setSession(response.data.session);
        console.log(response.data.session);
      } catch (error) {
        console.error("Failed to fetch session", error);
      }
    };
    fetchSession();
  }, []);

  const data = [
    { link: "/", label: "Home", icon: IconHome2 },
    { link: "/signup", label: "Signup", icon: IconCashRegister },
    { link: "/login", label: "Login", icon: IconLogin },
    { link: "/profile", label: "User Account", icon: IconUser },
    { link: "/posts/create", label: "Create Post", icon: IconMessageShare },
  ];
  const filteredLinks = data
    .filter((item) => {
      if (session) {
        if (item.label === "Signup") return false;
        if (item.label === "Login") return false;
      } else {
        if (item.label === "User Account") return false;
      }
      return true;
    })
    .map((item) => {
      if (session && item.label === "User Account") {
        return { ...item, link: `/profile/${session.user?.username}` };
      }
      return item;
    });

  const links = filteredLinks.map((item) => (
    // Replace a with Next-link in the future, link to signup, login, etc.
    <Link
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => setActive(item.label)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Code fw={700}>ShonenBlog</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        {session ? (
          <Link href="#" className={classes.link} onClick={logout}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
