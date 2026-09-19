#!/usr/bin/env python3
"""
Content Builder & Translation Pipeline for Yan Wu's Personal Website.
Compiles markdown files in posts/ and misc/ into browser-ready data/posts.js and data/misc.js.
Supports writing only en.md and generating zh.md with preserved proper nouns.
Zero external dependencies (uses standard Python 3).
"""

import os
import sys
import re
import json
import time
import urllib.request
import urllib.parse
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
POSTS_DIR = ROOT_DIR / "posts"
MISC_DIR = ROOT_DIR / "misc"
DATA_DIR = ROOT_DIR / "data"

PROPER_NOUNS = [
    "Google DeepMind",
    "DeepMind",
    "Antigravity",
    "Windsurf",
    "MIT",
    "Course 6-3",
    "Course 18",
    "Zoom",
    "F-1 OPT",
    "H-1B",
    "Juzhang",
    "局长",
    "Skyline Trail",
    "Hoh Rain Forest",
    "Pike Place Market",
    "Puget Sound",
    "Mount Rainier",
    "Olympic National Park"
]

def parse_markdown_frontmatter(file_path):
    """Parses YAML-style frontmatter and body from a markdown file."""
    if not os.path.exists(file_path):
        return None, ""
    
    with open(file_path, "r", encoding="utf-8") as f:
        text = f.read()

    # Strip optional leading HTML comments or whitespace before frontmatter
    match = re.match(r"^(?:<!--.*?-->\s*)?---\s*\n(.*?)\n---\s*\n(.*)$", text, re.DOTALL)
    if not match:
        return {}, text.strip()

    front_raw, body = match.group(1), match.group(2).strip()
    metadata = {}
    current_key = None

    for line in front_raw.splitlines():
        # Handle list item
        if line.strip().startswith("- ") and current_key:
            val = line.strip()[2:].strip().strip("\"'")
            if not isinstance(metadata.get(current_key), list):
                metadata[current_key] = []
            metadata[current_key].append(val)
            continue

        if ":" in line:
            key, val = line.split(":", 1)
            key = key.strip()
            val = val.strip()
            current_key = key

            # Empty value (e.g. start of a list)
            if not val:
                metadata[key] = []
                continue

            # Inline list e.g. [cat, food]
            if val.startswith("[") and val.endswith("]"):
                items = [item.strip().strip("\"'") for item in val[1:-1].split(",") if item.strip()]
                metadata[key] = items
                continue

            # Boolean
            if val.lower() == "true":
                metadata[key] = True
            elif val.lower() == "false":
                metadata[key] = False
            else:
                # String value
                metadata[key] = val.strip("\"'")

    return metadata, body

def estimate_read_time(text, lang="en"):
    """
    Calculates read time estimate based on word/character count.
    - English: ~200 words per minute (standard web reading speed).
    - Chinese: ~300 characters per minute.
    Strips markdown images, code blocks, HTML tags, and links for accurate word count.
    """
    if not text:
        return "1 min read" if lang != "zh" else "1分钟阅读"

    # Strip markdown images, code blocks, HTML tags, and link URLs
    clean = re.sub(r"!\[.*?\]\(.*?\)", "", text)
    clean = re.sub(r"```[\s\S]*?```", "", clean)
    clean = re.sub(r"<[^>]+>", "", clean)
    clean = re.sub(r"\[(.*?)\]\(.*?\)", r"\1", clean)

    if lang == "zh":
        chars = len(re.findall(r"[\u4e00-\u9fff]", clean))
        eng_words = len(re.findall(r"\b[a-zA-Z0-9_-]+\b", clean))
        effective = chars + (eng_words * 1.5)
        mins = max(1, round(effective / 300))
        return f"{mins}分钟阅读"
    else:
        words = len(re.findall(r"\b[a-zA-Z0-9_'-]+\b", clean))
        mins = max(1, round(words / 200))
        return f"{mins} min read"

def translate_text(text, preserve_nouns=PROPER_NOUNS):
    """Translates text to Simplified Chinese preserving proper nouns."""
    if not text:
        return ""

    # Replace proper nouns with unique tokens
    placeholders = {}
    protected_text = text
    for idx, noun in enumerate(preserve_nouns):
        token = f"__NOUN_{idx}__"
        if noun in protected_text:
            placeholders[token] = noun
            protected_text = protected_text.replace(noun, token)

    # Attempt Google Translate public API
    url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=" + urllib.parse.quote(protected_text)
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    translated = ""
    try:
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            translated = "".join(seg[0] for seg in data[0] if seg[0])
    except Exception:
        # If offline / sandboxed, return protected_text or fallback
        translated = protected_text

    # Restore proper nouns
    for token, noun in placeholders.items():
        translated = translated.replace(token, noun)
        # also handle case where translator inserted spaces around token
        translated = translated.replace(token.replace("_", " "), noun)

    return translated

