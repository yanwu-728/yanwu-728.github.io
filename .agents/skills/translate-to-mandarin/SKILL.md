---
name: translate-to-mandarin
description: >-
  Use this skill whenever translating, paraphrasing, or localizing an English blog post or note into
  Mandarin Chinese (zh.md). Eliminates translationese (翻译腔), preserves proper nouns (Google DeepMind,
  Windsurf, MIT, Juzhang/局长), and produces elegant, idiomatic Chinese technical writing.
---

# Mandarin Technical Translator & Paraphraser (技术翻译与编译润色)

This skill guides the translation and paraphrasing of English blog posts and notes into natural, idiomatic Mandarin Chinese for Yan Wu's website.

## Author Context & Style
- **Author**: Yan Wu, Software Engineer at Google DeepMind (Antigravity). Ex-Windsurf, MIT CS & Math graduate.
- **Target Audience**: Chinese AI researchers, software engineers, and technical peers.
- **Core Standard**: "信达雅" adapted to modern engineering: **准确（信）、通畅（达）、专业（雅）**.

## Rules & Directives

### 1. Eliminate "翻译腔" (Zero Translationese)
- **Avoid Passive Voice Overuse**: Avoid literal translations of passive constructions (如避免过度使用“被...所影响”、“被设计为”). Use active voice or natural topicalized Chinese:
  - ❌ *"The tool is called by the agent when..."* -> *"当工具被智能体调用时..."*
  - ✅ *"当智能体调用工具时..."*
- **Avoid Pronoun Soup**: In Chinese, omit redundant pronouns ("我", "它", "它们") when the subject is contextually clear.
- **Restructure Long Clauses**: English relies on long, nested relative clauses (`which`, `that`, `where`). In Chinese, break them down into shorter, punchy sentences connected by natural logic.
- **Avoid Mechanical Connectors**: Eliminate clunky literal translations like *"关于..."*, *"在...方面"*, *"为了实现这一点..."*. Use concise native transitions.

### 2. Proper Noun & Technical Glossary Guardrails
- **Preserved Unchanged**:
  - Google DeepMind, DeepMind, Antigravity, Windsurf, MIT, Course 6-3, Course 18, F-1 OPT, H-1B, Python, PyTorch, Linux, Mac.
- **Personal Names**:
  - Yan's cat: "Juzhang" -> **"局长"**
- **Authoritative Technical Glossary**:
  - Agent / Agentic -> **智能体 / Agent**
  - Workflow -> **工作流**
  - World Model -> **世界模型**
  - Tool Execution / Tool Call -> **工具调用 / 工具执行**
  - Verification Loop / Feedback Loop -> **验证闭环 / 反馈回路**
  - Self-Correction / Reflexion -> **自我纠错 / 反思修正**
  - Reasoning Trace / Trajectory -> **推理轨迹 / 思维链**
  - Grounding -> **事实锚定 / 语境对齐**
  - In-Context Learning -> **上下文学习**
  - Fine-Tuning -> **微调**
  - Trade-Off -> **权衡 / 取舍**

### 3. Dual Mode Support
- **Mode A: Faithful Bilingual Sync (信达标准译)**: Paragraph-by-paragraph translation mirroring `en.md` for clean side-by-side reading on the website.
- **Mode B: Idiomatic Paraphrase (达雅精炼版)**: Natural, polished tech essay style optimizing readability and impact for Chinese technical audiences.

### 4. Formatting & Frontmatter Sync
- Adapt YAML frontmatter into Chinese while keeping keys consistent:
  ```yaml
  ---
  id: match-en-id
  title: "清晰有力的中文标题"
  date: "Feb 2025"
  topic: "研究与系统"
  tags:
    - 智能体
    - 工作流
  readTime: "3 分钟阅读"
  # summary: optional (如果英文版没有 summary 则省略)
  ---
  ```
- Retain image embedding syntax:
  - Standard centered: `![中文说明](assets/images/...)`
  - Compact floated: `![中文说明|right](assets/images/...)`
- Keep code blocks, inline code, and LaTeX math identical.

## Workflow Execution
1. Read `en.md` from the target folder (`posts/<slug>/` or `misc/<slug>/`).
2. Generate the translated / paraphrased content.
3. Save to `zh.md` in the same directory.
4. Run `python3 scripts/build_content.py` to compile the changes into `data/posts.js` or `data/misc.js`.
