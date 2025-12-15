# Sanity CMS Setup

## Quick Start

### 1. Create a Sanity Project

Go to [sanity.io/manage](https://www.sanity.io/manage) and create a new project:
- Click **"Create new project"**
- Name it **"CAREERSARATHI"**
- Choose **"production"** as your dataset

### 2. Get Your Project ID

After creating the project, copy your **Project ID** from the dashboard.

### 3. Create Environment File

Create `.env.local` in the project root:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Add CORS Origin

In Sanity dashboard → API → CORS origins:
- Add `http://localhost:3000`
- Add your production URL when deploying

### 5. Restart Dev Server

```bash
npm run dev
```

### 6. Access Studio

Open [http://localhost:3000/studio](http://localhost:3000/studio)

---

## Content Types

| Type | Description |
|------|-------------|
| **Exam Guide** | Government, competitive, entrance exams |
| **Board Exam** | CBSE, ICSE, State Board exams |
| **Blog Post** | Strategy and guidance articles |

## Content Guidelines

- **SEO Title**: Max 60 characters
- **Meta Description**: Max 160 characters  
- **FAQs**: Minimum 3 per exam guide
- **Blog posts**: Must link to at least 2 exam guides
