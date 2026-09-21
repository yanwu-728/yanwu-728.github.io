<!--
POST TEMPLATE: AI Slop
1. Customize or replace the draft sections below with your thoughts.
2. Proofread with the Proofreader Agent:
      Ask Antigravity: "Please proofread posts/ai_slop/en.md"
3. Generate or refine zh.md with the Translator Agent:
      Ask Antigravity: "Translate posts/ai_slop/en.md to zh.md"
      or run: python3 scripts/build_content.py --translate
4. Rebuild the browser data file:
      python3 scripts/build_content.py
-->
---
id: ai_slop
title: "How to Say No to AI Slop"
date: "Sept. 20th, 2026"
topic: "Agentic Workflows in Workspace"
tags:
  - agents
  - llm
  - workflows
---

### 30-Second Prompt vs. 45-Minute Review

**We all hate to be slopped on, but we also love slopping on others.**

Producing AI slop is easy and satisfying. With very little input, AI predicts the most likely details to fill in a Google Doc, making us feel productive with minimal effort. Yet when we review AI slop from others, the frustration of not knowing which parts are human vs. AI is real—we achieve so little with so much effort.

The most immediate thing lost in AI slop is **async communication**. A document that should have been reviewed offline now forces a meeting and face-to-face confirmation because the doc itself is useless. Plus it is exhausting and time-consuming to differentiate human intent from AI-generated filler.


### How to slop without pissing people off

- **Have good judgment on what you can slop on and what you can't.**  
  Personal CSS animation or MVP from scratch are great things to slop on, and design docs or product core infrastructures are not. If the slop costs more than a few hours or causes confusion in a 10-person meeting, think twice before you dump the LLM result into the Google docs or Github Pull Request.

- **Review your work afterwards. If it's too hard for you to read, it's too hard for others too.**  
  If reading the doc induces your migraine, maybe it's a good idea to delete it or ask AI for an explanation before you send to others. Some of the more capable models like to invent nouns or metaphors that sound fancy but make no sense after you read it for more than 2 seconds.[^1]


### How to tell others to stop sending you AI slops?

- **Don't read it until you're instructed to do so.**  
  To save your own time and energy, don't immediately jump into the doc unless someone explicitly pinged you to take a look. Even then, there's a non-zero chance that the doc is generated with less than 5 minutes of human effort. In this case, ask whether they want to clean up the doc a bit and whether this is the final version.

- **Politely ask them for a tldr**  
  Be direct about what they want to achieve and what question they want to ask. There must be a reason that you were sent this doc, so maybe just be direct and cut to the point.

- **Ask to break down to smaller pieces**  
  For AI generated code, it's very useful to break down into smaller reviewable pieces. Keep asking the author to break it down until it's small enough for you to review and point out the AI slop from an architectural perspective. 

[^1]: https://www.explainx.ai/dictionary/claudish


