import { defineType, defineField } from "sanity";

export default defineType({
    name: "blogPost",
    title: "Blog Post",
    type: "document",
    groups: [
        { name: "basic", title: "Basic Info" },
        { name: "seo", title: "SEO" },
        { name: "content", title: "Content" },
    ],
    fields: [
        // Basic Info
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            group: "basic",
            validation: (Rule) => Rule.required().max(100),
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            group: "basic",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            group: "basic",
            options: {
                list: [
                    { title: "Study Techniques", value: "study-techniques" },
                    { title: "Mistakes to Avoid", value: "mistakes-to-avoid" },
                    { title: "Motivation", value: "motivation" },
                    { title: "Preparation Mindset", value: "preparation-mindset" },
                    { title: "Time Management", value: "time-management" },
                    { title: "Exam Strategy", value: "exam-strategy" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "publishedAt",
            title: "Published At",
            type: "datetime",
            group: "basic",
            validation: (Rule) => Rule.required(),
        }),

        // SEO Fields
        defineField({
            name: "seoTitle",
            title: "SEO Title",
            type: "string",
            group: "seo",
            description: "Max 60 characters",
            validation: (Rule) => Rule.required().max(60),
        }),
        defineField({
            name: "metaDescription",
            title: "Meta Description",
            type: "text",
            group: "seo",
            description: "Max 160 characters",
            validation: (Rule) => Rule.required().max(160),
        }),

        // Content
        defineField({
            name: "content",
            title: "Content",
            type: "array",
            of: [
                { type: "block" },
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            type: "string",
                            title: "Alt Text",
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: "caption",
                            type: "string",
                            title: "Caption",
                        },
                    ],
                },
            ],
            group: "content",
            validation: (Rule) => Rule.required(),
        }),

        // Related Exams for internal linking
        defineField({
            name: "relatedExams",
            title: "Related Exam Guides",
            type: "array",
            of: [{ type: "reference", to: [{ type: "examGuide" }] }],
            group: "content",
            description: "Link to at least 2 exam guides for internal linking",
            validation: (Rule) => Rule.min(2),
        }),
    ],
    preview: {
        select: {
            title: "title",
            category: "category",
            date: "publishedAt",
        },
        prepare({ title, category, date }) {
            return {
                title,
                subtitle: `${category} • ${date ? new Date(date).toLocaleDateString() : "Draft"}`,
            };
        },
    },
});
