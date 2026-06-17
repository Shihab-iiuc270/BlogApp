import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./menuPosts.module.css"

const samplePosts = [
  {
    category: "travel",
    title: "Discover Hidden Gems: Top 10 Unexplored Destinations",
    author: "Sarah Johnson",
    date: "Mar 10, 2024",
  },
  {
    category: "culture",
    title: "The Art of Traditional Storytelling in Modern Times",
    author: "Michael Chen",
    date: "Mar 8, 2024",
  },
  {
    category: "food",
    title: "Street Food Adventures: A Culinary Journey",
    author: "Emma Williams",
    date: "Mar 5, 2024",
  },
  {
    category: "fashion",
    title: "Sustainable Fashion: Style That Cares for Our Planet",
    author: "Olivia Brown",
    date: "Mar 3, 2024",
  },
];

const MenuPosts = ({ withImage }) => {
  return (
    <div className={styles.items}>
      {samplePosts.map((post, index) => (
        <Link href="/blog" className={styles.item} key={index}>
          {withImage && (
            <div className={styles.imageContainer}>
              <Image src="/p1.jpeg" alt="" fill className={styles.image} />
            </div>
          )}
          <div className={styles.textContainer}>
            <span className={`${styles.category} ${styles[post.category]}`}>
              {post.category}
            </span>
            <h3 className={styles.postTitle}>
              {post.title}
            </h3>
            <div className={styles.detail}>
              <span className={styles.username}>{post.author}</span>
              <span className={styles.date}>{post.date}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;