import CardList from "@/components/cardList/CardList";
import styles from "./blogPage.module.css";
import Menu from "@/components/Menu/Menu";

const BlogPage = ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const  cat  = (searchParams.cat);
  const categoryTitle = cat
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {cat ? (
          <>
            Explore <span>{categoryTitle}</span> Posts
          </>
        ) : (
          'All Blog Posts'
        )}
      </h1>
      <div className={styles.content}>
        <CardList page={page} cat={cat}/>
        <Menu showEditorial={false} />
      </div>
    </div>
  );
};

export default BlogPage;
