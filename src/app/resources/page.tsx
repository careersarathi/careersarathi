import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
    title: "Free Study Resources - Study Plans, Books & Strategy Guides",
    description:
        "Free study resources for exam preparation. Download study plans, get book recommendations, and access strategy guides for UPSC, SSC, Banking, JEE, NEET, and Board exams.",
    keywords: [
        "free study resources",
        "exam preparation materials",
        "study plan download",
        "best books for competitive exams",
        "NCERT books guide",
        "UPSC study plan",
        "SSC preparation resources",
        "board exam revision",
        "free study material",
        "exam strategy guide",
    ],
};

// JSON-LD for resources page
const resourcesSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free Study Resources",
    "description": "Curated study resources including study plans, book recommendations, and strategy guides for competitive and board exams",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://careersarathi.com"}/resources`,
};

const resources = [
    {
        category: "Study Plans",
        items: [
            {
                title: "6-Month UPSC Preparation Plan",
                description: "Comprehensive strategy for UPSC CSE preparation",
                href: "/exams?type=competitive",
            },
            {
                title: "3-Month SSC CGL Plan",
                description: "Focused plan for SSC Combined Graduate Level exam",
                href: "/exams?type=government",
            },
            {
                title: "Board Exam Revision Schedule",
                description: "Last 2 months revision strategy for Class 10 & 12",
                href: "/board-exams",
            },
        ],
    },
    {
        category: "Book Recommendations",
        items: [
            {
                title: "Best Books for Government Exams",
                description: "Curated list of books for SSC, Banking, Railways",
                href: "/exams?type=government",
            },
            {
                title: "NCERT Guide for Competitive Exams",
                description: "How to effectively use NCERTs for preparation",
                href: "/blog",
            },
            {
                title: "Reference Books for Board Exams",
                description: "Subject-wise book recommendations",
                href: "/board-exams",
            },
        ],
    },
    {
        category: "Strategy Guides",
        items: [
            {
                title: "How to Attempt Objective Papers",
                description: "Maximize your score in MCQ-based exams",
                href: "/blog",
            },
            {
                title: "Answer Writing for Mains Exams",
                description: "Structure and presentation techniques",
                href: "/blog",
            },
            {
                title: "Time Management During Exam",
                description: "Effective time allocation strategies",
                href: "/blog",
            },
        ],
    },
];

export default function ResourcesPage() {
    const breadcrumbItems = [
        { name: "Home", href: "/" },
        { name: "Resources", href: "/resources" },
    ];

    return (
        <div className="py-10">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(resourcesSchema) }}
            />

            <div className="page-container">
                <Breadcrumb items={breadcrumbItems} />

                <h1 className="text-3xl md:text-4xl font-bold mb-4">Study Resources</h1>
                <p className="text-lg text-muted-foreground mb-4 max-w-2xl">
                    Curated resources to help you prepare effectively. Study plans, book
                    recommendations, and strategy guides—all in one place.
                </p>
                <p className="text-base text-muted-foreground mb-10 max-w-2xl">
                    Stop wasting time searching for the right resources. We&apos;ve done the
                    research and compiled everything you need — from study plans to book
                    lists to strategy guides. All free, all practical, all tested.
                </p>

                <div className="space-y-12">
                    {resources.map((section) => (
                        <section key={section.category}>
                            <h2 className="text-xl font-semibold mb-6">{section.category}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {section.items.map((item) => (
                                    <Link
                                        key={item.title}
                                        href={item.href}
                                        className="card no-underline group"
                                    >
                                        <h3 className="font-semibold group-hover:underline underline-offset-4">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-2">
                                            {item.description}
                                        </p>
                                        <span className="inline-flex items-center mt-4 text-sm font-medium">
                                            Learn More
                                            <svg
                                                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Affiliate Placeholder */}
                <section className="mt-16 pt-10 border-t border-border">
                    <div className="card bg-muted/50 text-center py-12">
                        <h2 className="text-xl font-semibold mb-3">
                            Recommended Books & Courses
                        </h2>
                        <p className="text-muted-foreground max-w-md mx-auto">
                            Coming soon: Curated book recommendations and course suggestions
                            to accelerate your preparation.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
