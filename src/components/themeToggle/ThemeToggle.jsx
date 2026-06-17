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
      {theme === "dark" ? (
        <>
          <Image src="/sun.png" alt="Sun icon" width={14} height={14} className={styles.icon} />
          <div className={`${styles.ball} ${styles.darkBall}`} />
          <Image src="/moon.png" alt="Moon icon" width={14} height={14} className={`${styles.icon} ${styles.iconInactive}`} />
        </>
      ) : (
        <>
          <Image src="/sun.png" alt="Sun icon" width={14} height={14} className={`${styles.icon} ${styles.iconInactive}`} />
          <div className={`${styles.ball} ${styles.lightBall}`} />
          <Image src="/moon.png" alt="Moon icon" width={14} height={14} className={styles.icon} />
        </>
      )}
    </div>
  );
};

export default ThemeToggle;
