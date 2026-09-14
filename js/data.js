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
      "In my spare time, you can spot me trying out different boba places, visiting newly opened local restaurants, hanging out with my cat (Juzhang / 局长, pronounced \"joo-jahng\", an orange 4-year-old boy), and trying out different fitness classes and sports (and losing interest quickly too)."
    ],
    interests: [
      "AI Agents & Agentic Workflows",
      "World Models & Environment Simulation",
      "Software Engineering & Code Intelligence",
      "AI for Healthcare & Education",
      "Mathematical Foundations & Optimization"
    ]
  },

  // Interactive Journey Data (Years: 2001 -> 2004 -> 2016 -> 2020 -> 2021 -> 2025)
  journey: {
    cities: {
      jiamusi: { name: "Jiamusi, Heilongjiang", x: 232.9, y: 78.1, label: "Jiamusi" },
      tianjin: { name: "Tianjin, China", x: 205.2, y: 99.3, label: "Tianjin" },
      sparta: { name: "Sparta, NJ", x: 560.2, y: 94.1, label: "Sparta, NJ" },
      boston: { name: "Boston, MA (MIT)", x: 567.8, y: 90.4, label: "Boston" },
      southbay: { name: "South Bay, CA", x: 460.3, y: 104.3, label: "South Bay" }
    },
    steps: [
      {
        id: 0,
        cityKey: "jiamusi",
        tag: "Birthplace",
        year: "2001",
        title: "Born in Jiamusi, Heilongjiang",
        desc: "Born in Jiamusi, Heilongjiang province in northeastern China.",
        routeLabel: "Birthplace",
        arc: null
      },
      {
        id: 1,
        cityKey: "tianjin",
        tag: "Growing Up",
        year: "2004",
        title: "Moved to Tianjin",
        desc: "Moved to Tianjin in 2004 and grew up along the Haihe river.",
        routeLabel: "Jiamusi → Tianjin (~1,100 km)",
        arc: "M 232.9,78.1 Q 215,74 205.2,99.3"
      },
      {
        id: 2,
        cityKey: "sparta",
        tag: "High School",
        year: "2016",
        title: "Moved to Sparta, New Jersey",
        desc: "Crossed the Pacific to attend high school in Sparta, New Jersey in 2016.",
        routeLabel: "Tianjin → Sparta, NJ (~11,000 km)",
        arc: "M 205.2,99.3 Q 382.7,10 560.2,94.1"
      },
      {
        id: 3,
        cityKey: "tianjin",
        tag: "Pandemic Return",
        year: "2020",
        title: "Returned to Tianjin",
        desc: "Moved back home to Tianjin in 2020 due to the pandemic.",
        routeLabel: "Sparta, NJ → Tianjin (~11,000 km)",
        arc: "M 560.2,94.1 Q 382.7,24 205.2,99.3"
      },
      {
        id: 4,
        cityKey: "boston",
        tag: "MIT (B.S. & M.Eng)",
        year: "2021",
        title: "Moved to Boston for MIT",
        desc: "Moved to Boston in 2021 for college and master's at MIT (Course 6-3 CS & Course 18 Math).",
        routeLabel: "Tianjin → Boston, MA (~11,100 km)",
        arc: "M 205.2,99.3 Q 386.5,6 567.8,90.4"
      },
      {
        id: 5,
        cityKey: "southbay",
        tag: "Present",
        year: "2025",
        title: "Moved to South Bay, California",
        desc: "Moved to the South Bay in 2025 to join Google DeepMind working on Antigravity.",
        routeLabel: "Boston → South Bay, CA (~4,300 km)",
        arc: "M 567.8,90.4 Q 514.0,62 460.3,104.3"
      }
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
      title: "Life with Juzhang (局长)",
      date: "2025",
      tags: ["cat"],
      image: "assets/images/juzhang.jpg",
      highlight: "Orange 4-year-old boy · 'joo-jahng'",
      note: "Hanging out with Juzhang (局长, pronounced \"joo-jahng\"—literally 'bureau chief'), my orange 4-year-old cat who faithfully oversees all coding sprints, problem-solving, and nap schedules."
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
