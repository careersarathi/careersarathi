"use client";

import { useState } from "react";

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    items: FAQItem[];
    className?: string;
}

export default function FAQAccordion({ items, className = "" }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // JSON-LD for FAQ Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className={`space-y-3 ${className}`}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="border border-border rounded-lg overflow-hidden"
                    >
                        <button
                            type="button"
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-4 text-left bg-background hover:bg-muted/50 transition-colors"
                            aria-expanded={openIndex === index}
                        >
                            <span className="font-medium pr-4">{item.question}</span>
                            <svg
                                className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-200 ${openIndex === index ? "max-h-96" : "max-h-0"
                                }`}
                        >
                            <div className="p-4 pt-0 text-muted-foreground">
                                {item.answer}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
