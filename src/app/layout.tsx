import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CAREERSARATHI - From Syllabus to Selection",
    template: "%s | CAREERSARATHI",
  },
  description:
    "Your trusted mentor for exam preparation. Get syllabus-driven strategies, study plans, and practical guidance for government exams, competitive exams, and board exams.",
  keywords: [
    "exam preparation",
    "government exams",
    "competitive exams",
    "board exams",
    "study plan",
    "syllabus",
    "UPSC preparation 2025",
    "SSC CGL preparation",
    "CBSE board exam 2025",
    "study strategy",
    "free exam preparation",
    "online study guide",
    "how to crack competitive exams",
    "government job preparation",
    "JEE preparation tips",
    "NEET preparation guide",
    "UPSC syllabus",
    "SSC exam pattern",
    "bank exam preparation",
    "railway exam preparation",
    "state PSC preparation",
    "class 10 board exam tips",
    "class 12 preparation",
  ],
  authors: [{ name: "CAREERSARATHI" }],
  creator: "CAREERSARATHI",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "CAREERSARATHI",
    title: "CAREERSARATHI - From Syllabus to Selection",
    description:
      "Your trusted mentor for exam preparation. Get syllabus-driven strategies, study plans, and practical guidance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CAREERSARATHI - From Syllabus to Selection",
    description:
      "Your trusted mentor for exam preparation. Get syllabus-driven strategies, study plans, and practical guidance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

