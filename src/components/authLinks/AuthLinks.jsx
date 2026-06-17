"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
// import { signOut } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const { status } = useSession();

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <span className={styles.link} onClick={()=>signOut()}>
            Logout
          </span>
        </>
      )}
    </>
  );
};

export default AuthLinks;