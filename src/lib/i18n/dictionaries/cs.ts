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
      "Právník, foodie a člověk mezi dvěma světy – Vietnamem a Českem.",
    paragraph1:
      "Xin chào, jsem Erik – právník, který miluje vaření. Narodil jsem se ve Vietnamu, ale většinu života žiju v Česku. Jídlo mě provází od dětství a naučilo mě, že vaření je víc než jen o chuti.",
    paragraph2:
      "Vaření mě učí trpělivosti, pokoře i radosti z maličkostí. Je to hra i meditace, dětská radost i dospělá láska. Hledám v něm rovnováhu – mezi Asií a Evropou, tradicí a novotou, mezi sladkým a slaným.",
    paragraph3:
      "Nejvíc mě naplňuje, když můžu jídlo sdílet s ostatními, protože právě tehdy má život chuť. Vaření je pro mě víc než recept – je to způsob, jak dát kousek sebe druhým.",
    contactLabel: "Kontakt",
    email: "Erik.haibazo@gmail.com",
  },
  contactPage: {
    title: "Kontakt",
    description: "Spolupráce, dotazy a media requesty — vždy odpovídám.",
    writeMe: "Napiš mi přímo",
    writeMeNote: "Odpovídám zpravidla do 24 hodin.",
    followTitle: "Sleduj mě na sociálních sítích",
    followNote: "Nové recepty, zákulisí tvorby a kratší tipy každý týden.",
    collab: "Spolupráce & PR",
    collabNote: "Produktové spolupráce, recenze, brand deals nebo natáčení — napiš mi na email výše a domluvíme se.",
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
