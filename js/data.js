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
      "I'm a software engineer at Google DeepMind working on Antigravity. Before this, I was at Windsurf building agentic developer tools.",
      "I graduated from MIT with a Bachelor's in CS and Math in May 2024, and completed my Master's in CS in January 2025.",
      "Originally from Tianjin, China, I'm currently based in South Bay, California. Broadly, I'm interested in AI—specifically AI agents, agentic workflows, and world models—with applications across software engineering, healthcare, and education."
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

  // Blog / Writing entries (Demo placeholders aligned with your interests for you to write)
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
