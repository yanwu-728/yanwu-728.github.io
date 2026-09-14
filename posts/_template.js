/**
 * Blog Post Template
 *
 * HOW TO ADD A NEW POST:
 * 1. Duplicate this file and rename it (e.g., posts/my-new-post.js).
 * 2. Fill in the fields below.
 * 3. Add <script src="posts/my-new-post.js"></script> to index.html before js/app.js.
 * That's it!
 */

registerBlogPost({
  // Unique URL slug (e.g. #post/my-new-post)
  id: "my-new-post",

  // Metadata
  date: "2025",
  topic: "AI / Tech",
  readTime: {
    en: "4 min read",
    zh: "4分钟阅读"
  },

  // English version
  en: {
    title: "My New Blog Post Title",
    summary: "A short 1-2 sentence summary of this post that shows up in preview cards and in the summary callout box.",
    content: `
# Heading 1

Write your post in standard Markdown. Paragraphs, lists, and code blocks work out of the box.

## Key Insights

- Point 1
- Point 2

\`\`\`python
def hello_world():
    print("Code snippets render cleanly too!")
\`\`\`
`
  },

  // Simplified Chinese version (Optional: falls back to English if omitted)
  zh: {
    title: "新博文标题",
    summary: "博文的简短1-2句概括，将展示在预览卡片与文章头部的总结呼出框中。",
    content: `
# 一级标题

直接使用标准 Markdown 编写博文内容。段落、列表、代码块均可原生渲染。

## 核心思考

- 要点 1
- 要点 2
`
  }
});
