"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeProvider } from "../ThemeProvider";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isStudio = pathname?.startsWith("/studio");

    if (isStudio) {
        return <>{children}</>;
    }

    return (
        <ThemeProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </ThemeProvider>
    );
}
