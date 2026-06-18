import React from 'react'
import styles from "./card.module.css"
import Image from 'next/image'
import Link from 'next/link'
export default function Card({key,item}) {
  const plainDesc = item.desc ? item.desc.replace(/<[^>]*>/g, "") : "";
  const categoryTitle = item.cat?.title || item.catSlug;

  return (
    <div className={styles.container} key={key}>
     {item.img && ( <div className={styles.imageContainer}>
       <Image src={item.img}  alt='' fill  className={ styles.image}/>
      </div>)}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
            <span className={styles.date}>{item.createdAt.substring(0,10)} - </span>
            <span className={styles.category}>{categoryTitle}</span>
        </div>
        <Link href={`/posts/${item.slug}` }>
          <h1 className={styles.title}>{item.title}</h1>
        </Link>
        <p className={styles.desc}>{plainDesc.substring(0, 110)}</p>
        <Link className={styles.link} href={`/posts/${item.slug}`}>Read More</Link>
      </div>
    </div>
  )
}
