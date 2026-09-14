/**
 * Bilingual UI Dictionary (English & Simplified Chinese)
 * Proper nouns like Google DeepMind, Windsurf, MIT, etc. are preserved.
 */

var I18N = {
  en: {
    role_sidebar: "Software Engineer",
    company_sidebar: "Google DeepMind",
    team_sidebar: "Antigravity",
    past_sidebar: "ex-Windsurf · MIT CS & Math",
    location_sidebar: "South Bay, CA",
    nav_about: "About",
    nav_experience: "Experience",
    nav_writing: "Writing",
    nav_misc: "Misc",
    journey_title: "Roots & Journey",
    journey_play: "Play \u25b6",
    journey_pause: "Pause \u2225",
    journey_reset: "Reset \u21ba",
    experience_preview_title: "Experience",
    experience_page_title: "Experience & Education",
    experience_page_intro: "Engineering roles and academic degrees.",
    writing_preview_title: "Writing & Notes",
    writing_page_title: "Writing & Notes",
    writing_page_intro: "Personal notes, papers, and ideas.",
    demo_notice: "<strong>Demo placeholder:</strong> The notes below are starter drafts on agents, workflows, and world models. You can add your own posts in <code>posts/</code> anytime.",
    misc_preview_title: "Misc & Life",
    misc_page_title: "Misc",
    misc_page_intro: "Observations, food, travel, visa notes, and life with my cat.",
    tag_all: "all",
    tag_cat: "cat",
    tag_food: "food",
    tag_travel: "travel",
    tag_visa: "visa",
    view_all: "View all \u2192",
    read_suffix: "read",
    back_to_writing: "\u2190 Back to Writing",
    back_to_about: "\u2190 Back to About",
    back_to_misc: "\u2190 Back to Misc",
    summary_heading: "Summary",
    tag_agents: "agents",
    tag_workflows: "workflows",
    tag_coding: "coding",
    tag_world_models: "world-models",
    tag_simulation: "simulation"
  },
  zh: {
    role_sidebar: "软件工程师",
    company_sidebar: "Google DeepMind",
    team_sidebar: "Antigravity",
    past_sidebar: "前 Windsurf · MIT 计算机与数学",
    location_sidebar: "加州南湾",
    nav_about: "关于",
    nav_experience: "经历",
    nav_writing: "写作",
    nav_misc: "随笔",
    journey_title: "成长轨迹",
    journey_play: "播放 \u25b6",
    journey_pause: "暂停 \u2225",
    journey_reset: "重置 \u21ba",
    experience_preview_title: "经历",
    experience_page_title: "经历与教育",
    experience_page_intro: "工程研发经历与学术学位。",
    writing_preview_title: "写作与笔记",
    writing_page_title: "写作与笔记",
    writing_page_intro: "个人笔记、思考与技术论文。",
    demo_notice: "<strong>演示占位：</strong>以下笔记是关于 agents、workflows 和 world models 的初始草稿。你可以随时在 <code>posts/</code> 目录下添加新的博文。",
    misc_preview_title: "随笔与生活",
    misc_page_title: "随笔",
    misc_page_intro: "随笔琐记、美食、旅行、签证记录以及与猫的生活。",
    tag_all: "全部",
    tag_cat: "猫咪",
    tag_food: "美食",
    tag_travel: "旅行",
    tag_visa: "签证",
    view_all: "查看全部 \u2192",
    read_suffix: "阅读",
    back_to_writing: "\u2190 返回写作",
    back_to_about: "\u2190 返回关于",
    back_to_misc: "\u2190 返回随笔",
    summary_heading: "内容总结",
    tag_agents: "智能体",
    tag_workflows: "工作流",
    tag_coding: "代码",
    tag_world_models: "世界模型",
    tag_simulation: "仿真"
  }
};

if (typeof window !== 'undefined') {
  window.I18N = I18N;
}

function t(key) {
  const lang = getLang();
  return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
}
