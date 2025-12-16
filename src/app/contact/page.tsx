import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with CAREERSARATHI. We'd love to hear from you – questions, feedback, or just a friendly hello!",
};

export default function ContactPage() {
    return (
        <div className="page-container py-12">
            <div className="content-container">
                <h1 className="mb-8">Get in Touch</h1>

                <div className="prose">
                    <p className="text-lg text-muted-foreground mb-8">
                        Have a question, suggestion, or just want to say hello? I&apos;d
                        genuinely love to hear from you. Drop me a message, and I&apos;ll
                        get back to you as soon as I can!
                    </p>

                    <h2>Email Me</h2>
                    <p>
                        The best way to reach me is through email. Whether you have a
                        question about exam preparation, want to suggest a new topic, or
                        just want to share your feedback – my inbox is always open.
                    </p>

                    <div className="card my-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-muted rounded-lg">
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium mb-1">Email</p>
                                <a
                                    href="mailto:pankajbordoloi@outlook.in"
                                    className="text-lg hover:underline"
                                >
                                    pankajbordoloi@outlook.in
                                </a>
                            </div>
                        </div>
                    </div>

                    <h2>What Can I Help With?</h2>
                    <ul>
                        <li>
                            <strong>Exam Queries</strong> – Questions about specific exams or
                            study strategies
                        </li>
                        <li>
                            <strong>Content Suggestions</strong> – Topics you&apos;d like me
                            to cover
                        </li>
                        <li>
                            <strong>Feedback</strong> – What&apos;s working? What could be
                            better?
                        </li>
                        <li>
                            <strong>Collaboration</strong> – Interested in working together?
                            Let&apos;s talk!
                        </li>
                        <li>
                            <strong>Bug Reports</strong> – Found something broken on the
                            site? Please let me know!
                        </li>
                    </ul>

                    <h2>Response Time</h2>
                    <p>
                        I try to respond to all emails within 24-48 hours. If you
                        don&apos;t hear back from me within a week, please feel free to
                        send a follow-up – sometimes emails get lost in the shuffle.
                    </p>

                    <h2>A Small Request</h2>
                    <p>
                        While I genuinely want to help, I&apos;m a one-person team here.
                        So if you&apos;re reaching out with a question, please check if
                        the answer might already be on the website. But if you&apos;ve
                        looked and still need help, don&apos;t hesitate to write!
                    </p>

                    <div className="card bg-muted my-8">
                        <p className="mb-0">
                            <strong>Pro tip:</strong> When writing about exam-related
                            queries, include details like the exam name, your current
                            preparation level, and specific challenges you&apos;re facing.
                            This helps me give you more relevant advice!
                        </p>
                    </div>

                    <p>
                        Looking forward to hearing from you! 🙌
                        <br />
                        <strong>– Pankaj Bordoloi</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
