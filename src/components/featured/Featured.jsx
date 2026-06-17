import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";
import Link from "next/link";

const Featured = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>BlogApp</span>
        </h1>
        <p className={styles.subtitle}>
          Share your stories, ideas and experiences with the world
        </p>
      </div>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="Featured story" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.postTitle}>
            Discover Amazing Stories and Insights from Our Community
          </h2>
          <p className={styles.postDesc}>
            Join thousands of readers exploring diverse topics from technology and design to lifestyle and creativity. 
            Our community of writers shares authentic experiences and valuable knowledge that can inspire and transform your perspective.
          </p>
          <Link href="/blog" className={styles.button}>
            Explore More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
