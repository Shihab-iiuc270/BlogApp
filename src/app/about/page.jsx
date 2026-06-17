import React from "react";
import styles from "./aboutPage.module.css";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>About BlogApp</h1>
          <p className={styles.subtitle}>
            A platform where stories come to life and ideas find their voice
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles.textBlock}>
            <h2 className={styles.sectionTitle}>Our Mission</h2>
            <p className={styles.paragraph}>
              BlogApp was created with a simple vision: to provide a space where writers, 
              thinkers, and creators can share their unique perspectives with the world. 
              We believe that everyone has a story worth telling, and our platform makes 
              it easy for anyone to publish, share, and connect with readers who matter.
            </p>
            <p className={styles.paragraph}>
              Whether you're passionate about technology, fashion, food, travel, culture, 
              or coding, you'll find a community of like-minded individuals who share your 
              interests and enthusiasm.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What We Offer</h2>
          <div className={styles.features}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✍️</div>
              <h3 className={styles.featureTitle}>Easy Publishing</h3>
              <p className={styles.featureDesc}>
                Our intuitive editor makes it simple to create beautiful, 
                formatted posts in minutes.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌍</div>
              <h3 className={styles.featureTitle}>Global Community</h3>
              <p className={styles.featureDesc}>
                Connect with readers and writers from around the world 
                who share your passions.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3 className={styles.featureTitle}>Responsive Design</h3>
              <p className={styles.featureDesc}>
                Your content looks great on any device, from desktop to mobile.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔒</div>
              <h3 className={styles.featureTitle}>Secure Platform</h3>
              <p className={styles.featureDesc}>
                Your data is protected with modern security practices 
                and encryption.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Join Our Community</h2>
          <p className={styles.paragraph}>
            Ready to start sharing your stories? Join thousands of writers who are 
            already making an impact on BlogApp. Create your account today and begin 
            your journey as a published author.
          </p>
          <div className={styles.cta}>
            <Link href="/write" className={styles.primaryButton}>
              Start Writing
            </Link>
            <Link href="/blog" className={styles.secondaryButton}>
              Explore Posts
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;