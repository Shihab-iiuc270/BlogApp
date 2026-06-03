import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Welcome to BlogApp</b> Share your stories, ideas and experiences with the world
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="Featured story" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>Discover Amazing Stories and Insights from Our Community</h1>
          <p className={styles.postDesc}>
            Join thousands of readers exploring diverse topics from technology and design to lifestyle and creativity. 
            Our community of writers shares authentic experiences and valuable knowledge that can inspire and transform your perspective.
          </p>
          <button className={styles.button}>Explore More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;