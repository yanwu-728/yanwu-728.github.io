/**
 * Yan Wu - Personal Website Data
 * Minimal, clean, and easily editable.
 */

const SITE_DATA = {
  profile: {
    name: "Yan Wu",
    preferredName: "Sherry",
    title: "Software Engineer at Google DeepMind",
    team: "Antigravity",
    previous: "Windsurf",
    hometown: "Tianjin, China",
    location: "South Bay, California",
    education: [
      {
        degree: "M.Eng in Computer Science",
        school: "MIT",
        year: "Jan 2025"
      },
      {
        degree: "B.S. in Computer Science & Mathematics",
        school: "MIT",
        year: "May 2024"
      }
    ],
    social: {
      github: "https://github.com/yanwu-728",
      linkedin: "https://www.linkedin.com/in/yan-wu-01"
    },
    bio: [
      "I'm a software engineer at Google DeepMind working on Antigravity. Before this, I was at Windsurf working on agentic developer tools.",
      "I graduated from MIT with a Bachelor's in CS and Math in May 2024, and completed my Master's in CS in January 2025.",
      "Originally from Tianjin, China, I'm currently based in the South Bay, California. My technical interests focus on autonomous AI agents, code intelligence, systems, and mathematics."
    ]
  },

  // Experience entries
  experience: [
    {
      role: "Software Engineer",
      company: "Google DeepMind",
      team: "Antigravity",
      period: "2025 — Present",
      location: "South Bay, CA",
      description: "Working on Antigravity, focusing on autonomous agentic coding and developer systems."
    },
    {
      role: "Software Engineer",
      company: "Windsurf",
      team: "Agentic Developer Tools",
      period: "2024 — 2025",
      location: "Mountain View, CA",
      description: "Built agentic coding systems, real-time context engines, and IDE developer workflows."
    },
    {
      role: "M.Eng in Computer Science",
      company: "Massachusetts Institute of Technology (MIT)",
      team: "EECS Department",
      period: "Graduated Jan 2025",
      location: "Cambridge, MA",
      description: "Graduate coursework and research in machine learning systems, algorithms, and computational theory."
    },
    {
      role: "B.S. in Computer Science & Mathematics",
      company: "Massachusetts Institute of Technology (MIT)",
      team: "Course 6-3 & Course 18",
      period: "Graduated May 2024",
      location: "Cambridge, MA",
      description: "Double major in Computer Science and Mathematics. Grounded in discrete algorithms, algebra, analysis, probability, and systems."
    }
  ],

  // Blog / Writing entries (Demo placeholders for Yan to write)
  blogs: [
    {
      id: "demo-post-feedback-loops",
      isDemo: true,
      title: "[Demo] Notes on Environment Feedback Loops in Coding Agents",
      date: "Feb 2025",
      readTime: "3 min",
      topic: "Agentic AI",
      summary: "Placeholder draft note on why execution grounding and verifier loops define autonomous coding performance.",
      content: `
This is a starter demo post. You can replace this content with your own writing.

### Core Idea

Autocomplete predicts the next token. An agent executes a loop:
1. **Plan**: Inspect repository structure and dependencies.
2. **Execute**: Edit files, run test suites, check compiler output.
3. **Correct**: Parse errors, refine hypotheses, and verify invariants.

### Next Steps

Add your own technical posts, papers, and essays directly by editing \`js/data.js\`.
      `
    },
    {
      id: "demo-post-math-reflections",
      isDemo: true,
      title: "[Demo] Reflections on Course 18: Geometry of Representations",
      date: "Jan 2025",
      readTime: "2 min",
      topic: "Math & Theory",
      summary: "Placeholder draft note on geometric intuition and linear algebra in high-dimensional representations.",
      content: `
This is a starter demo post.

### Reflections

Mathematical intuition from MIT Course 18 often clarifies high-dimensional representation dynamics:
- Distance metrics and spectral properties in latent space.
- Low-rank structures and parameter efficiency.
- Optimization geometries across loss surfaces.

Replace this placeholder with your own notes or mathematical explorations!
      `
    }
  ],

  // Misc: Food, Places, Travel
  misc: [
    {
      id: "tianjin-food",
      title: "Tianjin: Hometown Flavors",
      category: "Food",
      location: "Tianjin, China",
      highlight: "Jianbing Guozi (煎饼馃子)",
      note: "Nothing compares to fresh street corner Jianbing Guozi made with crispy baocui (薄脆), green mung bean batter, and sweet savory bean sauce."
    },
    {
      id: "south-bay-routine",
      title: "South Bay: Coffee & Ramen",
      category: "Food",
      location: "South Bay, CA",
      highlight: "Specialty espresso & hand-pulled noodles",
      note: "Exploring local coffee roasters and finding comforting noodle/ramen spots around Mountain View, Sunnyvale, and San Jose after work."
    },
    {
      id: "cambridge-mit",
      title: "Cambridge: Charles River & MIT Days",
      category: "Places",
      location: "Cambridge, MA",
      highlight: "Harvard Bridge, Tatte, Charles River",
      note: "Walking across the bridge over the Charles River with the Boston skyline in view, late-night psets on campus, and coffee and pastries at Tatte."
    },
    {
      id: "california-coast",
      title: "California Coast & Redwoods",
      category: "Places",
      location: "Bay Area, CA",
      highlight: "Highway 1, Pacifica, Half Moon Bay",
      note: "Weekend drives down the coast along Highway 1, coastal fog, and quiet trails through California redwoods."
    }
  ]
};
