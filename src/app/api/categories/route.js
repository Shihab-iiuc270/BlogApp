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

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        title: "asc",
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ message: "Not Authenticated!" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const title = body.title?.trim();
    const slug = slugify(body.slug || title || "");

    if (!title || !slug) {
      return NextResponse.json(
        { message: "Category title is required" },
        { status: 400 }
      );
    }

    const category = await prisma.category.upsert({
      where: { slug },
      update: {
        title,
        ...(body.img && { img: body.img }),
      },
      create: {
        slug,
        title,
        img: body.img || null,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
