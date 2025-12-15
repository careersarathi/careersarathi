import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-muted-foreground mb-8 max-w-md">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/" className="btn btn-primary no-underline">
                        Go Home
                    </Link>
                    <Link href="/exams" className="btn btn-outline no-underline">
                        Browse Exams
                    </Link>
                </div>
            </div>
        </div>
    );
}
