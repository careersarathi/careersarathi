import { defineType, defineField } from "sanity";

export default defineType({
    name: "boardExam",
    title: "Board Exam",
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
            name: "board",
            title: "Board",
            type: "string",
            group: "basic",
            options: {
                list: [
                    { title: "CBSE", value: "cbse" },
                    { title: "ICSE", value: "icse" },
                    { title: "UP Board", value: "up-board" },
                    { title: "Maharashtra Board", value: "maharashtra-board" },
                    { title: "Karnataka Board", value: "karnataka-board" },
                    { title: "Tamil Nadu Board", value: "tamil-nadu-board" },
                    { title: "Other State Board", value: "other-state" },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "class",
            title: "Class",
            type: "string",
            group: "basic",
            options: {
                list: [
                    { title: "Class 10", value: "10" },
                    { title: "Class 12", value: "12" },
                ],
            },
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

        // Content Sections
        defineField({
            name: "overview",
            title: "Overview",
            type: "array",
            of: [{ type: "block" }],
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "subjects",
            title: "Subject-wise Preparation",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        { name: "subject", type: "string", title: "Subject Name" },
                        { name: "tips", type: "array", of: [{ type: "block" }], title: "Preparation Tips" },
                    ],
                },
            ],
            group: "content",
        }),
        defineField({
            name: "scoringStrategies",
            title: "Scoring Strategies",
            type: "array",
            of: [{ type: "block" }],
            group: "content",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "answerWritingTechniques",
            title: "Answer Writing Techniques",
            type: "array",
            of: [{ type: "block" }],
            group: "content",
        }),
        defineField({
            name: "studyPlan",
            title: "Study Plan",
            type: "array",
            of: [{ type: "block" }],
            group: "content",
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
            board: "board",
            class: "class",
        },
        prepare({ title, board, class: cls }) {
            return {
                title,
                subtitle: `${board?.toUpperCase()} - Class ${cls}`,
            };
        },
    },
});
