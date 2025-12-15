import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getBlogPostBySlug } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    try {
        const post = await getBlogPostBySlug(slug);
        if (!post) return { title: "Post Not Found" };

        return {
            title: post.seoTitle || post.title,
            description: post.metaDescription,
            openGraph: {
                title: post.seoTitle || post.title,
                description: post.metaDescription,
                type: "article",
                publishedTime: post.publishedAt,
                modifiedTime: post._updatedAt,
            },
        };
    } catch {
        return { title: "Blog Post" };
    }
}

const portableTextComponents: PortableTextComponents = {
    block: {
        h2: ({ children, value }) => (
            <h2 id={value._key} className="scroll-mt-20">
                {children}
            </h2>
        ),
        h3: ({ children, value }) => (
            <h3 id={value._key} className="scroll-mt-20">
                {children}
            </h3>
        ),
    },
    types: {
        image: ({ value }) => {
            if (!value?.asset?._ref) return null;
            return (
                <figure className="my-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={urlFor(value).width(800).url()}
                        alt={value.alt || ""}
                        className="rounded-lg w-full"
                    />
                    {value.caption && (
                        <figcaption className="text-sm text-muted-foreground text-center mt-2">
                            {value.caption}
                        </figcaption>
                    )}
                </figure>
            );
        },
    },
};

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;

    let post;

    try {
        post = await getBlogPostBySlug(slug);
    } catch {
        // CMS not connected
    }

    if (!post) {
        notFound();
    }

    const breadcrumbItems = [
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: post.title, href: `/blog/${slug}` },
    ];

    const categoryLabels: Record<string, string> = {
        "study-techniques": "Study Techniques",
        "mistakes-to-avoid": "Mistakes to Avoid",
        motivation: "Motivation",
        "preparation-mindset": "Preparation Mindset",
        "time-management": "Time Management",
        "exam-strategy": "Exam Strategy",
    };

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.seoTitle || post.title,
        description: post.metaDescription,
        datePublished: post.publishedAt,
        dateModified: post._updatedAt,
        author: {
            "@type": "Organization",
            name: "CAREERSARATHI",
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />

            <div className="py-10">
                <div className="page-container">
                    <div className="content-container mx-auto">
                        <Breadcrumb items={breadcrumbItems} />

                        <article className="prose max-w-none">
                            <header className="mb-10">
                                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                    {categoryLabels[post.category] || post.category}
                                </span>
                                <h1 className="mt-2 mb-4">{post.title}</h1>
                                <p className="text-muted-foreground">
                                    Published on{" "}
                                    {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </header>

                            <PortableText
                                value={post.content}
                                components={portableTextComponents}
                            />

                            {/* Back to Blog */}
                            <div className="mt-12 pt-8 border-t border-border">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center text-sm font-medium hover:underline underline-offset-4"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 19l-7-7 7-7"
                                        />
                                    </svg>
                                    Back to Blog
                                </Link>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </>
    );
}
