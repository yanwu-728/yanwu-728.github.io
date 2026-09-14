/**
 * Yan Wu's Personal Website Data
 * 
 * Edit this file to add new blog posts, food/place recommendations, or update your bio!
 */

const SITE_DATA = {
  profile: {
    name: 'Yan Wu',
    preferredName: 'Sherry',
    headline: 'Software Engineer at Google DeepMind · Antigravity',
    currentRole: 'Software Engineer @ Google DeepMind (Antigravity)',
    previousRole: 'Software Engineer @ Windsurf',
    hometown: 'Tianjin, China',
    currentLocation: 'South Bay, California',
    education: [
      {
        degree: 'Master of Engineering (M.Eng) in Computer Science',
        school: 'Massachusetts Institute of Technology (MIT)',
        period: 'Graduated Jan 2025'
      },
      {
        degree: 'Bachelor of Science (B.S.) in Computer Science and Mathematics',
        school: 'Massachusetts Institute of Technology (MIT)',
        period: 'Graduated May 2024'
      }
    ],
    social: {
      github: 'https://github.com/yanwu-728',
      linkedin: 'https://www.linkedin.com/in/yan-wu-01'
    },
    bio: [
      "Hi! I'm Yan, a software engineer at Google DeepMind working on Antigravity. Previously, I was at Windsurf building agentic developer systems.",
      "I graduated from MIT with a Bachelor's in Computer Science and Mathematics (May 2024) and completed my Master's in Computer Science (Jan 2025). Originally from Tianjin, China, I am currently living in the South Bay, California.",
      "My interests span autonomous AI agents, developer intelligence, systems engineering, and the mathematical principles underpinning modern machine learning."
    ]
  },

  // Minimal, streamlined experience section for the main page
  experience: [
    {
      role: 'Software Engineer',
      organization: 'Google DeepMind',
      team: 'Antigravity',
      period: '2025 – Present',
      location: 'South Bay, CA',
      badge: 'Current',
      summary: 'Building Antigravity — advanced autonomous agentic coding, developer intelligence, and tooling harnesses.'
    },
    {
      role: 'Software Engineer',
      organization: 'Windsurf',
      team: 'Agentic Tools',
      period: 'Prior',
      location: 'Mountain View, CA',
      badge: 'Previous',
      summary: 'Engineered agentic coding workflows, fast context awareness, and IDE-native intelligent assistant capabilities.'
    },
    {
      role: 'M.Eng in Computer Science',
      organization: 'Massachusetts Institute of Technology',
      team: 'EECS Department',
      period: 'Graduated Jan 2025',
      location: 'Cambridge, MA',
      badge: 'MIT',
      summary: 'Graduate research and coursework in machine learning systems, algorithms, and computational theory.'
    },
    {
      role: 'B.S. in Computer Science & Mathematics',
      organization: 'Massachusetts Institute of Technology',
      team: 'Course 6-3 & Course 18',
      period: 'Graduated May 2024',
      location: 'Cambridge, MA',
      badge: 'MIT',
      summary: 'Double major in CS and Mathematics. Deep foundations in algorithms, linear algebra, probability, optimization, and systems.'
    }
  ],

  // Extensible Research & Blog Framework
  // Add new posts by appending objects to this array!
  blogs: [
    {
      id: 'agentic-coding-feedback-loops',
      title: 'Feedback Loops & Environment Grounding in Autonomous Coding Agents',
      date: 'Feb 2025',
      readTime: '5 min read',
      category: 'Agentic AI',
      tags: ['Agents', 'Developer Tools', 'Evaluation'],
      summary: 'Why execution feedback, verification harnesses, and tight terminal tool loops define the frontier of autonomous software engineering.',
      content: `
### Beyond Next-Token Prediction

Modern software engineering agents are fundamentally different from next-token autocomplete. An agent's capability isn't just bounded by the parameter scale of its base model—it is bounded by how tightly and reliably it can interact with an execution environment.

When an agent writes code, it shouldn't guess whether the code compiles, runs, or satisfies tests. True agentic leverage emerges when the model operates inside a closed loop:

1. **Hypothesize & Plan**: Inspect the repository, understand existing architectural patterns and implicit constraints.
2. **Execute & Tool Use**: Run tests, edit files, query linters, inspect logs.
3. **Observe & Correct**: Parse terminal errors, adjust hypotheses, and verify invariants before declaring completion.

### Verification as the Ultimate Reward Signal

In coding benchmarks and real-world codebases, test suites and compiler feedback provide an objective ground truth that open-ended natural language tasks lack. Leveraging this feedback loop intelligently—without spinning in repetitive retry loops—is where the real magic happens.

*(This is a framework post to demonstrate structure. You can easily modify, delete, or add your own articles here!)*
      `
    },
    {
      id: 'math-and-neural-representations',
      title: 'Notes on the Geometry of Latent Representations',
      date: 'Jan 2025',
      readTime: '4 min read',
      category: 'Math & Theory',
      tags: ['Mathematics', 'Linear Algebra', 'Transformers'],
      summary: 'Reflections from MIT Course 18: how geometric intuition and linear algebra illuminate representation dynamics in modern models.',
      content: `
### Connecting Course 18 to Neural Representations

Studying pure mathematics at MIT taught me that geometric intuition often clarifies what seems opaque in raw numerical optimization. In modern deep learning, high-dimensional geometry offers striking lenses for understanding how models generalize:

- **Isometries in Latent Space**: How distance metrics and attention matrices preserve semantic topology across layers.
- **Low-Rank Structures**: Why overparameterized models can be effectively compressed or distilled along intrinsic spectral dimensions.
- **Optimization Landscapes**: How curvature and condition numbers impact gradient descent dynamics across non-convex loss surfaces.

Mathematical grounding provides a strong anchor when debugging complex system dynamics in AI.

*(This is a template post. You can write your own notes and math equations here!)*
      `
    },
    {
      id: 'reading-log-reasoning-and-search',
      title: 'Reading Log: Test-Time Compute & Search in Reasoning',
      date: 'Dec 2024',
      readTime: '4 min read',
      category: 'Reading Notes',
      tags: ['Papers', 'Search', 'Inference Compute'],
      summary: 'Quick takeaways from recent literature on search methods, verifier-guided rollouts, and test-time computation scaling.',
      content: `
### Recent Literature Highlights

A collection of interesting threads across recent research:

1. **Scaling Test-Time Compute**: How spending additional compute during inference (via tree search, verifiers, and multi-candidate generation) compares to pre-training scaling laws.
2. **Self-Correction Boundaries**: Where intrinsic self-correction genuinely recovers from flaws versus where external feedback or verifiers are necessary.
3. **Environment Determinism**: How reproducible environments with structured action spaces improve agent convergence.

*(Framework template ready for your personal reading notes and paper reviews!)*
      `
    }
  ],

  // Misc Section: Good Food, Fun Places & Life
  // Add new favorite spots or travels here!
  misc: [
    {
      id: 'tianjin-home',
      title: 'Tianjin: Hometown Flavors & The Haihe',
      category: 'Places & Travel',
      tag: 'Hometown',
      location: 'Tianjin, China',
      badge: 'Roots',
      highlight: 'Jianbing Guozi (煎饼馃子) & Haihe River views',
      description: 'Nothing beats genuine Tianjin Jianbing made fresh on the street corner with crisp baocui (薄脆), green mung bean batter, and sweet savory sauce. Fond memories of walking along the Haihe river with the illuminated Tianjin Eye.'
    },
    {
      id: 'south-bay-eats',
      title: 'South Bay: Specialty Coffee & Comfort Food',
      category: 'Food & Drinks',
      tag: 'Local Spots',
      location: 'South Bay, California',
      badge: 'Current Favorite',
      highlight: 'Pour-overs, hand-pulled noodles & weekend ramen',
      description: 'Since settling in the South Bay, exploring cozy coffee roasters and finding comforting noodle/hotpot spots after deep engineering sprints has been my favorite weekend ritual.'
    },
    {
      id: 'mit-charles-river',
      title: 'Cambridge & Boston: MIT Memories',
      category: 'Places & Travel',
      tag: 'University',
      location: 'Cambridge & Boston, MA',
      badge: 'MIT Days',
      highlight: 'Charles River runs, Tatte pastries, Boston skyline',
      description: 'Memories of walks across Harvard Bridge overlooking the Boston skyline, late-night hackathons and math psets on campus, and pastries from Tatte in Kendall Square.'
    },
    {
      id: 'pacific-coast-hikes',
      title: 'California Coast & Redwoods',
      category: 'Places & Travel',
      tag: 'Outdoors',
      location: 'Bay Area, CA',
      badge: 'Adventures',
      highlight: 'Highway 1 drives, coastal fog, and redwood trails',
      description: 'Weekend escapes along Highway 1 from Pacifica down toward Half Moon Bay, coastal breeze, and hiking among California giant redwoods.'
    }
  ]
};
