import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Check if Sanity is properly configured
export const isSanityConfigured = Boolean(projectId);

// Create a client - uses placeholder when not configured to allow build
export const client: SanityClient = createClient({
    projectId: projectId || "placeholder-for-build",
    dataset: dataset,
    apiVersion: "2024-01-01",
    useCdn: process.env.NODE_ENV === "production",
});

const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
    return builder.image(source);
}
