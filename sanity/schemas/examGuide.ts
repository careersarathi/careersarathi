import { defineType, defineField } from "sanity";

export default defineType({
    name: "examGuide",
    title: "Exam Guide",
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
            title: "Exam Title",
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
            name: "examType",
            title: "Exam Type",
            type: "string",
            group: "basic",
            options: {
                list: [
                    { title: "Government", value: "government" },
                    { title: "Competitive", value: "competitive" },
                    { title: "Entrance", value: "entrance" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "category",
            title: "Category",
            type: "string",
            group: "basic",
            description: "e.g., Banking, Railways, UPSC, State PSC",
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

        // Content Sections
        defineField({
            name: "overview",
            title: "Exam Overview",
            type: "array",
            of: [{ type: "block" }],
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "examPattern",
            title: "Exam Pattern",
            type: "array",
            of: [{ type: "block" }],
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "syllabus",
            title: "Syllabus Breakdown",
            type: "array",
            of: [{ type: "block" }],
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "preparationStrategy",
            title: "Preparation Strategy",
            type: "array",
            of: [{ type: "block" }],
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "studyPlan",
            title: "Study Plan",
            type: "array",
            of: [{ type: "block" }],
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "pyqAnalysis",
            title: "Previous Year Question Analysis",
            type: "array",
            of: [{ type: "block" }],
            group: "content",
        }),
        defineField({
            name: "booksAndResources",
            title: "Books & Resources",
            type: "array",
            of: [{ type: "block" }],
            group: "content",
            validation: (Rule) => Rule.required(),
        }),

        // FAQs
        defineField({
            name: "faqs",
            title: "FAQs",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "question", type: "string", title: "Question" },
                        { name: "answer", type: "text", title: "Answer" },
                    ],
                },
            ],
            group: "content",
            validation: (Rule) => Rule.required().min(3),
        }),
    ],
    preview: {
        select: {
            title: "title",
            examType: "examType",
        },
        prepare({ title, examType }) {
            return {
                title,
                subtitle: examType?.charAt(0).toUpperCase() + examType?.slice(1),
            };
        },
    },
});
