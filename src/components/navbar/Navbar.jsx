"use client"
import React, { useState } from 'react'
import styles from "./navbar.module.css"
import Image from 'next/image'
import Link from 'next/link'
import ThemeToggle from '../themeToggle/ThemeToggle'
import AuthLinks from '../authLinks/AuthLinks'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <Image src="/facebook.png" alt='facebook' width={24} height={24}/>
        <Image src="/instagram.png" alt='instagram' width={24} height={24}/>
        <Image src="/tiktok.png" alt='tiktok' width={24} height={24}/>
        <Image src="/youtube.png" alt='youtube' width={24} height={24}/>
      </div>
      <Link href="/" className={styles.logo}>BlogApp</Link>
      <button 
        className={styles.mobileMenuButton}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <span className={mobileMenuOpen ? styles.barOpen : styles.bar}></span>
        <span className={mobileMenuOpen ? styles.barOpen : styles.bar}></span>
        <span className={mobileMenuOpen ? styles.barOpen : styles.bar}></span>
      </button>
      <div className={`${styles.links} ${mobileMenuOpen ? styles.linksOpen : ''}`}>
        <ThemeToggle />
        <Link href="/" className={styles.link} onClick={() => setMobileMenuOpen(false)}>Home</Link>
        <Link href="/blog" className={styles.link} onClick={() => setMobileMenuOpen(false)}>Blog</Link>
        <Link href="/about" className={styles.link} onClick={() => setMobileMenuOpen(false)}>About</Link>
        <Link href="/contact" className={styles.link} onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        <AuthLinks />
      </div>
    </div>
  )
}