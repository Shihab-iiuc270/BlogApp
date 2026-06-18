"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./writePage.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import { app } from "@/utils/firebase";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    const data = await res.json();
    return data.secure_url;
  };

  useEffect(() => {
    const upload = async () => {
      try {
        setIsUploading(true);
        setUploadError("");
        const url = await uploadToCloudinary(file);
        setMedia(url);
        console.log("Uploaded:", url);
      } catch (err) {
        console.log(err);
        setUploadError("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    };

    if (file) {
      upload();
    }
  }, [file]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("/api/categories");

        if (!res.ok) {
          throw new Error("Failed to load categories");
        }

        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };

    getCategories();
  }, []);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    if (!value.trim()) {
      alert("Please write some content");
      return;
    }

    if (!category.trim()) {
      alert("Please enter a category");
      return;
    }

    const categoryTitle = category.trim();

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          desc: value,
          img: media,
          slug: slugify(title),
          catSlug: slugify(categoryTitle),
          categoryTitle,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        router.push(`/posts/${data.slug}`);
      } else {
        alert("Failed to publish post");
      }
    } catch (err) {
      console.log(err);
      alert("Error publishing post");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Create New Post</h1>
        <p>Share your thoughts with the world</p>
      </div>
      <input
        type="text"
        placeholder="Enter your title..."
        className={styles.input}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={styles.controls}>
        <input
          className={styles.categoryInput}
          list="category-options"
          placeholder="Category, e.g. Travel"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <datalist id="category-options">
          {categories.map((item) => (
            <option value={item.title} key={item.id || item.slug} />
          ))}
        </datalist>
      </div>

      {/* Image Preview Section */}
      {media && (
        <div className={styles.imagePreviewContainer}>
          <div className={styles.imagePreview}>
            <Image src={media} alt="Preview" fill className={styles.previewImage} />
          </div>
          <button
            className={styles.removeButton}
            onClick={() => {
              setMedia("");
              setFile(null);
            }}
          >
            Remove Image
          </button>
        </div>
      )}

      {/* Upload Status */}
      {isUploading && (
        <div className={styles.uploadStatus}>
          <span>Uploading image...</span>
        </div>
      )}

      {uploadError && (
        <div className={styles.uploadError}>
          {uploadError}
        </div>
      )}

      <div className={styles.editor}>
        <div className={styles.toolbar}>
          <button className={styles.button} onClick={() => setOpen(!open)}>
            <Image src="/plus.png" alt="Add media" width={18} height={18} />
          </button>
        </div>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
              accept="image/*"
            />
            <button className={styles.addButton} disabled={isUploading}>
              <label htmlFor="image">
                <Image src="/image.png" alt="" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          className={styles.textArea}
          theme="bubble"
          value={value}
          onChange={setValue}
          placeholder="Tell your story..."
        />
      </div>
      <div className={styles.footer}>
        <span className={styles.charCount}>
          {value.length} characters
        </span>
        <button className={styles.publish} onClick={handleSubmit} disabled={isUploading}>
          {isUploading ? "Publishing..." : "Publish Post"}
        </button>
      </div>
    </div>
  );
};

export default WritePage;
