import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";
import prisma from "@/utils/connect";

const getData = async () => {
  return prisma.category.findMany({
    orderBy: {
      title: "asc",
    },
  });
};

const MenuCategories = async () => {
  const data = await getData();

  return (
    <div className={styles.categoryList}>
      {data?.map((item) => (
        <Link
          href={`/blog?cat=${item.slug}`}
          className={`${styles.categoryItem} ${styles[item.slug] || ""}`}
          key={item.id || item.slug}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;
