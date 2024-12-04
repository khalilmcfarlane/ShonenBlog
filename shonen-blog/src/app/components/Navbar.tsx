// Taken from Mantine's open Source: https://ui.mantine.dev/category/navbars/
"use client";

import axios from "axios";
import { useState } from "react";
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

const data = [
  { link: "/", label: "Home", icon: IconHome2 },
  { link: "/signup", label: "Signup", icon: IconCashRegister },
  { link: "/login", label: "Login", icon: IconLogin },
  { link: "/profile", label: "User Account", icon: IconUser },
  { link: "/posts/create", label: "Create Post", icon: IconMessageShare },
];

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

  const [active, setActive] = useState("Home");

  const links = data.map((item) => (
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
        <Link href="#" className={classes.link} onClick={logout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}
