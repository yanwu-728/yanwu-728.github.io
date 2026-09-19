<!--
HOW TO CREATE A NEW POST:
1. Duplicate this `_template` folder into `posts/` and name it (e.g. `posts/01-my-first-post`).
2. Fill in the frontmatter below and write your content in `en.md`.
3. To auto-generate the Chinese version, run:
      python3 scripts/build_content.py --translate
   Or manually create `zh.md` in the same folder.
4. Rebuild the browser data file by running:
      python3 scripts/build_content.py
-->
---
id: your-post-slug
title: "Your Article Title Here"
date: "Feb 2025"
topic: "Research & Systems"
tags:
  - agents
  - workflows
  - coding
# readTime: auto (optional, calculated automatically from word count)
---

### Introduction

Write your introduction here in standard markdown. You can use **bold text**, *italics*, [hyperlinks](https://example.com), and `inline code`.

### Key Highlights

- **Point 1**: Description of your first finding or idea.
- **Point 2**: Description of your second finding or idea.
- **Point 3**: Description of your third finding or idea.

### Code Example

```python
def example_workflow():
    # Write code blocks easily with syntax highlighting
    return "Hello from your new post!"
```

### Embedding Images

- **Centered standard image**:
  `![Architecture Diagram](assets/images/example.svg)`

- **Compact image floated to the right (text wraps on the left)**:
  `![Photo Caption|right](assets/images/photo.jpg)`

### Conclusion

Wrap up your thoughts with concluding remarks and next steps.
