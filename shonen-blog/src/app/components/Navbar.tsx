// Taken from Mantine's open Source: https://ui.mantine.dev/category/navbars/
"use client";

import { useState } from "react";
import {
  IconMessageShare,
  IconCashRegister,
  IconHome2,
  IconUser,
  IconLogin,
  IconLogout,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import { Code, Group } from "@mantine/core";
import classes from "../css/NavbarSimple.module.css";

const data = [
  { link: "", label: "Home", icon: IconHome2 },
  { link: "", label: "Signup", icon: IconCashRegister },
  { link: "", label: "Login", icon: IconLogin },
  { link: "", label: "User Account", icon: IconUser },
  { link: "", label: "Create Post", icon: IconMessageShare },
];

export function NavbarSimple() {
  const [active, setActive] = useState("Home");

  const links = data.map((item) => (
    // Replace a with Next-link in the future, link to signup, login, etc.
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          \ <Code fw={700}>ShonenBlog</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