def generate_chinese_file(en_file_path, zh_file_path, force=False):
    """Generates a zh.md file from en.md."""
    if os.path.exists(zh_file_path) and not force:
        print(f"  [skip] {zh_file_path.name} already exists. Use --force to overwrite.")
        return False

    meta, body = parse_markdown_frontmatter(en_file_path)
    if not meta:
        print(f"  [error] Could not parse {en_file_path}")
        return False

    print(f"  [translating] {en_file_path.parent.name} to Chinese...")
    title_en = meta.get("title", "")
    summary_en = meta.get("summary", "")

    title_zh = translate_text(title_en)
    summary_zh = translate_text(summary_en) if summary_en else ""
    body_zh = translate_text(body)
    read_time_zh = estimate_read_time(body_zh, "zh")

    # Frontmatter reconstruction
    zh_lines = ["---"]
    if "id" in meta:
        zh_lines.append(f"id: {meta['id']}")
    if "isDemo" in meta:
        zh_lines.append(f"isDemo: {str(meta['isDemo']).lower()}")
    zh_lines.append(f"title: \"{title_zh}\"")
    if "date" in meta:
        zh_lines.append(f"date: {meta['date']}")
    if "topic" in meta:
        zh_lines.append(f"topic: {meta['topic']}")
    if "tags" in meta:
        zh_lines.append("tags:")
        for t in meta["tags"]:
            zh_lines.append(f"  - {t}")
    zh_lines.append(f"readTime: {read_time_zh}")
    if "image" in meta:
        zh_lines.append(f"image: {meta['image']}")
    if summary_zh:
        zh_lines.append(f"summary: \"{summary_zh}\"")
    zh_lines.append("---\n")
    zh_lines.append(body_zh + "\n")

    with open(zh_file_path, "w", encoding="utf-8") as f:
        f.write("\n".join(zh_lines))

    print(f"  [created] {zh_file_path}")
    return True

def scan_entries(directory):
    """Scans subfolders in directory for en.md and zh.md."""
    entries = []
    if not os.path.exists(directory):
        return entries

    dirs = sorted([d for d in os.listdir(directory) if os.path.isdir(os.path.join(directory, d)) and not d.startswith(".") and d != "_template"])
    
    for d in dirs:
        folder = Path(directory) / d
        en_path = folder / "en.md"
        zh_path = folder / "zh.md"

        if not en_path.exists():
            continue

        en_meta, en_body = parse_markdown_frontmatter(en_path)
        zh_meta, zh_body = parse_markdown_frontmatter(zh_path) if zh_path.exists() else ({}, "")

        slug = en_meta.get("id") or d
        # Remove numerical sort prefix like '01-' for id if not provided in frontmatter
        clean_id = re.sub(r"^\d+-", "", slug)

        # Auto-calculate read time based on word count
        en_rt_meta = en_meta.get("readTime")
        if not en_rt_meta or en_rt_meta in ["auto", "1 min read", "2 min read", "3 min read"]:
            en_read_time = estimate_read_time(en_body, "en")
        else:
            en_read_time = en_rt_meta

        zh_rt_meta = zh_meta.get("readTime") if zh_meta else None
        if not zh_rt_meta or zh_rt_meta in ["auto", "1 分钟阅读", "1分钟阅读", "2 分钟阅读", "2分钟阅读", "3 分钟阅读", "3分钟阅读"]:
            zh_read_time = estimate_read_time(zh_body if zh_body else en_body, "zh")
        else:
            zh_read_time = zh_rt_meta

        entry = {
            "id": en_meta.get("id") or clean_id,
            "date": en_meta.get("date", ""),
            "tags": en_meta.get("tags") or [],
            "readTime": {
                "en": en_read_time,
                "zh": zh_read_time
            },
            "en": {
                "title": en_meta.get("title", ""),
                "summary": en_meta.get("summary", ""),
                "content": en_body
            },
            "zh": {
                "title": (zh_meta.get("title") if zh_meta else en_meta.get("title", "")),
                "summary": (zh_meta.get("summary") if zh_meta else en_meta.get("summary", "")),
                "content": zh_body if zh_body else en_body
            }
        }

        if "isDemo" in en_meta:
            entry["isDemo"] = en_meta["isDemo"]
        if "topic" in en_meta:
            entry["topic"] = en_meta["topic"]
        if "image" in en_meta:
            entry["image"] = en_meta["image"]

        entries.append((d, entry))

    return [e[1] for e in entries]

def build_posts():
    """Builds data/posts.js from posts/*/."""
    posts = scan_entries(POSTS_DIR)
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    out_file = DATA_DIR / "posts.js"

    js_code = [
        "// Auto-generated by scripts/build_content.py",
        "// Source: posts directory",
        "// Do not edit this file directly. Edit the markdowns in posts/ instead.\n",
        "(function() {",
        f"  const posts = {json.dumps(posts, indent=2, ensure_ascii=False)};",
        "  posts.forEach(post => {",
        "    if (typeof registerBlogPost === 'function') {",
        "      registerBlogPost(post);",
        "    }",
        "  });",
        "})();\n"
    ]

    with open(out_file, "w", encoding="utf-8") as f:
        f.write("\n".join(js_code))
    print(f"✓ Built {len(posts)} posts -> {out_file}")

