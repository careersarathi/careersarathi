import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText, PortableTextComponents, PortableTextBlock } from "@portabletext/react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import FAQAccordion from "@/components/ui/FAQAccordion";
import TableOfContents from "@/components/ui/TableOfContents";
import { getBoardExamBySlug } from "@/lib/queries";

interface SubjectItem {
    subject: string;
    tips: PortableTextBlock[];
}

interface Props {
    params: Promise<{ board: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { board } = await params;

    try {
        const exam = await getBoardExamBySlug(board);
        if (!exam) return { title: "Board Exam Not Found" };

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
        return { title: "Board Exam Guide" };
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
};

export default async function BoardExamPage({ params }: Props) {
    const { board } = await params;

    let exam;

    try {
        exam = await getBoardExamBySlug(board);
    } catch {
        // CMS not connected
    }

    if (!exam) {
        notFound();
    }

    const breadcrumbItems = [
        { name: "Home", href: "/" },
        { name: "Board Exams", href: "/board-exams" },
        { name: exam.title, href: `/board-exams/${board}` },
    ];

    const boardLabels: Record<string, string> = {
        cbse: "CBSE",
        icse: "ICSE",
        "up-board": "UP Board",
        "maharashtra-board": "Maharashtra Board",
    };

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
                        <article className="prose max-w-none">
                            <header className="mb-10">
                                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                    {boardLabels[exam.board] || exam.board} • Class {exam.class}
                                </span>
                                <h1 className="mt-2">{exam.title}</h1>
                            </header>

                            {/* Overview */}
                            <section>
                                <h2 id="overview">Overview</h2>
                                <PortableText
                                    value={exam.overview}
                                    components={portableTextComponents}
                                />
                            </section>

                            {/* Subject-wise Preparation */}
                            {exam.subjects && exam.subjects.length > 0 && (
                                <section>
                                    <h2 id="subjects">Subject-wise Preparation</h2>
                                    {exam.subjects.map(
                                        (
                                            subject: SubjectItem,
                                            index: number
                                        ) => (
                                            <div key={index} className="mb-6">
                                                <h3>{subject.subject}</h3>
                                                <PortableText
                                                    value={subject.tips}
                                                    components={portableTextComponents}
                                                />
                                            </div>
                                        )
                                    )}
                                </section>
                            )}

                            {/* Scoring Strategies */}
                            <section>
                                <h2 id="scoring-strategies">Scoring Strategies</h2>
                                <PortableText
                                    value={exam.scoringStrategies}
                                    components={portableTextComponents}
                                />
                            </section>

                            {/* Answer Writing Techniques */}
                            {exam.answerWritingTechniques && (
                                <section>
                                    <h2 id="answer-writing">Answer Writing Techniques</h2>
                                    <PortableText
                                        value={exam.answerWritingTechniques}
                                        components={portableTextComponents}
                                    />
                                </section>
                            )}

                            {/* Study Plan */}
                            {exam.studyPlan && (
                                <section>
                                    <h2 id="study-plan">Study Plan</h2>
                                    <PortableText
                                        value={exam.studyPlan}
                                        components={portableTextComponents}
                                    />
                                </section>
                            )}

                            {/* FAQs */}
                            {exam.faqs && exam.faqs.length > 0 && (
                                <section>
                                    <h2 id="faqs">Frequently Asked Questions</h2>
                                    <FAQAccordion items={exam.faqs} className="mt-6" />
                                </section>
                            )}
                        </article>

                        <aside className="hidden lg:block">
                            <div className="sticky top-24">
                                <TableOfContents />
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
}
