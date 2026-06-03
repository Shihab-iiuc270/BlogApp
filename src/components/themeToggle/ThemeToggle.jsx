"use client";

import Image from "next/image";
import styles from "./themeToggle.module.css";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const ThemeToggle = () => {
  const { toggle, theme } = useContext(ThemeContext);

  return (
    <div
      className={`${styles.container} ${theme === "dark" ? styles.dark : styles.light}`}
      onClick={toggle}
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <Image src="/moon.png" alt="Moon icon" width={14} height={14} />
      <div className={`${styles.ball} ${theme === "dark" ? styles.darkBall : styles.lightBall}`} />
      <Image src="/sun.png" alt="Sun icon" width={14} height={14} />
    </div>
  );
};

export default ThemeToggle;