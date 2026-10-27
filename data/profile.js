/**
 * Profile & Bio Data (Bilingual)
 * Specific proper nouns remain untranslated.
 */

registerProfile({
  name: "Yan Wu",
  social: {
    linkedin: "https://www.linkedin.com/in/yan-wu-01",
    github: "https://github.com/yanwu-728",
    scholar: "https://scholar.google.com/citations?user=_gzU1DUAAAAJ&hl=en"
  },
  juzhang: {
    baseCrimes: 14,
    baseKnocked: 27,
    photos: [
      {
        src: "assets/images/chonk-juzhang.png",
        pos: "center center",
        en: {
          title: "Executive Posture",
          caption: "Slouched on the couch like a bureau chief after a three-hour department meeting."
        },
        zh: {
          title: "局级坐姿",
          caption: "瘫坐沙发正中，宛如刚开完三小时部门大会的局里一把手。"
        }
      },
      {
        src: "assets/images/grinding-juzhang.jpeg",
        pos: "center center",
        en: {
          title: "Staff PR Reviewer",
          caption: "Loafing behind the keyboard and silently judging every commit."
        },
        zh: {
          title: "特聘代码审查员",
          caption: "端坐键盘后方监工，冷静审视每一行新提交的代码。"
        }
      }
    ],
    incidents: [
      {
        en: "Toppled the heavy cat tree onto the entryway shoe rack.",
        zh: "把沉重的猫爬架精准推倒在玄关鞋架上，运动鞋与拖鞋散落一地。"
      },
      {
        en: "Pushed open the window screen for an unauthorized Sunday stroll.",
        zh: "周日清晨徒手推开纱窗，神不知鬼不觉溜出门巡视街区。"
      },
      {
        en: "Tripped the ER vet by materializing directly under her desk.",
        zh: "在宠物急诊室大夫桌底突然闪现，成功绊了大夫一跤。"
      },
      {
        en: "Swatted a pen off the desk while maintaining direct eye contact.",
        zh: "直视你的眼睛，慢条斯理用肉垫把签字笔拨下书桌。"
      },
      {
        en: "Stepped across the keyboard and nearly force-pushed to main.",
        zh: "从容踩过键盘，差点往 main 分支执行 force push。"
      },
      {
        en: "Knocked over a water glass at 2:00 AM to verify local gravity.",
        zh: "凌晨两点推翻水杯，对南湾局部重力加速度进行抽检。"
      },
      {
        en: "Meowed non-stop at 6:00 AM demanding breakfast 45 minutes early.",
        zh: "早上六点准时巡房喵喵叫，强烈要求提前四十五分钟开饭。"
      }
    ]
  },
  en: {
    title: "Software Engineer at Google DeepMind",
    team: "Antigravity",
    previous: "Windsurf",
    education: "MIT (B.S. '24, M.Eng '25)",
    location: "South Bay, CA",
    bio: [
      "I'm a software engineer at <strong>Google DeepMind</strong> working on <strong>Antigravity</strong>. Previously, I was at <strong>Windsurf</strong> building agentic developer tools.",
      "I graduated from <strong>MIT</strong> with a Bachelor's in Computer Science and Mathematics (May 2024), and completed my Master's in Computer Science (January 2025).",
      "Originally from Tianjin, China, I'm currently based in South Bay, California. Broadly, I'm interested in <strong>AI</strong>—particularly <strong>AI agents</strong>, <strong>agentic workflows</strong>, and <strong>world models</strong>—with applications in <strong>software engineering</strong>, <strong>healthcare</strong>, and <strong>education</strong>.",
      "Outside of work, you'll mostly find me hunting down good boba, checking out new local food spots, hanging out with my cat (<button type=\"button\" class=\"juzhang-inline-trigger\" onclick=\"handleJuzhangTriggerClick(event)\" title=\"Inspect Juzhang's dossier\"><span class=\"juzhang-paw-dot\" aria-hidden=\"true\">🐾</span><strong>Juzhang</strong> / 局长</button>, pronounced <em>\"joo-jahng\"</em>, an orange 4-year-old boy), or picking up random sports and fitness classes (and quitting them just as fast)."
    ],
    interests: [
      "AI Agents & Agentic Workflows",
      "World Models & Environment Simulation",
      "Software Engineering & Code Intelligence",
      "AI for Healthcare & Education",
      "Mathematical Foundations & Optimization"
    ]
  },
  zh: {
    title: "Google DeepMind 软件工程师",
    team: "Antigravity",
    previous: "前 Windsurf",
    education: "MIT（计算机与数学学士 '24，计算机硕士 '25）",
    location: "加州南湾",
    bio: [
      "我是 <strong>Google DeepMind</strong> 的软件工程师，专注于 <strong>Antigravity</strong> 项目。此前，我曾在 <strong>Windsurf</strong> 构建智能体开发者工具。",
      "我毕业于 <strong>MIT</strong>，于2024年5月获得计算机科学与数学学士学位，并于2025年1月获得计算机科学硕士学位。",
      "我来自中国天津，目前常驻加州南湾。广泛来说，我对 <strong>AI</strong> 抱有浓厚兴趣——特别是 <strong>AI agents</strong>、<strong>agentic workflows</strong> 以及 <strong>world models</strong>——并探索其在<strong>软件工程</strong>、<strong>医疗</strong>和<strong>教育</strong>等领域的实际应用。",
      "工作之余，你大多能发现我在探店好喝的奶茶、打卡新开的本地餐厅、陪伴我的小猫（<button type=\"button\" class=\"juzhang-inline-trigger\" onclick=\"handleJuzhangTriggerClick(event)\" title=\"查看局长小档案\"><span class=\"juzhang-paw-dot\" aria-hidden=\"true\">🐾</span><strong>局长</strong> / Juzhang</button>，一只4岁大的橘猫小男孩），或者随缘体验各种运动与健身课程（然后同样迅速地失去兴趣）。"
    ],
    interests: [
      "AI Agents 与智能体工作流",
      "World Models 与环境仿真",
      "软件工程与代码智能",
      "AI 在医疗与教育领域的应用",
      "数学基础与优化理论"
    ]
  }
});
