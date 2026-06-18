import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 3;

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






  
  
  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query),
      prisma.post.count({ where: query.where }),
    ]);
    return NextResponse.json({ posts, count }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};










// CREATE A POST
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const body = await req.json();
    const categoryTitle = body.categoryTitle?.trim();
    const catSlug = slugify(body.catSlug || categoryTitle || "");

    if (!body.title?.trim() || !body.desc?.trim() || !catSlug) {
      return new NextResponse(
        JSON.stringify({ message: "Title, content, and category are required" }),
        { status: 400 }
      );
    }

    await prisma.category.upsert({
      where: { slug: catSlug },
      update: {
        title: categoryTitle || catSlug,
      },
      create: {
        slug: catSlug,
        title: categoryTitle || catSlug,
      },
    });

    const post = await prisma.post.create({
      data: {
        title: body.title,
        desc: body.desc,
        img: body.img || null,
        slug: body.slug,
        catSlug,
        userEmail: session.user.email,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
