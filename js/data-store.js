/**
 * Global Data Store & i18n State
 * Aggregates modular data files and registers blog posts.
 */

var root = typeof window !== 'undefined' ? window : globalThis;
if (typeof window === 'undefined') {
  var window = root;
}

var CURRENT_LANG = (typeof localStorage !== 'undefined' && localStorage.getItem('site_lang')) || 'en';
window.CURRENT_LANG = CURRENT_LANG;

var SITE_DATA = {
  profile: {},
  journey: {
    cities: {},
    steps: []
  },
  experience: [],
  blogs: [],
  misc: []
};
window.SITE_DATA = SITE_DATA;

function getLang() {
  return window.CURRENT_LANG || 'en';
}

function registerProfile(profileData) {
  window.SITE_DATA.profile = profileData;
}

function registerJourney(journeyData) {
  window.SITE_DATA.journey = journeyData;
}

function registerExperience(experienceList) {
  window.SITE_DATA.experience = experienceList;
}

function registerMisc(miscList) {
  window.SITE_DATA.misc = miscList;
}

function registerBlogPost(post) {
  window.SITE_DATA.blogs.push(post);
}
