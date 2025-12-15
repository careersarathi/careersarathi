import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FAQAccordion from "@/components/ui/FAQAccordion";
import TableOfContents from "@/components/ui/TableOfContents";
import ExamCard from "@/components/ui/ExamCard";
import { getExamGuideBySlug, getRelatedExamGuides } from "@/lib/queries";

interface Props {
    params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    try {
        const exam = await getExamGuideBySlug(slug);
        if (!exam) return { title: "Exam Not Found" };

        return {
            title: exam.seoTitle || exam.title,
            description: exam.metaDescription,
            openGraph: {
                title: exam.seoTitle || exam.title,
                description: exam.metaDescription,
                type: "article",
            },
        };
    } catch {
        return { title: "Exam Guide" };
    }
}

// Portable Text components for rendering rich content
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
};

export default async function ExamGuidePage({ params }: Props) {
    const { slug } = await params;

    let exam;
    let relatedExams: Array<{
        _id: string;
        title: string;
        slug: { current: string };
        examType: string;
        description?: string;
    }> = [];

    try {
        exam = await getExamGuideBySlug(slug);
        if (exam) {
            relatedExams = await getRelatedExamGuides(slug, exam.examType);
        }
    } catch {
        // CMS not connected - show placeholder
    }

    if (!exam) {
        notFound();
    }

    const breadcrumbItems = [
        { name: "Home", href: "/" },
        { name: "Exams", href: "/exams" },
        { name: exam.title, href: `/exams/${slug}` },
    ];

    // JSON-LD for Article schema
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: exam.seoTitle || exam.title,
        description: exam.metaDescription,
        dateModified: exam._updatedAt,
        author: {
            "@type": "Organization",
            name: "CAREERSARATHI",
        },
        publisher: {
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
                    <Breadcrumb items={breadcrumbItems} />

                    <div className="lg:grid lg:grid-cols-[1fr_250px] lg:gap-12">
                        {/* Main Content */}
                        <article className="prose max-w-none">
                            {/* Header */}
                            <header className="mb-10">
                                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                    {exam.examType} Exam
                                </span>
                                <h1 className="mt-2 mb-4">{exam.title}</h1>
                                {exam.category && (
                                    <p className="text-muted-foreground">Category: {exam.category}</p>
                                )}
                            </header>

                            {/* Overview */}
                            <section>
                                <h2 id="overview">Overview</h2>
                                <PortableText
                                    value={exam.overview}
                                    components={portableTextComponents}
                                />
                            </section>

                            {/* Exam Pattern */}
                            <section>
                                <h2 id="exam-pattern">Exam Pattern</h2>
                                <PortableText
                                    value={exam.examPattern}
                                    components={portableTextComponents}
                                />
                            </section>

                            {/* Syllabus */}
                            <section>
                                <h2 id="syllabus">Syllabus Breakdown</h2>
                                <PortableText
                                    value={exam.syllabus}
                                    components={portableTextComponents}
                                />
                            </section>

                            {/* Preparation Strategy */}
                            <section>
                                <h2 id="preparation-strategy">Preparation Strategy</h2>
                                <PortableText
                                    value={exam.preparationStrategy}
                                    components={portableTextComponents}
                                />
                            </section>

                            {/* Study Plan */}
                            <section>
                                <h2 id="study-plan">Study Plan</h2>
                                <PortableText
                                    value={exam.studyPlan}
                                    components={portableTextComponents}
                                />
                            </section>

                            {/* PYQ Analysis */}
                            {exam.pyqAnalysis && (
                                <section>
                                    <h2 id="pyq-analysis">Previous Year Question Analysis</h2>
                                    <PortableText
                                        value={exam.pyqAnalysis}
                                        components={portableTextComponents}
                                    />
                                </section>
                            )}

                            {/* Books & Resources */}
                            <section>
                                <h2 id="books-resources">Books & Resources</h2>
                                <PortableText
                                    value={exam.booksAndResources}
                                    components={portableTextComponents}
                                />
                            </section>

                            {/* FAQs */}
                            {exam.faqs && exam.faqs.length > 0 && (
                                <section>
                                    <h2 id="faqs">Frequently Asked Questions</h2>
                                    <FAQAccordion items={exam.faqs} className="mt-6" />
                                </section>
                            )}
                        </article>

                        {/* Sidebar - Table of Contents */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-24">
                                <TableOfContents />
                            </div>
                        </aside>
                    </div>

                    {/* Related Exams */}
                    {relatedExams.length > 0 && (
                        <section className="mt-16 pt-10 border-t border-border">
                            <h2 className="text-2xl font-bold mb-6">Related Exam Guides</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedExams.map((related) => (
                                    <ExamCard
                                        key={related._id}
                                        title={related.title}
                                        slug={related.slug.current}
                                        examType={related.examType}
                                        description={related.description}
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
}
