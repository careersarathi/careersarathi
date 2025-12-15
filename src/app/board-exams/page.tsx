import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { getAllBoardExams } from "@/lib/queries";

export const metadata: Metadata = {
    title: "Board Exam Preparation 2025 - CBSE, ICSE & State Board Tips",
    description:
        "Complete preparation guides for CBSE, ICSE, and State Board exams 2025. Get subject-wise tips, scoring strategies, answer writing techniques, and time management tips for Class 10 and 12.",
    keywords: [
        "CBSE board exam 2025",
        "ICSE preparation",
        "class 10 board exam tips",
        "class 12 preparation guide",
        "board exam answer writing",
        "CBSE sample papers",
        "state board exam tips",
        "board exam time management",
        "how to score 90+ in boards",
        "board exam study plan",
    ],
};

// JSON-LD for board exams page
const boardExamsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Board Exam Preparation Guides",
    "description": "Subject-wise preparation guides for Class 10 and 12 board exams including CBSE, ICSE, and State Boards",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://careersarathi.com"}/board-exams`,
};

interface BoardExam {
    _id: string;
    title: string;
    slug: { current: string };
    board: string;
    class: string;
    description?: string;
}

export default async function BoardExamsPage() {
    let boardExams: BoardExam[] = [];

    try {
        boardExams = await getAllBoardExams();
    } catch {
        console.log("CMS not connected");
    }

    // Group by board
    const groupedByBoard = boardExams.reduce<Record<string, BoardExam[]>>((acc, exam) => {
        if (!acc[exam.board]) {
            acc[exam.board] = [];
        }
        acc[exam.board].push(exam);
        return acc;
    }, {});

    const breadcrumbItems = [
        { name: "Home", href: "/" },
        { name: "Board Exams", href: "/board-exams" },
    ];

    const boardLabels: Record<string, string> = {
        cbse: "CBSE",
        icse: "ICSE",
        "up-board": "UP Board",
        "maharashtra-board": "Maharashtra Board",
        "karnataka-board": "Karnataka Board",
        "tamil-nadu-board": "Tamil Nadu Board",
        "other-state": "Other State Boards",
    };

    return (
        <div className="py-10">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(boardExamsSchema) }}
            />

            <div className="page-container">
                <Breadcrumb items={breadcrumbItems} />

                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Board Exam Preparation
                </h1>
                <p className="text-lg text-muted-foreground mb-4 max-w-2xl">
                    Subject-wise preparation guides, scoring strategies, and answer
                    writing techniques for Class 10 and 12 board exams.
                </p>
                <p className="text-base text-muted-foreground mb-10 max-w-2xl">
                    Board exams can make or break your future opportunities. But don&apos;t panic —
                    with the right approach, anyone can score well. Our guides focus on what
                    actually matters: understanding concepts, practicing smartly, and writing
                    answers that examiners want to reward.
                </p>

                {/* Quick Links */}
                <div className="flex flex-wrap gap-3 mb-12">
                    <Link
                        href="/board-exams/cbse-10"
                        className="btn btn-outline no-underline"
                    >
                        CBSE Class 10
                    </Link>
                    <Link
                        href="/board-exams/cbse-12"
                        className="btn btn-outline no-underline"
                    >
                        CBSE Class 12
                    </Link>
                </div>

                {/* Board Cards */}
                {Object.keys(groupedByBoard).length > 0 ? (
                    <div className="space-y-12">
                        {Object.entries(groupedByBoard).map(([board, exams]) => (
                            <section key={board}>
                                <h2 className="text-xl font-semibold mb-4">
                                    {boardLabels[board] || board}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {exams.map((exam) => (
                                        <Link
                                            key={exam._id}
                                            href={`/board-exams/${exam.slug.current}`}
                                            className="card no-underline group"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-medium text-muted-foreground uppercase">
                                                    Class {exam.class}
                                                </span>
                                            </div>
                                            <h3 className="font-semibold group-hover:underline underline-offset-4">
                                                {exam.title}
                                            </h3>
                                            {exam.description && (
                                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                                                    {exam.description}
                                                </p>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                ) : (
                    <div className="card text-center py-16">
                        <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                        <p className="text-muted-foreground">
                            Board exam guides will be available soon. Connect Sanity CMS to
                            add content.
                        </p>
                    </div>
                )}

                {/* Info Section */}
                <section className="mt-16 pt-10 border-t border-border">
                    <h2 className="text-2xl font-bold mb-6">
                        Why Board Exam Preparation Matters
                    </h2>
                    <div className="prose max-w-none">
                        <p>
                            Board exams are often the first major milestone in a
                            student&apos;s academic journey. A strong foundation here sets the
                            stage for competitive exams, entrance tests, and career growth.
                        </p>
                        <p>Our board exam guides focus on:</p>
                        <ul>
                            <li>Subject-wise preparation with topic priorities</li>
                            <li>Answer writing techniques to maximize marks</li>
                            <li>Time management strategies for exam day</li>
                            <li>Common mistakes to avoid</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}
