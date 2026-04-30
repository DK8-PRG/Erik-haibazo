const cs = {
  nav: {
    home: "DOMŮ",
    recipes: "VIDEA",
    magazine: "KUCHAŘKA",
    about: "O MNĚ",
    contact: "KONTAKT",
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
  intro: {
    kicker: "Erik Haibazo · Food creator",
    name: "Erik Haibazo",
    lead: "Naučím tě vařit vietnamské jídlo, které chutná líp než v restauraci.",
    collabLabel: "SPOLUPRÁCE",
    email: "erik.haibazo@gmail.com",
    scrollHint: "Posuň níž",
    socialsLabel: "Sleduj mě",
  },
  videosSection: {
    heading: "NEJNOVĚJŠÍ VIDEO",
    empty: "Vídea brzy přidám — sleduj mě na sociálních sítích.",
  },
  cookbookSection: {
    heading: "MOJE KUCHAŘKA (JIŽ BRZY VENKU)",
    subheading:
      "Nech štáb vietnamských chutí proměnit tvoji kuchyni. Přihlaš se a budu ti psát, jakmile bude kuchařka venku.",
    ctaLabel: "CHCI KUCHAŘKU",
    placeholder: "Tvůj e-mail",
    privacy:
      "Ode sláním souhlasíš s odběrem novinek. Odhlásit se můžeš kdykoliv.",
    success: "Děkuju! Máš to v seznamu.",
    already: "Tenhle e-mail už v seznamu mám.",
    invalid: "Nezdá se mi to jako platný e-mail.",
    error: "Něco se zvrtlo, zkus to prosím znovu.",
  },
  aboutLongSection: {
    heading: "KDO JSEM?",
    contactLabel: "Kontakt",
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
    heading: "ZŮSTAŇME V KONTAKTU",
    collabNote: "Spolupráce, natáčení, partnerství a ochutnávky.",
    webCreditLabel: "Web vytvořil Kim Hoang Duong",
    webCreditCta: "Chcete podobný web? Napište mi na",
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
    collabNote:
      "Produktové spolupráce, recenze, brand deals nebo natáčení — napiš mi na email výše a domluvíme se.",
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
    label: "Jazyk",
    cs: "Čeština",
    en: "Angličtina",
    csShort: "CZ",
    enShort: "EN",
  },
};

export type Dictionary = {
  [K in keyof typeof cs]: {
    [P in keyof (typeof cs)[K]]: string;
  };
};

export default cs as Dictionary;
