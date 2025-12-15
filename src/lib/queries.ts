import { client } from "./sanity";

// ============================================
// Exam Guide Queries
// ============================================

export async function getAllExamGuides() {
    return client.fetch(`
    *[_type == "examGuide"] | order(title asc) {
      _id,
      title,
      slug,
      examType,
      category,
      "description": overview[0].children[0].text
    }
  `);
}

export async function getExamGuideBySlug(slug: string) {
    return client.fetch(
        `
    *[_type == "examGuide" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      examType,
      category,
      seoTitle,
      metaDescription,
      overview,
      examPattern,
      syllabus,
      preparationStrategy,
      studyPlan,
      pyqAnalysis,
      booksAndResources,
      faqs,
      _updatedAt
    }
  `,
        { slug }
    );
}

export async function getRelatedExamGuides(currentSlug: string, examType: string) {
    return client.fetch(
        `
    *[_type == "examGuide" && slug.current != $currentSlug && examType == $examType][0...3] {
      _id,
      title,
      slug,
      examType,
      "description": overview[0].children[0].text
    }
  `,
        { currentSlug, examType }
    );
}

// ============================================
// Board Exam Queries
// ============================================

export async function getAllBoardExams() {
    return client.fetch(`
    *[_type == "boardExam"] | order(board asc, class desc) {
      _id,
      title,
      slug,
      board,
      class,
      "description": overview[0].children[0].text
    }
  `);
}

export async function getBoardExamBySlug(slug: string) {
    return client.fetch(
        `
    *[_type == "boardExam" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      board,
      class,
      seoTitle,
      metaDescription,
      overview,
      subjects,
      scoringStrategies,
      answerWritingTechniques,
      studyPlan,
      faqs,
      _updatedAt
    }
  `,
        { slug }
    );
}

// ============================================
// Blog Queries
// ============================================

export async function getAllBlogPosts() {
    return client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      category,
      publishedAt,
      "excerpt": content[0].children[0].text
    }
  `);
}

export async function getBlogPostBySlug(slug: string) {
    return client.fetch(
        `
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      category,
      seoTitle,
      metaDescription,
      content,
      publishedAt,
      _updatedAt
    }
  `,
        { slug }
    );
}

// ============================================
// Homepage Queries
// ============================================

export async function getFeaturedContent() {
    return {
        exams: await client.fetch(`
      *[_type == "examGuide"] | order(_createdAt desc)[0...6] {
        _id,
        title,
        slug,
        examType,
        "description": overview[0].children[0].text
      }
    `),
        blogPosts: await client.fetch(`
      *[_type == "blogPost"] | order(publishedAt desc)[0...3] {
        _id,
        title,
        slug,
        category,
        publishedAt
      }
    `),
    };
}
