import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "CAREERSARATHI's privacy policy - how we handle your data and protect your privacy.",
};

export default function PrivacyPage() {
    return (
        <div className="page-container py-12">
            <div className="content-container">
                <h1 className="mb-8">Privacy Policy</h1>

                <div className="prose">
                    <p className="text-lg text-muted-foreground mb-8">
                        Your privacy matters to me. Here&apos;s a straightforward
                        explanation of how CAREERSARATHI handles your information – no
                        legal jargon, just honest transparency.
                    </p>

                    <p className="text-sm text-muted-foreground">
                        Last updated: December 2024
                    </p>

                    <h2>The Short Version</h2>
                    <p>
                        I built CAREERSARATHI to help students with their exam
                        preparation. I&apos;m not in the business of collecting or selling
                        your personal data. The site collects minimal information needed
                        to function properly and improve your experience.
                    </p>

                    <h2>Information We Collect</h2>

                    <h3>Analytics Data</h3>
                    <p>
                        We use Vercel Analytics to understand how visitors use the site.
                        This helps me know which content is helpful and what needs
                        improvement. The data collected includes:
                    </p>
                    <ul>
                        <li>Pages you visit</li>
                        <li>How long you spend on pages</li>
                        <li>General geographic location (country level)</li>
                        <li>Device type and browser information</li>
                    </ul>
                    <p>
                        This data is anonymous and cannot be used to identify you
                        personally.
                    </p>

                    <h3>Local Storage</h3>
                    <p>
                        The website stores your theme preference (light/dark mode) in your
                        browser&apos;s local storage. This stays on your device and
                        isn&apos;t sent anywhere.
                    </p>

                    <h3>Email Communications</h3>
                    <p>
                        If you contact me via email, I&apos;ll have your email address and
                        whatever information you choose to share. I use this only to
                        respond to your queries and will never share it with third
                        parties.
                    </p>

                    <h2>What We Don&apos;t Do</h2>
                    <ul>
                        <li>We don&apos;t sell your data to anyone</li>
                        <li>We don&apos;t use invasive tracking</li>
                        <li>We don&apos;t require you to create an account</li>
                        <li>We don&apos;t send unsolicited marketing emails</li>
                    </ul>

                    <h2>Third-Party Services</h2>
                    <p>The website uses a few third-party services:</p>

                    <h3>Vercel</h3>
                    <p>
                        Our website is hosted on Vercel. They may collect technical data
                        needed to serve the website.{" "}
                        <a
                            href="https://vercel.com/legal/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Read Vercel&apos;s Privacy Policy
                        </a>
                        .
                    </p>

                    <h3>Sanity CMS</h3>
                    <p>
                        We use Sanity to manage our content. No visitor data is shared
                        with Sanity.{" "}
                        <a
                            href="https://www.sanity.io/legal/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Read Sanity&apos;s Privacy Policy
                        </a>
                        .
                    </p>

                    <h2>Cookies</h2>
                    <p>
                        We use minimal cookies that are necessary for the website to
                        function. We don&apos;t use tracking cookies or advertising
                        cookies.
                    </p>

                    <h2>Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Browse the website without providing any personal information</li>
                        <li>Request deletion of any email correspondence</li>
                        <li>Ask questions about how your data is handled</li>
                    </ul>

                    <h2>Changes to This Policy</h2>
                    <p>
                        If I make significant changes to this privacy policy, I&apos;ll
                        update the &quot;Last updated&quot; date at the top. For major
                        changes that affect how your data is used, I&apos;ll make it
                        clearly visible on the website.
                    </p>

                    <h2>Questions?</h2>
                    <p>
                        If you have any questions about this privacy policy or how your
                        data is handled, feel free to reach out at{" "}
                        <a href="mailto:pankajbordoloi@outlook.in">
                            pankajbordoloi@outlook.in
                        </a>
                        .
                    </p>

                    <div className="card bg-muted my-8">
                        <p className="mb-0">
                            <strong>Bottom line:</strong> I respect your privacy and only
                            collect what&apos;s necessary to provide you with a good
                            experience. No sneaky stuff, I promise.
                        </p>
                    </div>

                    <p>
                        <strong>– Pankaj Bordoloi</strong>
                        <br />
                        Creator of CAREERSARATHI
                    </p>
                </div>
            </div>
        </div>
    );
}
