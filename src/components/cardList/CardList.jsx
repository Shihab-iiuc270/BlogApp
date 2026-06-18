import React from 'react'
import styles from "./cardList.module.css"
import Pagination from '../pagination/Pagination'
import Card from '../card/Card'
import prisma from '@/utils/connect'

const POST_PER_PAGE = 3;

const getData = async (page,cat) => {
  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page - 1),
    where: {
      ...(cat && { catSlug: cat }),
    },
    include: {
      cat: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  };

  const [posts, count] = await prisma.$transaction([
    prisma.post.findMany(query),
    prisma.post.count({ where: query.where }),
  ]);

  return {
    posts: posts.map((post) => ({
      ...post,
      createdAt: post.createdAt.toISOString(),
    })),
    count,
  };
};

export default  async function CardList({page,cat}) {
  const {posts,count} = await getData(page,cat);
  const hasPrev= POST_PER_PAGE * (page-1)>0
  const hasNext= POST_PER_PAGE *(page-1) + POST_PER_PAGE <count
  return (
    <div className={styles.container}>
      <h1  className={styles.title}>Recent Posts</h1>
      <div  className={ styles.posts}>
        {posts?.map((item)=>(
        <Card item={item} key={item.id} />
        
      ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext}/>
    </div>
  )
}
