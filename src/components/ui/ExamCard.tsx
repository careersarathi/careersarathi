import Link from "next/link";

interface ExamCardProps {
    title: string;
    slug: string;
    examType: string;
    description?: string;
    category?: string;
}

export default function ExamCard({
    title,
    slug,
    examType,
    description,
    category,
}: ExamCardProps) {
    const examTypeLabels: Record<string, string> = {
        government: "Government",
        competitive: "Competitive",
        entrance: "Entrance",
    };

    return (
        <Link href={`/exams/${slug}`} className="no-underline group">
            <article className="card h-full flex flex-col">
                {/* Type Badge */}
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {examTypeLabels[examType] || examType}
                    </span>
                    {category && (
                        <span className="text-xs bg-muted px-2 py-0.5 rounded">
                            {category}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 group-hover:underline underline-offset-4">
                    {title}
                </h3>

                {/* Description */}
                {description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                        {description}
                    </p>
                )}

                {/* Arrow indicator */}
                <div className="mt-4 flex items-center text-sm font-medium">
                    <span>View Guide</span>
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
                </div>
            </article>
        </Link>
    );
}
