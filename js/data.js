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
      linkedin: "https://www.linkedin.com/in/yan-wu-01",
      scholar: "https://scholar.google.com/citations?user=_gzU1DUAAAAJ&hl=en"
    },
    bio: [
      "I'm a software engineer at Google DeepMind working on Antigravity. Before this, I was at Windsurf building agentic developer tools.",
      "I graduated from MIT with a Bachelor's in CS and Math in May 2024, and completed my Master's in CS in January 2025.",
      "Originally from Tianjin, China, I'm currently based in South Bay, California. Broadly, I'm interested in AI—specifically AI agents, agentic workflows, and world models—with applications across software engineering, healthcare, and education.",
      "In my spare time, you can spot me trying out different boba places, visiting newly opened local restaurants, hanging out with my cat (Juzhang, an orange 4-year-old boy), and trying out different fitness classes and sports (and losing interest quickly too)."
    ],
    interests: [
      "AI Agents & Agentic Workflows",
      "World Models & Environment Simulation",
      "Software Engineering & Code Intelligence",
      "AI for Healthcare & Education",
      "Mathematical Foundations & Optimization"
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
      description: "Working on Antigravity, focusing on autonomous agentic coding, verification loops, and developer systems."
    },
    {
      role: "Software Engineer",
      company: "Windsurf",
      team: "Agentic Developer Tools",
      period: "2024 — 2025",
      location: "Mountain View, CA",
      description: "Built agentic coding workflows, fast context engines, and developer interaction paradigms."
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

  // Blog / Writing entries (Demo placeholders for you to write)
  blogs: [
    {
      id: "demo-post-agents-and-workflows",
      isDemo: true,
      title: "[Demo] On AI Agents, Workflows, and Tool Execution Loops",
      date: "Feb 2025",
      readTime: "3 min",
      topic: "AI Agents",
      summary: "Starter draft on why agentic workflows and multi-turn verification loops outperform static generation in coding and complex domains.",
      content: `
This is a starter template. Replace this text with your own essay or notes!

### From Single-Prompt to Autonomous Workflows

Agentic leverage comes from how reliably a model can plan, execute tools, observe feedback, and self-correct across multi-turn environments. 

Applications in:
- **Coding**: Test-driven loops, compiler feedback, and repository-scale navigation.
- **Healthcare & Clinical Workflows**: High-stakes reasoning where multi-step verification and domain grounding are critical.
- **Education**: Adaptive pedagogical dialogue, interactive simulations, and personalized feedback.
      `
    },
    {
      id: "demo-post-world-models",
      isDemo: true,
      title: "[Demo] World Models: Simulating State, Physics, and Logic",
      date: "Jan 2025",
      readTime: "2 min",
      topic: "World Models",
      summary: "Starter draft on predictive world models, simulation environments, and grounded decision making.",
      content: `
This is a starter template.

### World Models & Environments

To act effectively, agents need accurate models of how the world responds to their actions—whether that world is a compiler environment, a physiological simulator, or an interactive educational tool.

Replace this placeholder with your own notes or papers you've read!
      `
    }
  ],

  // Misc Section: Personal notes with tags (food, travel, visa, cat)
  misc: [
    {
      id: "juzhang-cat",
      title: "Life with Juzhang",
      date: "2025",
      tags: ["cat"],
      highlight: "Orange 4-year-old boy",
      note: "Hanging out with Juzhang, my orange 4-year-old cat who faithfully oversees all coding sprints, problem-solving, and nap schedules."
    },
    {
      id: "boba-and-restaurants",
      title: "Boba Hunts & Local Eats",
      date: "2025",
      tags: ["food"],
      highlight: "Tasting new boba shops & restaurants",
      note: "Constantly testing out different boba spots for good tea quality, visiting newly opened restaurants, and trying (and quickly rotating through) new fitness classes and sports."
    },
    {
      id: "us-visa-notes",
      title: "Notes on US Visas & Immigration Pathways",
      date: "2025",
      tags: ["visa"],
      highlight: "F-1 OPT, STEM extension & work visas",
      note: "Practical thoughts, timelines, and experiences navigating international student and researcher immigration in tech."
    },
    {
      id: "tianjin-food",
      title: "Tianjin Hometown Flavors: Jianbing Guozi",
      date: "2025",
      tags: ["food"],
      highlight: "Jianbing Guozi (煎饼馃子)",
      note: "Nothing compares to fresh street-corner Jianbing Guozi made with crispy baocui (薄脆), green mung bean batter, and sweet savory bean sauce."
    },
    {
      id: "california-coast",
      title: "Coastal Escapes: Highway 1 & Redwoods",
      date: "2024",
      tags: ["travel"],
      highlight: "Pacifica, Half Moon Bay, and forest trails",
      note: "Weekend drives down Highway 1 along the Pacific coast, coastal fog, and quiet hikes through California giant redwoods."
    },
    {
      id: "cambridge-mit",
      title: "Cambridge & Boston Memories",
      date: "2024",
      tags: ["travel"],
      highlight: "Charles River, Harvard Bridge & Tatte",
      note: "Evening walks across the Charles River overlooking the Boston skyline, late-night hack sessions, and pastries at Tatte."
    }
  ]
};
