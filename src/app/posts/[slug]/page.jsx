import Menu from "@/components/Menu/Menu";
import styles from "./singlePage.module.css";
import Image from "next/image";
import Comments from "@/components/comments/Comments";
import prisma from "@/utils/connect";
import { notFound } from "next/navigation";

const getData = async (slug) => {
  const post = await prisma.post.update({
    where: { slug },
    data: { views: { increment: 1 } },
    include: { user: true, cat: true },
  });

  return {
    ...post,
    createdAt: post.createdAt.toISOString(),
  };
};

const SinglePage = async ({ params }) => {
  const { slug } = params;

  let data;

  try {
    data = await getData(slug);
  } catch (err) {
    console.log(err);
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.title}</h1>
          <div className={styles.user}>
            {data?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image src={data.user.image} alt="" fill className={styles.avatar} />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.user.name}</span>
              <span className={styles.date}>
                {new Date(data.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        {data?.img && (
          <div className={styles.imageContainer}>
            <Image src={data.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.desc }}
          />
          <div className={styles.comment}>
            <Comments postSlug={slug}/>
          </div>
        </div>
        <Menu showEditorial={false} />
      </div>
    </div>
  );
};

export default SinglePage;
