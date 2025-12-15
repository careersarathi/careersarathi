import Link from "next/link";
import ExamCard from "@/components/ui/ExamCard";
import { getFeaturedContent } from "@/lib/queries";

// JSON-LD structured data for SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CAREERSARATHI",
  "description": "Your trusted mentor for exam preparation in India",
  "url": process.env.NEXT_PUBLIC_SITE_URL || "https://careersarathi.com",
  "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://careersarathi.com"}/logo.png`,
  "sameAs": [],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "availableLanguage": ["English", "Hindi"]
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "CAREERSARATHI",
  "url": process.env.NEXT_PUBLIC_SITE_URL || "https://careersarathi.com",
  "description": "Free exam preparation guides for UPSC, SSC, Banking, JEE, NEET, and Board Exams",
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${process.env.NEXT_PUBLIC_SITE_URL || "https://careersarathi.com"}/exams?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export default async function HomePage() {
  // Fetch featured content from Sanity
  let featuredExams: Array<{
    _id: string;
    title: string;
    slug: { current: string };
    examType: string;
    description?: string;
  }> = [];
  let featuredPosts: Array<{
    _id: string;
    title: string;
    slug: { current: string };
    category: string;
    publishedAt: string;
  }> = [];

  try {
    const featured = await getFeaturedContent();
    featuredExams = featured.exams || [];
    featuredPosts = featured.blogPosts || [];
  } catch (error) {
    // CMS not connected yet, show placeholder content
    console.log("CMS not connected, showing placeholder content");
  }

  return (
    <div className="animate-fade-in">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="page-container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            From Syllabus to Selection
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Your trusted mentor for exam preparation. Get syllabus-driven
            strategies, study plans, and practical guidance for government
            exams, competitive exams, and board exams.
          </p>
          <p className="text-base text-muted-foreground max-w-xl mx-auto mb-10">
            Whether you&apos;re preparing for UPSC, SSC, Banking, JEE, NEET, or Board exams —
            we&apos;ve got you covered with honest, no-nonsense preparation strategies that actually work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/exams" className="btn btn-primary no-underline">
              Explore Exam Guides
            </Link>
            <Link href="/blog" className="btn btn-outline no-underline">
              Read Strategy Tips
            </Link>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 md:py-20">
        <div className="page-container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            What CAREERSARATHI Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Syllabus-Driven Strategy
              </h3>
              <p className="text-muted-foreground text-sm">
                Every guide is built around the official syllabus. No
                distractions, just what you need to know.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Structured Study Plans</h3>
              <p className="text-muted-foreground text-sm">
                Week-by-week plans that tell you exactly what to study and when.
                No guesswork.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Honest, Practical Advice</h3>
              <p className="text-muted-foreground text-sm">
                No fake guarantees or clickbait. Just real strategies that
                actually work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Exam Guides */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="page-container">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Exam Guides</h2>
            <Link
              href="/exams"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              View All →
            </Link>
          </div>
          {featuredExams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredExams.map((exam) => (
                <ExamCard
                  key={exam._id}
                  title={exam.title}
                  slug={exam.slug.current}
                  examType={exam.examType}
                  description={exam.description}
                />
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <p className="text-muted-foreground">
                Connect Sanity CMS to display exam guides here.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                See <code className="bg-muted px-1 rounded">sanity/README.md</code> for setup instructions.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Exam Categories */}
      <section className="py-16 md:py-20">
        <div className="page-container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Explore by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/exams?type=government"
              className="card no-underline hover:bg-muted/50 transition-colors group"
            >
              <h3 className="font-semibold mb-1 group-hover:underline underline-offset-4">
                Government Exams
              </h3>
              <p className="text-sm text-muted-foreground">
                SSC, Banking, Railways, Defence
              </p>
            </Link>
            <Link
              href="/exams?type=competitive"
              className="card no-underline hover:bg-muted/50 transition-colors group"
            >
              <h3 className="font-semibold mb-1 group-hover:underline underline-offset-4">
                Competitive Exams
              </h3>
              <p className="text-sm text-muted-foreground">
                UPSC, State PSC, Teaching
              </p>
            </Link>
            <Link
              href="/exams?type=entrance"
              className="card no-underline hover:bg-muted/50 transition-colors group"
            >
              <h3 className="font-semibold mb-1 group-hover:underline underline-offset-4">
                Entrance Exams
              </h3>
              <p className="text-sm text-muted-foreground">
                JEE, NEET, CUET, MBA
              </p>
            </Link>
            <Link
              href="/board-exams"
              className="card no-underline hover:bg-muted/50 transition-colors group"
            >
              <h3 className="font-semibold mb-1 group-hover:underline underline-offset-4">
                Board Exams
              </h3>
              <p className="text-sm text-muted-foreground">
                CBSE, ICSE, State Boards
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="page-container">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl md:text-3xl font-bold">Latest Strategies</h2>
              <Link
                href="/blog"
                className="text-sm font-medium hover:underline underline-offset-4"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="card no-underline group"
                >
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {post.category.replace("-", " ")}
                  </span>
                  <h3 className="font-semibold mt-2 group-hover:underline underline-offset-4">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="page-container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Preparation?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Choose your exam and get a complete preparation roadmap. No
            shortcuts, just structured guidance.
          </p>
          <Link href="/exams" className="btn btn-primary no-underline">
            Find Your Exam Guide
          </Link>
        </div>
      </section>
    </div>
  );
}
