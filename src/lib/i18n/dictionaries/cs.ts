const cs = {
  nav: {
    home: "Home",
    recipes: "Recepty",
    magazine: "Magazín",
    about: "O mně",
    contact: "Kontakt",
    admin: "Admin",
    menu: "Menu",
    closeMenu: "Zavřít menu",
  },
  hero: {
    badge: "Food Magazine",
    title: "HAIBAZO: moderní recepty bez chaosu",
    description:
      "Jednoduché postupy, výrazné chutě a inspirace z asijského street foodu pro každý den.",
    cta: "Prozkoumat recepty",
  },
  magazineSection: {
    title: "HAIBAZO MAGAZÍN",
    description: "Nejnovější článek a trend reporty ze světa jídla.",
    featured: "Featured",
  },
  recipesSection: {
    title: "Recepty",
    description: "Rychlé, výrazné a snadno opakovatelné recepty.",
    showAll: "Zobrazit všechny recepty",
    minutes: "min",
  },
  aboutPreview: {
    greeting: "Ahoj, jsem Erik Haibazo",
    bio: "Tvořím recepty a články, které mají jasný postup, dostupné suroviny a chuť, ke které se chceš vracet.",
    cta: "Více o mně",
  },
  follow: {
    badge: "Follow",
    title: "Sleduj další inspiraci",
    description: "Krátká videa, nové recepty a zákulisí tvorby každý týden.",
  },
  aboutFollow: {
    badge: "Creator Brand",
    title: "Pojď vařit se mnou. První inspirace máš hned teď.",
    description:
      "Jmenuju se Erik Haibazo a tvořím jednoduché recepty s asijským twistem. Každý týden nové video, tipy do kuchyně a poctivé jídlo bez složitosti.",
    dmNote: "Spolupráce nebo dotaz? Napiš mi do DM.",
    cta: "Více o mně",
  },
  partners: {
    title: "As Featured In",
  },
  footer: {
    description: "Recepty, videa a inspirace z kuchyně každý týden.",
    contact: "Kontakt",
    copyright: "Všechna práva vyhrazena.",
  },
  aboutPage: {
    title: "O mně",
    description:
      "HAIBAZO je osobní food magazín s důrazem na jednoduchost a kvalitu.",
    paragraph1:
      "Sdílím recepty a články, které propojují street food inspiraci s realitou domácí kuchyně. Cílem je chuť, kterou zvládneš zopakovat i během pracovního týdne.",
    paragraph2:
      "Tenhle web je připravený komponentově, mobile-first a s mock daty tak, aby šel snadno napojit na CMS bez velkého refaktoru.",
  },
  contactPage: {
    title: "Kontakt",
    description: "Pro spolupráce, dotazy a media requesty.",
    writeMe: "Napiš mi na:",
    followNote: "Nebo sleduj HAIBAZO na Instagramu a YouTube.",
  },
  magazinePage: {
    title: "Magazín",
    description: "Články o technikách, trendech a kuchyňských workflow.",
  },
  articleDetail: {
    placeholder:
      "Detail článku je zatím statický. Struktura je připravena pro napojení na CMS obsah včetně rich textu, sekcí a doporučených odkazů.",
  },
  recipesPage: {
    title: "Recepty",
    description: "Kompletní katalog receptů HAIBAZO.",
  },
  recipeDetail: {
    minutes: "minut",
    placeholder:
      "Tohle je statický detail receptu připravený pro budoucí napojení na CMS. Struktura stránky už nyní počítá s obsahem typu ingredience, kroky a tipy.",
  },
  meta: {
    siteDescription: "Moderní food magazín s recepty a články.",
  },
  languageSwitcher: {
    cs: "CZ",
    en: "EN",
  },
};

export type Dictionary = {
  [K in keyof typeof cs]: {
    [P in keyof (typeof cs)[K]]: string;
  };
};

export default cs as Dictionary;
