"use client";

import React, { useState } from "react";
import styles from "./contactPage.module.css";
import Link from "next/link";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    
    // Simulate form submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>Get in Touch</h1>
        <p className={styles.subtitle}>
          Have a question, suggestion, or just want to say hello? 
          We&apos;d love to hear from you.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.formSection}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="name">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={styles.input}
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.input}
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className={styles.input}
                placeholder="How can we help?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className={styles.textarea}
                placeholder="Tell us what's on your mind..."
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <div className={styles.successMessage}>
                Thank you! Your message has been sent successfully. We&apos;ll get back to you soon.
              </div>
            )}
          </form>
        </div>

        <div className={styles.infoSection}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📧</div>
            <h3 className={styles.infoTitle}>Email Us</h3>
            <p className={styles.infoText}>support@blogapp.com</p>
            <p className={styles.infoDesc}>We typically respond within 24 hours</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>💬</div>
            <h3 className={styles.infoTitle}>Live Chat</h3>
            <p className={styles.infoText}>Available Mon-Fri</p>
            <p className={styles.infoDesc}>9:00 AM - 6:00 PM (UTC+6)</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📍</div>
            <h3 className={styles.infoTitle}>Follow Us</h3>
            <div className={styles.socialLinks}>
              <Link href="#" className={styles.socialLink}>Facebook</Link>
              <Link href="#" className={styles.socialLink}>Twitter</Link>
              <Link href="#" className={styles.socialLink}>Instagram</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
