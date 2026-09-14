# AGENTS.md - Workspace Agent Guide for Yan Wu's Personal Website

This repository is configured with two specialized subagents and Antigravity skills to streamline writing and localizing blog posts and notes.

---

## 1. Agent Overview

| Agent | Type Name | Skill Name | Role & Mission |
| :--- | :--- | :--- | :--- |
| **English Proofreader** | `proofreader` | `proofread-english-blog` | Polishes English blogs and notes for high-signal clarity, active voice, and authentic engineering depth without corporate fluff. |
| **Mandarin Translator** | `translator` | `translate-to-mandarin` | Translates and paraphrases posts into natural, idiomatic Chinese ("信达雅") with zero translationese and strict proper-noun preservation. |

---

## 2. How to Use in Antigravity

### Option A: Invoke as Subagents
You can ask Antigravity to delegate work to these agents in chat:
- *"Please ask the proofreader agent to review `posts/01-new-post/en.md`."*
- *"Ask the translator agent to create `zh.md` for `posts/01-new-post/`."*

### Option B: Built-in Skills
Antigravity automatically discovers the skills in `.agents/skills/`:
- `proofread-english-blog` triggers automatically when asking to review or polish English drafts.
- `translate-to-mandarin` triggers automatically when asking to translate or paraphrase to Chinese.

---

## 3. Standalone Prompts for External LLMs
If you want to use these agents in ChatGPT, Claude, or Cursor, copy the full system prompts from:
- [prompts/agent-proofreader.md](prompts/agent-proofreader.md)
- [prompts/agent-translator.md](prompts/agent-translator.md)

---

## 4. Content Publishing Workflow
1. Create a draft in `posts/<slug>/en.md` or `misc/<slug>/en.md` (use `_template/en.md` as reference).
2. Proofread with the **Proofreader Agent**.
3. Generate `zh.md` with the **Translator Agent** (or run `python3 scripts/build_content.py --translate`).
4. Rebuild browser data:
   ```bash
   python3 scripts/build_content.py
   ```
5. Commit and push to deploy:
   ```bash
   git add -A && git commit -m "feat: add new post" && git push
   ```
