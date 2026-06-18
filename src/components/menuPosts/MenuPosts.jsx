import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css"
import prisma from "@/utils/connect";

const getPosts = async (withImage) => {
  return prisma.post.findMany({
    take: 4,
    orderBy: withImage ? { createdAt: "desc" } : { views: "desc" },
    include: {
      cat: true,
      user: true,
    },
  });
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

const MenuPosts = async ({ withImage }) => {
  const posts = await getPosts(withImage);

  if (!posts.length) {
    return null;
  }

  return (
    <div className={styles.items}>
      {posts.map((post) => (
        <Link href={`/posts/${post.slug}`} className={styles.item} key={post.id}>
          {withImage && post.img && (
            <div className={styles.imageContainer}>
              <Image src={post.img} alt="" fill className={styles.image} />
            </div>
          )}
          <div className={styles.textContainer}>
            <span className={`${styles.category} ${styles[post.catSlug] || ""}`}>
              {post.cat?.title || post.catSlug}
            </span>
            <h3 className={styles.postTitle}>
              {post.title}
            </h3>
            <div className={styles.detail}>
              <span className={styles.username}>{post.user?.name || "Author"}</span>
              <span className={styles.date}>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;
