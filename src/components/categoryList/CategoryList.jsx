import React from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";
import prisma from "@/utils/connect";

const categoryDescriptions = {
  style: "Fashion trends, personal style tips, and wardrobe essentials",
  fashion: "Latest fashion news, designer collections, and style inspiration",
  food: "Delicious recipes, restaurant reviews, and culinary adventures",
  culture: "Art, music, traditions, and cultural experiences from around the world",
  travel: "Travel guides, destination tips, and adventure stories",
  coding: "Programming tutorials, tech news, and developer resources",
};

const getData = async () => {
  return prisma.category.findMany({
    orderBy: {
      title: "asc",
    },
  });
};

const CategoryList = async () => {
  const data = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Explore Categories</h1>
      <p className={styles.description}>
        Find content that matches your interests
      </p>
      <div className={styles.categories}>
        {data?.map((item) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={`${styles.category} ${styles[item.slug] || ""}`}
            key={item.id || item.slug}
          >
            <div className={styles.categoryContent}> 
               {/* {item.img && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={24}
                    height={24}
                    className={styles.image}
                  />
                </div>
               )} */}
              <div className={styles.categoryText}>
                <span className={styles.categoryTitle}>{item.title}</span>
                <span className={styles.categoryDesc}>
                  {categoryDescriptions[item.slug] || `Explore ${item.title} content`}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
