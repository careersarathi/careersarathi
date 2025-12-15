"use client";

import { useEffect, useState } from "react";

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    contentSelector?: string;
    className?: string;
}

export default function TableOfContents({
    contentSelector = ".prose",
    className = "",
}: TableOfContentsProps) {
    const [headings, setHeadings] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const content = document.querySelector(contentSelector);
        if (!content) return;

        const elements = content.querySelectorAll("h2, h3");
        const items: TOCItem[] = Array.from(elements).map((el) => ({
            id: el.id,
            text: el.textContent || "",
            level: parseInt(el.tagName.charAt(1)),
        }));

        setHeadings(items);

        // Intersection Observer for active heading
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-80px 0px -80% 0px" }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [contentSelector]);

    if (headings.length === 0) return null;

    return (
        <nav className={`${className}`} aria-label="Table of contents">
            <h4 className="font-semibold text-sm mb-3">On This Page</h4>
            <ul className="space-y-2 text-sm">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{ paddingLeft: heading.level === 3 ? "1rem" : "0" }}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={`block no-underline transition-colors ${activeId === heading.id
                                    ? "text-foreground font-medium"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