def build_misc():
    """Builds data/misc.js from misc/*/."""
    misc_items = scan_entries(MISC_DIR)
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    out_file = DATA_DIR / "misc.js"

    js_code = [
        "// Auto-generated by scripts/build_content.py",
        "// Source: misc directory",
        "// Do not edit this file directly. Edit the markdowns in misc/ instead.\n",
        f"registerMisc({json.dumps(misc_items, indent=2, ensure_ascii=False)});\n"
    ]

    with open(out_file, "w", encoding="utf-8") as f:
        f.write("\n".join(js_code))
    print(f"✓ Built {len(misc_items)} misc notes -> {out_file}")

def create_new_entry(content_type, slug):
    """Scaffolds a new entry with en.md template."""
    base_dir = POSTS_DIR if content_type == "post" else MISC_DIR
    target_dir = base_dir / slug
    if target_dir.exists():
        print(f"Error: {target_dir} already exists!")
        return

    target_dir.mkdir(parents=True, exist_ok=True)
    en_file = target_dir / "en.md"

    if content_type == "post":
        content = f"""---
id: {slug}
title: "{slug.replace('-', ' ').title()}"
date: {time.strftime('%b %Y')}
topic: "Research"
tags:
  - agents
summary: "Brief summary of {slug.replace('-', ' ')}."
---

### Introduction

Write your post content here in markdown.
"""
    else:
        content = f"""---
id: {slug}
title: "{slug.replace('-', ' ').title()}"
date: {time.strftime('%Y')}
tags:
  - notes
summary: "Brief note about {slug.replace('-', ' ')}."
---

### Notes

Write your note here in markdown.
"""

    with open(en_file, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✓ Created {en_file}")
    print(f"Run 'python3 scripts/build_content.py --translate {slug}' to generate Chinese after writing English.")

def translate_all_missing(force=False):
    """Finds any en.md without zh.md and creates zh.md."""
    for parent_dir in [POSTS_DIR, MISC_DIR]:
        if not parent_dir.exists():
            continue
        for d in sorted(os.listdir(parent_dir)):
            sub = parent_dir / d
            if sub.is_dir() and not d.startswith(".") and d != "_template":
                en = sub / "en.md"
                zh = sub / "zh.md"
                if en.exists():
                    generate_chinese_file(en, zh, force=force)

def main():
    args = sys.argv[1:]
    
    if "--help" in args or "-h" in args:
        print("""
Usage: python3 scripts/build_content.py [OPTIONS]

Options:
  (no args)               Build both posts/ and misc/ into data/*.js
  --translate [slug]      Generate missing zh.md files (or for specific slug)
  --force                 Overwrite existing zh.md during translation
  --new-post <slug>       Scaffold a new blog post in posts/<slug>/
  --new-misc <slug>       Scaffold a new misc note in misc/<slug>/
  --watch                 Watch for changes and auto-compile
        """)
        return

    if "--new-post" in args:
        idx = args.index("--new-post")
        if idx + 1 < len(args):
            create_new_entry("post", args[idx + 1])
            return
        else:
            print("Error: Specify slug, e.g. --new-post my-agent-ideas")
            return

    if "--new-misc" in args:
        idx = args.index("--new-misc")
        if idx + 1 < len(args):
            create_new_entry("misc", args[idx + 1])
            return
        else:
            print("Error: Specify slug, e.g. --new-misc coffee-tour")
            return

    force = "--force" in args

    if "--translate" in args:
        idx = args.index("--translate")
        slug = args[idx + 1] if idx + 1 < len(args) and not args[idx + 1].startswith("--") else None
        if slug:
            # find matching slug
            found = False
            for base in [POSTS_DIR, MISC_DIR]:
                for d in os.listdir(base):
                    if slug in d and (base / d).is_dir():
                        en = base / d / "en.md"
                        zh = base / d / "zh.md"
                        if en.exists():
                            generate_chinese_file(en, zh, force=force)
                            found = True
            if not found:
                print(f"Could not find entry matching '{slug}'")
        else:
            translate_all_missing(force=force)

    # Build everything
    build_posts()
    build_misc()

    if "--watch" in args:
        print("Watching for changes in posts/ and misc/... (Ctrl+C to stop)")
        last_mtime = 0
        while True:
            mtime = 0
            for d in [POSTS_DIR, MISC_DIR]:
                for root, _, files in os.walk(d):
                    for file in files:
                        p = os.path.join(root, file)
                        mtime = max(mtime, os.path.getmtime(p))
            if mtime > last_mtime:
                last_mtime = mtime
                print("\nChange detected. Rebuilding...")
                build_posts()
                build_misc()
            time.sleep(1)

if __name__ == "__main__":
    main()
