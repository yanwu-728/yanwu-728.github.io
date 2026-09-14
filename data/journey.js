/**
 * Interactive Journey Map Data (Bilingual)
 * Preserves New Jersey, MIT, Zoom, and coordinates.
 */

registerJourney({
  cities: {
    jiamusi: { x: 232.9, y: 78.1, en: "Jiamusi", zh: "佳木斯" },
    tianjin: { x: 205.2, y: 99.3, en: "Tianjin", zh: "天津" },
    sparta: { x: 560.2, y: 94.1, en: "New Jersey", zh: "新泽西" },
    boston: { x: 567.8, y: 90.4, en: "Boston", zh: "波士顿" },
    southbay: { x: 460.3, y: 104.3, en: "South Bay", zh: "南湾" }
  },
  steps: [
    {
      id: 0,
      cityKey: "jiamusi",
      year: "2001",
      arc: null,
      en: {
        tag: "Birthplace",
        title: "Born in Jiamusi, Heilongjiang",
        desc: "Born in Jiamusi, Heilongjiang province in northeastern China.",
        routeLabel: "Birthplace",
        crumb: "Jiamusi (2001)"
      },
      zh: {
        tag: "出生地",
        title: "出生于黑龙江佳木斯",
        desc: "出生于中国东北黑龙江省佳木斯市。",
        routeLabel: "出生地",
        crumb: "佳木斯 (2001)"
      }
    },
    {
      id: 1,
      cityKey: "tianjin",
      year: "2004",
      arc: "M 232.9,78.1 Q 215,74 205.2,99.3",
      en: {
        tag: "Growing Up",
        title: "Moved to Tianjin",
        desc: "Moved to Tianjin in 2004 and grew up along the Haihe river.",
        routeLabel: "Jiamusi → Tianjin (~1,100 km)",
        crumb: "Tianjin (2004)"
      },
      zh: {
        tag: "成长岁月",
        title: "迁居天津",
        desc: "2004年搬到天津，在海河畔长大。",
        routeLabel: "佳木斯 → 天津（约 1,100 公里）",
        crumb: "天津 (2004)"
      }
    },
    {
      id: 2,
      cityKey: "sparta",
      year: "2016",
      arc: "M 205.2,99.3 Q 382.7,10 560.2,94.1",
      en: {
        tag: "High School",
        title: "Moved to New Jersey",
        desc: "Crossed the Pacific to attend high school in New Jersey in 2016.",
        routeLabel: "Tianjin → New Jersey (~11,000 km)",
        crumb: "New Jersey (2016)"
      },
      zh: {
        tag: "高中求学",
        title: "前往新泽西",
        desc: "2016年跨越太平洋前往新泽西就读高中。",
        routeLabel: "天津 → 新泽西（约 11,000 公里）",
        crumb: "新泽西 (2016)"
      }
    },
    {
      id: 3,
      cityKey: "tianjin",
      year: "2020",
      arc: "M 560.2,94.1 Q 382.7,24 205.2,99.3",
      en: {
        tag: "Pandemic Return",
        title: "Returned to Tianjin",
        desc: "Moved back home to Tianjin in 2020 due to the pandemic. Spent the entire first year of college on Zoom.",
        routeLabel: "New Jersey → Tianjin (~11,000 km)",
        crumb: "Tianjin (2020)"
      },
      zh: {
        tag: "疫情返津",
        title: "返回天津",
        desc: "2020年因疫情搬回天津老家，在 Zoom 上度过了大学第一年。",
        routeLabel: "新泽西 → 天津（约 11,000 公里）",
        crumb: "天津 (2020)"
      }
    },
    {
      id: 4,
      cityKey: "boston",
      year: "2021",
      arc: "M 205.2,99.3 Q 386.5,6 567.8,90.4",
      en: {
        tag: "MIT (B.S. & M.Eng)",
        title: "Moved to Boston for MIT",
        desc: "Moved to Boston in 2021 for college.",
        routeLabel: "Tianjin → Boston, MA (~11,100 km)",
        crumb: "Boston (2021)"
      },
      zh: {
        tag: "MIT 求学",
        title: "前往波士顿就读 MIT",
        desc: "2021年前往波士顿就读大学。",
        routeLabel: "天津 → 波士顿（约 11,100 公里）",
        crumb: "波士顿 (2021)"
      }
    },
    {
      id: 5,
      cityKey: "southbay",
      year: "2025",
      arc: "M 567.8,90.4 Q 514.0,62 460.3,104.3",
      en: {
        tag: "Present",
        title: "Moved to South Bay, California",
        desc: "Moved to the South Bay in 2025 after graduation.",
        routeLabel: "Boston → South Bay, CA (~4,300 km)",
        crumb: "South Bay (2025)"
      },
      zh: {
        tag: "当下",
        title: "定居加州南湾",
        desc: "2025年毕业后搬到南湾。",
        routeLabel: "波士顿 → 南湾（约 4,300 公里）",
        crumb: "南湾 (2025)"
      }
    }
  ]
});
