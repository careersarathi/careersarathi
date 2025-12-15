import Link from "next/link";

const footerLinks = {
    exams: [
        { name: "Government Exams", href: "/exams?type=government" },
        { name: "Competitive Exams", href: "/exams?type=competitive" },
        { name: "Entrance Exams", href: "/exams?type=entrance" },
    ],
    boards: [
        { name: "CBSE Class 10", href: "/board-exams/cbse-10" },
        { name: "CBSE Class 12", href: "/board-exams/cbse-12" },
        { name: "State Boards", href: "/board-exams" },
    ],
    resources: [
        { name: "Study Plans", href: "/resources?category=study-plans" },
        { name: "Books & Materials", href: "/resources?category=books" },
        { name: "Strategy Guides", href: "/blog" },
    ],
};

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border bg-muted/50 mt-20">
            <div className="page-container py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <Link href="/" className="no-underline">
                            <span className="text-xl font-bold tracking-tight">
                                CAREER<span className="font-normal">SARATHI</span>
                            </span>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-3">
                            From Syllabus to Selection
                        </p>
                        <p className="text-sm text-muted-foreground mt-4 max-w-xs">
                            Your trusted mentor for exam preparation. Practical guidance,
                            honest advice, no shortcuts.
                        </p>
                    </div>

                    {/* Exams Column */}
                    <div>
                        <h4 className="font-semibold text-sm mb-4">Exams</h4>
                        <ul className="space-y-3">
                            {footerLinks.exams.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground no-underline transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Board Exams Column */}
                    <div>
                        <h4 className="font-semibold text-sm mb-4">Board Exams</h4>
                        <ul className="space-y-3">
                            {footerLinks.boards.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground no-underline transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h4 className="font-semibold text-sm mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground no-underline transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {currentYear} CAREERSARATHI. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link
                            href="/about"
                            className="text-sm text-muted-foreground hover:text-foreground no-underline transition-colors"
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="text-sm text-muted-foreground hover:text-foreground no-underline transition-colors"
                        >
                            Contact
                        </Link>
                        <Link
                            href="/privacy"
                            className="text-sm text-muted-foreground hover:text-foreground no-underline transition-colors"
                        >
                            Privacy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
