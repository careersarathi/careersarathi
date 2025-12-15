import { MetadataRoute } from "next";
import { client } from "@/lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/exams`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/board-exams`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/resources`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
    ];

    // Dynamic pages from CMS
    let examGuides: MetadataRoute.Sitemap = [];
    let boardExams: MetadataRoute.Sitemap = [];
    let blogPosts: MetadataRoute.Sitemap = [];

    try {
        // Fetch exam guides
        const exams = await client.fetch(`
      *[_type == "examGuide"] {
        "slug": slug.current,
        _updatedAt
      }
    `);
        examGuides = exams.map(
            (exam: { slug: string; _updatedAt: string }) => ({
                url: `${baseUrl}/exams/${exam.slug}`,
                lastModified: new Date(exam._updatedAt),
                changeFrequency: "weekly" as const,
                priority: 0.8,
            })
        );

        // Fetch board exams
        const boards = await client.fetch(`
      *[_type == "boardExam"] {
        "slug": slug.current,
        _updatedAt
      }
    `);
        boardExams = boards.map(
            (board: { slug: string; _updatedAt: string }) => ({
                url: `${baseUrl}/board-exams/${board.slug}`,
                lastModified: new Date(board._updatedAt),
                changeFrequency: "weekly" as const,
                priority: 0.7,
            })
        );

        // Fetch blog posts
        const posts = await client.fetch(`
      *[_type == "blogPost"] {
        "slug": slug.current,
        _updatedAt
      }
    `);
        blogPosts = posts.map(
            (post: { slug: string; _updatedAt: string }) => ({
                url: `${baseUrl}/blog/${post.slug}`,
                lastModified: new Date(post._updatedAt),
                changeFrequency: "weekly" as const,
                priority: 0.6,
            })
        );
    } catch (error) {
        console.log("CMS not connected for sitemap generation");
    }

    return [...staticPages, ...examGuides, ...boardExams, ...blogPosts];
}
