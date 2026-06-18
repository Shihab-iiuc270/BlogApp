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

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: { user: true, cat: true },
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

export const PUT = async (req, { params }) => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ message: "Not Authenticated!" }, { status: 401 });
  }

  const { slug } = params;

  try {
    const existingPost = await prisma.post.findUnique({
      where: { slug },
      select: { userEmail: true },
    });

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (existingPost.userEmail !== session.user.email) {
      return NextResponse.json({ message: "Not Authorized!" }, { status: 403 });
    }

    const body = await req.json();
    const title = body.title?.trim();
    const desc = body.desc?.trim();
    const categoryTitle = body.categoryTitle?.trim();
    const catSlug = slugify(body.catSlug || categoryTitle || "");

    if (!title || !desc || !catSlug) {
      return NextResponse.json(
        { message: "Title, content, and category are required" },
        { status: 400 }
      );
    }

    await prisma.category.upsert({
      where: { slug: catSlug },
      update: { title: categoryTitle || catSlug },
      create: { slug: catSlug, title: categoryTitle || catSlug },
    });

    const post = await prisma.post.update({
      where: { slug },
      data: {
        title,
        desc,
        img: body.img || null,
        catSlug,
      },
      include: { cat: true },
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

export const DELETE = async (req, { params }) => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ message: "Not Authenticated!" }, { status: 401 });
  }

  const { slug } = params;

  try {
    const existingPost = await prisma.post.findUnique({
      where: { slug },
      select: { userEmail: true },
    });

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (existingPost.userEmail !== session.user.email) {
      return NextResponse.json({ message: "Not Authorized!" }, { status: 403 });
    }

    await prisma.$transaction([
      prisma.comment.deleteMany({ where: { postSlug: slug } }),
      prisma.post.delete({ where: { slug } }),
    ]);

    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
};
