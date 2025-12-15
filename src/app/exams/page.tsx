import { Metadata } from "next";
import Link from "next/link";
import ExamCard from "@/components/ui/ExamCard";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getAllExamGuides } from "@/lib/queries";

export const metadata: Metadata = {
    title: "Exam Preparation Guides 2025 - Government, Competitive & Entrance Exams",
    description:
        "Free exam preparation guides for UPSC, SSC, Banking, Railways, JEE, NEET, and more. Get complete syllabus, exam pattern, study plans, and proven strategies to crack competitive exams in 2025.",
    keywords: [
        "exam preparation guide",
        "UPSC preparation",
        "SSC CGL syllabus",
        "bank exam preparation",
        "JEE preparation tips",
        "NEET study plan",
        "government exam preparation 2025",
        "competitive exam strategy",
        "entrance exam guide",
        "free study material",
    ],
};

// JSON-LD for exam listing page
const examListSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Exam Preparation Guides",
    "description": "Complete preparation guides for government, competitive, and entrance exams in India",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://careersarathi.com"}/exams`,
};

interface ExamGuide {
    _id: string;
    title: string;
    slug: { current: string };
    examType: string;
    category?: string;
    description?: string;
}

export default async function ExamsPage({
    searchParams,
}: {
    searchParams: Promise<{ type?: string }>;
}) {
    const params = await searchParams;
    let exams: ExamGuide[] = [];

    try {
        exams = await getAllExamGuides();
    } catch (error) {
        console.log("CMS not connected");
    }

    // Filter by type if specified
    const filteredExams = params.type
        ? exams.filter((exam) => exam.examType === params.type)
        : exams;

    const examTypes = [
        { value: "all", label: "All Exams", href: "/exams" },
        { value: "government", label: "Government", href: "/exams?type=government" },
        { value: "competitive", label: "Competitive", href: "/exams?type=competitive" },
        { value: "entrance", label: "Entrance", href: "/exams?type=entrance" },
    ];

    const breadcrumbItems = [
        { name: "Home", href: "/" },
        { name: "Exams", href: "/exams" },
    ];

    return (
        <div className="py-10">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(examListSchema) }}
            />

            <div className="page-container">
                <Breadcrumb items={breadcrumbItems} />

                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Exam Preparation Guides
                </h1>
                <p className="text-lg text-muted-foreground mb-4 max-w-2xl">
                    Complete guides with syllabus, exam pattern, preparation strategy, and
                    study plans. Choose your exam and start preparing the right way.
                </p>
                <p className="text-base text-muted-foreground mb-10 max-w-2xl">
                    We know how overwhelming exam preparation can feel. That&apos;s why we&apos;ve
                    created detailed guides that break down everything you need to know —
                    from syllabus to selection. No fluff, just practical advice that works.
                </p>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {examTypes.map((type) => (
                        <Link
                            key={type.value}
                            href={type.href}
                            className={`px-4 py-2 text-sm font-medium rounded-lg no-underline transition-colors ${(params.type === type.value) || (!params.type && type.value === "all")
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : "border border-border text-foreground hover:bg-muted"
                                }`}
                        >
                            {type.label}
                        </Link>
                    ))}
                </div>

                {/* Exam Grid */}
                {filteredExams.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredExams.map((exam) => (
                            <ExamCard
                                key={exam._id}
                                title={exam.title}
                                slug={exam.slug.current}
                                examType={exam.examType}
                                description={exam.description}
                                category={exam.category}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="card text-center py-16">
                        <h3 className="text-lg font-semibold mb-2">No Exams Found</h3>
                        <p className="text-muted-foreground mb-4">
                            {params.type
                                ? `No ${params.type} exams available yet.`
                                : "Connect Sanity CMS to display exam guides."}
                        </p>
                        {params.type && (
                            <Link href="/exams" className="btn btn-outline no-underline">
                                View All Exams
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
