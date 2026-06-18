"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboardPage.module.css";

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const stripHtml = (value) => value?.replace(/<[^>]*>/g, "") || "";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

const DashboardClient = ({ posts, categories, user }) => {
  const router = useRouter();
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState({
    title: "",
    categoryTitle: "",
    img: "",
    desc: "",
  });
  const [busySlug, setBusySlug] = useState("");
  const [message, setMessage] = useState("");

  const stats = useMemo(
    () => ({
      posts: posts.length,
      views: posts.reduce((total, post) => total + post.views, 0),
      comments: posts.reduce(
        (total, post) => total + (post.commentCount || 0),
        0
      ),
    }),
    [posts]
  );

  const openEditor = (post) => {
    setMessage("");
    setEditingPost(post);
    setForm({
      title: post.title,
      categoryTitle: post.cat?.title || post.catSlug,
      img: post.img || "",
      desc: post.desc || "",
    });
  };

  const closeEditor = () => {
    setEditingPost(null);
    setMessage("");
  };

  const handleDelete = async (post) => {
    const confirmed = window.confirm(`Delete "${post.title}" permanently?`);

    if (!confirmed) {
      return;
    }

    try {
      setBusySlug(post.slug);
      setMessage("");
      const res = await fetch(`/api/posts/${post.slug}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete post");
      }

      router.refresh();
    } catch (err) {
      console.log(err);
      setMessage("Could not delete this post. Please try again.");
    } finally {
      setBusySlug("");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.categoryTitle.trim() || !form.desc.trim()) {
      setMessage("Title, category, and content are required.");
      return;
    }

    try {
      setBusySlug(editingPost.slug);
      setMessage("");
      const res = await fetch(`/api/posts/${editingPost.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          desc: form.desc,
          img: form.img,
          categoryTitle: form.categoryTitle,
          catSlug: slugify(form.categoryTitle),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update post");
      }

      closeEditor();
      router.refresh();
    } catch (err) {
      console.log(err);
      setMessage("Could not update this post. Please try again.");
    } finally {
      setBusySlug("");
    }
  };

  return (
    <>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Dashboard</p>
          <h1 className={styles.title}>Your writing workspace</h1>
          <p className={styles.subtitle}>
            Review, edit, and remove the posts published from your account.
          </p>
        </div>
        <div className={styles.profile}>
          {user?.image && (
            <Image
              src={user.image}
              alt={user.name || "Profile"}
              width={56}
              height={56}
              className={styles.avatar}
            />
          )}
          <div>
            <span className={styles.profileName}>{user?.name || "Writer"}</span>
            <span className={styles.profileEmail}>{user?.email}</span>
          </div>
        </div>
      </section>

      <section className={styles.statsGrid} aria-label="Post statistics">
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.posts}</span>
          <span className={styles.statLabel}>Posts</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.views}</span>
          <span className={styles.statLabel}>Views</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{stats.comments}</span>
          <span className={styles.statLabel}>Comments</span>
        </div>
      </section>

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2 className={styles.panelTitle}>My Posts</h2>
            <p className={styles.panelText}>
              Only posts created with your logged-in email are shown here.
            </p>
          </div>
          <Link href="/write" className={styles.writeButton}>
            New Post
          </Link>
        </div>

        {message && <p className={styles.message}>{message}</p>}

        {posts.length === 0 ? (
          <div className={styles.empty}>
            <h3>No posts yet</h3>
            <p>Start a draft and it will appear in this dashboard.</p>
            <Link href="/write" className={styles.emptyButton}>
              Write your first post
            </Link>
          </div>
        ) : (
          <div className={styles.postList}>
            {posts.map((post) => (
              <article className={styles.postCard} key={post.id}>
                {post.img && (
                  <div className={styles.thumbnail}>
                    <Image
                      src={post.img}
                      alt=""
                      fill
                      className={styles.thumbnailImage}
                    />
                  </div>
                )}
                <div className={styles.postBody}>
                  <div className={styles.postMeta}>
                    <span className={styles.badge}>
                      {post.cat?.title || post.catSlug}
                    </span>
                    <span>{formatDate(post.createdAt)}</span>
                    <span>{post.views} views</span>
                  </div>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.excerpt}>
                    {stripHtml(post.desc).substring(0, 150)}
                  </p>
                </div>
                <div className={styles.actions}>
                  <Link href={`/posts/${post.slug}`} className={styles.viewLink}>
                    View
                  </Link>
                  <button
                    className={styles.editButton}
                    onClick={() => openEditor(post)}
                    disabled={busySlug === post.slug}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(post)}
                    disabled={busySlug === post.slug}
                  >
                    {busySlug === post.slug ? "Working..." : "Delete"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {editingPost && (
        <div className={styles.modalBackdrop} role="presentation">
          <form className={styles.modal} onSubmit={handleUpdate}>
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.eyebrow}>Edit Post</p>
                <h2 className={styles.modalTitle}>{editingPost.title}</h2>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={closeEditor}
                aria-label="Close editor"
              >
                x
              </button>
            </div>
            <label className={styles.field}>
              <span>Title</span>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>Category</span>
              <input
                list="dashboard-category-options"
                value={form.categoryTitle}
                onChange={(e) =>
                  setForm({ ...form, categoryTitle: e.target.value })
                }
              />
              <datalist id="dashboard-category-options">
                {categories.map((category) => (
                  <option value={category.title} key={category.id} />
                ))}
              </datalist>
            </label>
            <label className={styles.field}>
              <span>Image URL</span>
              <input
                value={form.img}
                onChange={(e) => setForm({ ...form, img: e.target.value })}
              />
            </label>
            <label className={styles.field}>
              <span>Content</span>
              <textarea
                rows={10}
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
              />
            </label>
            {message && <p className={styles.message}>{message}</p>}
            <div className={styles.modalActions}>
              <button type="button" className={styles.cancelButton} onClick={closeEditor}>
                Cancel
              </button>
              <button
                type="submit"
                className={styles.saveButton}
                disabled={busySlug === editingPost.slug}
              >
                {busySlug === editingPost.slug ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default DashboardClient;
