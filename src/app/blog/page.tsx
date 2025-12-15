import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getAllBlogPosts } from "@/lib/queries";

export const metadata: Metadata = {
    title: "Study Tips & Exam Strategies - How to Study Effectively",
    description:
        "Practical study tips, time management strategies, and exam preparation techniques. Learn how to study effectively, avoid common mistakes, and stay motivated during your preparation journey.",
    keywords: [
        "study tips",
        "how to study effectively",
        "exam preparation strategies",
        "time management for students",
        "study motivation",
        "common exam mistakes",
        "memory techniques",
        "revision strategies",
        "exam day tips",
        "study plan tips",
    ],
};

// JSON-LD for blog page
const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "CAREERSARATHI Study Tips & Strategies",
    "description": "Practical advice on exam preparation, study techniques, and career guidance",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://careersarathi.com"}/blog`,
};

interface BlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    category: string;
    publishedAt: string;
    excerpt?: string;
}

export default async function BlogPage() {
    let posts: BlogPost[] = [];

    try {
        posts = await getAllBlogPosts();
    } catch {
        console.log("CMS not connected");
    }

    const breadcrumbItems = [
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
    ];

    const categoryLabels: Record<string, string> = {
        "study-techniques": "Study Techniques",
        "mistakes-to-avoid": "Mistakes to Avoid",
        motivation: "Motivation",
        "preparation-mindset": "Preparation Mindset",
        "time-management": "Time Management",
        "exam-strategy": "Exam Strategy",
    };

    return (
        <div className="py-10">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />

            <div className="page-container">
                <Breadcrumb items={breadcrumbItems} />

                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Study Strategies & Tips
                </h1>
                <p className="text-lg text-muted-foreground mb-4 max-w-2xl">
                    Practical advice on how to study effectively, manage time, stay
                    motivated, and avoid common preparation mistakes.
                </p>
                <p className="text-base text-muted-foreground mb-10 max-w-2xl">
                    Let&apos;s be real — studying for exams is hard. But it doesn&apos;t have to be
                    confusing. Here, we share battle-tested strategies from toppers and experts
                    who&apos;ve been there. No generic advice, just what actually works.
                </p>

                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <Link
                                key={post._id}
                                href={`/blog/${post.slug.current}`}
                                className="card no-underline group"
                            >
                                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                    {categoryLabels[post.category] || post.category}
                                </span>
                                <h2 className="text-lg font-semibold mt-2 group-hover:underline underline-offset-4">
                                    {post.title}
                                </h2>
                                {post.excerpt && (
                                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                )}
                                <p className="text-sm text-muted-foreground mt-4">
                                    {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="card text-center py-16">
                        <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                        <p className="text-muted-foreground">
                            Strategy guides and tips will be available soon. Connect Sanity
                            CMS to add content.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
