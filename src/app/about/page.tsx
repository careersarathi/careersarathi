import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about CAREERSARATHI - your trusted companion for exam preparation, created by Pankaj Bordoloi from Assam, India.",
};

export default function AboutPage() {
    return (
        <div className="page-container py-12">
            <div className="content-container">
                <h1 className="mb-8">About CAREERSARATHI</h1>

                <div className="prose">
                    <p className="text-lg text-muted-foreground mb-8">
                        Hey there! Welcome to CAREERSARATHI – your go-to place for exam
                        preparation guidance. I&apos;m really glad you&apos;re here.
                    </p>

                    <h2>Our Story</h2>
                    <p>
                        CAREERSARATHI was born out of a simple idea: exam preparation
                        shouldn&apos;t feel overwhelming. I&apos;ve seen too many students
                        struggle not because they lack intelligence, but because they lack
                        proper guidance. That&apos;s where we come in.
                    </p>
                    <p>
                        The name &quot;CAREERSARATHI&quot; comes from the Hindi word
                        &quot;Sarathi&quot; meaning a charioteer or guide – someone who helps
                        you navigate your journey. Just like Arjuna had Krishna as his
                        Sarathi, we want to be your trusted companion on your exam
                        preparation journey.
                    </p>

                    <h2>What We Offer</h2>
                    <p>
                        We focus on what actually matters – syllabus-driven strategies,
                        realistic study plans, and practical tips that work. No fluff, no
                        unrealistic promises. Just honest, helpful content that can make a
                        real difference in your preparation.
                    </p>
                    <ul>
                        <li>
                            <strong>Exam Guides</strong> – Comprehensive coverage for
                            government and competitive exams
                        </li>
                        <li>
                            <strong>Board Exam Help</strong> – Class 10 and 12 preparation
                            strategies
                        </li>
                        <li>
                            <strong>Study Resources</strong> – Curated materials and study
                            plans
                        </li>
                        <li>
                            <strong>Blog</strong> – Tips, motivation, and exam strategies
                        </li>
                    </ul>

                    <h2>Meet the Creator</h2>
                    <p>
                        I&apos;m <strong>Pankaj Bordoloi</strong>, a freelance graphic
                        designer and web developer from the beautiful state of Assam,
                        India. I built CAREERSARATHI because I believe quality education
                        resources should be accessible to everyone, regardless of where
                        they come from.
                    </p>
                    <p>
                        When I&apos;m not coding or designing, you&apos;ll find me
                        exploring new technologies, working on creative projects, or
                        enjoying the scenic beauty of Northeast India.
                    </p>

                    <h2>Our Philosophy</h2>
                    <blockquote>
                        &quot;From Syllabus to Selection&quot; – This isn&apos;t just our
                        tagline, it&apos;s our promise. We believe that with the right
                        guidance, anyone can achieve their goals.
                    </blockquote>
                    <p>
                        Every piece of content on this site is created with care, keeping
                        in mind the real challenges students face. We don&apos;t just tell
                        you what to study – we help you understand how to study
                        effectively.
                    </p>

                    <h2>Get in Touch</h2>
                    <p>
                        Have questions, suggestions, or just want to say hi? I&apos;d love
                        to hear from you! Feel free to reach out through our{" "}
                        <a href="/contact">contact page</a>.
                    </p>
                    <p>
                        Thank you for being here. Together, let&apos;s make your exam
                        preparation journey smoother and more successful! 🚀
                    </p>
                </div>
            </div>
        </div>
    );
}
