---
name: proofread-english-blog
description: >-
  Use this skill whenever the author asks to proofread, edit, polish, or review an English blog post
  or note in posts/ or misc/. Enforces high-signal technical precision, active voice, and authentic
  engineering tone while eliminating corporate filler, AI clichés, and formatting errors.
---

# Proofread English Blog Post & Notes

This skill guides the proofreading and technical editing of essays, research notes, and personal observations for Yan Wu's personal website.

## Author Context & Style
- **Author**: Yan Wu, Software Engineer at Google DeepMind (working on Antigravity: agents, reasoning, tools, workflows, world models). Ex-Windsurf, MIT CS & Math graduate.
- **Target Audience**: AI researchers, software engineers, technical leads, and engineering peers.
- **Core Voice**: Direct, smart, conversational, and grounded in real engineering experience (including trade-offs, edge cases, and failure modes).

## Rules & Directives

### 1. High Signal, Zero Fluff & Banned Phrases
Eliminate generic AI jargon, corporate filler, and throat-clearing openings:
- **Banned Clichés**: *delve into, seamless, robust, unleash, empower, testament to, fast-paced world, game-changer, pivotal, tapestry, foster, beacon, landscape*.
- **Banned Openings**:
  - *"In this blog post, we will explore..."* -> Cut and state the thesis directly.
  - *"It is worth noting that..."* -> Cut and state the observation directly.
  - *"At the end of the day..."* -> Cut.
- **Active Voice**: Strictly prefer active voice (*"The model executes the tool"* instead of *"The tool is executed by the model"*).
- **Sentence Rhythm**: Mix punchy short statements with richer explanatory sentences to maintain engaging cadence.

### 2. Technical Rigor & Engineering Precision
- Ensure technical claims regarding agents, LLMs, RL, state machines, context limits, and tool execution loops are logically airtight.
- If a technical assertion is ambiguous or hand-wavy, flag it and propose a concrete, specific example or metric.
- Preserve accurate terminology throughout (e.g. inference, trajectory, grounding, tool calling, multi-turn rollback, feedback loop).

### 3. Formatting & Schema Validation
- Ensure YAML frontmatter is valid and complete:
  ```yaml
  ---
  id: your-post-slug
  title: "Punchy, Compelling Title"
  date: "Feb 2025"
  topic: "Research & Systems"
  tags:
    - agents
    - workflows
    - coding
  readTime: "3 min read"
  # summary: optional
  ---
  ```
- Retain image embedding conventions:
  - Standard centered: `![Caption](assets/images/example.svg)`
  - Compact floated with text wrap: `![Caption|right](assets/images/photo.jpg)`
- Keep code blocks with syntax highlighting language tags (`python`, `bash`, `javascript`, etc.) and KaTeX math (`$...$`).

## Output Format
Always structure the review as follows:
1. **Editor's Assessment**: 2-3 bullet verdict on flow, thesis clarity, and tone.
2. **Notable Changes**: Concise Before & After snippets showing key improvements and rationale.
3. **Polished Final Draft**: Full markdown file content ready to save directly into `en.md`.
4. **Alternative Titles & Summaries**: 2-3 punchy options for the author to choose from.
