import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";
import styles from "./dashboardPage.module.css";
import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";

export const dynamic = "force-dynamic";

const getDashboardData = async (email) => {
  const [posts, categories] = await Promise.all([
    prisma.post.findMany({
      where: { userEmail: email },
      include: {
        cat: true,
        _count: {
          select: { comments: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({
      orderBy: { title: "asc" },
    }),
  ]);

  return {
    posts: posts.map((post) => ({
      ...post,
      commentCount: post._count.comments,
      _count: undefined,
      createdAt: post.createdAt.toISOString(),
    })),
    categories,
  };
};

const DashboardPage = async () => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const { posts, categories } = await getDashboardData(session.user.email);

  return (
    <main className={styles.container}>
      <DashboardClient
        posts={posts}
        categories={categories}
        user={session.user}
      />
    </main>
  );
};

export default DashboardPage;
