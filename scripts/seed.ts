/**
 * Seed skript — nahraje mock data do Sanity
 *
 * Použití:
 *   1. Přidej do .env.local: SANITY_API_WRITE_TOKEN=skXXXX...
 *      (Získáš na: https://sanity.io/manage → projekt → API → Tokens → Add API token → Editor)
 *   2. npx tsx scripts/seed.ts
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";

// ─── Načtení .env.local ──────────────────────────────────────────────────────
function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  try {
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    console.error("❌ Nepodařilo se načíst .env.local");
    process.exit(1);
  }
}

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error(
    "❌ Chybí NEXT_PUBLIC_SANITY_PROJECT_ID nebo NEXT_PUBLIC_SANITY_DATASET v .env.local",
  );
  process.exit(1);
}

if (!token) {
  console.error(
    "❌ Chybí SANITY_API_WRITE_TOKEN v .env.local\n" +
      "   Získáš ho na: https://sanity.io/manage → projekt → API → Tokens → Add API token (Editor)",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

// ─── Typy ────────────────────────────────────────────────────────────────────
type SanityRef = { _type: "reference"; _ref: string };
type PortableTextBlock = {
  _type: "block";
  _key: string;
  style: string;
  children: { _type: "span"; _key: string; text: string; marks: string[] }[];
  markDefs: unknown[];
};

function ref(id: string): SanityRef {
  return { _type: "reference", _ref: id };
}

function textBlock(text: string, key: string): PortableTextBlock {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    children: [{ _type: "span", _key: key + "s", text, marks: [] }],
    markDefs: [],
  };
}

// ─── Kategorie ───────────────────────────────────────────────────────────────
const categories = [
  {
    _id: "cat-pho",
    _type: "category",
    name: "Pho",
    slug: { _type: "slug", current: "pho" },
  },
  {
    _id: "cat-street-food",
    _type: "category",
    name: "Street food",
    slug: { _type: "slug", current: "street-food" },
  },
  {
    _id: "cat-vegan",
    _type: "category",
    name: "Vegan",
    slug: { _type: "slug", current: "vegan" },
  },
  {
    _id: "cat-quick",
    _type: "category",
    name: "Quick",
    slug: { _type: "slug", current: "quick" },
  },
  {
    _id: "cat-ramen",
    _type: "category",
    name: "Ramen",
    slug: { _type: "slug", current: "ramen" },
  },
];

// ─── Recepty ─────────────────────────────────────────────────────────────────
const recipes = [
  {
    _id: "recipe-pho-bo",
    _type: "recipe",
    title: "Rychlý Pho Bo za 35 minut",
    slug: { _type: "slug", current: "rychly-pho-bo" },
    coverImage: {
      _type: "imageWithAlt",
      alt: "Pho Bo — vietnamská nudlová polévka s hovězím",
      asset: { _type: "reference", _ref: "image-unsplash-pho" },
    },
    category: ref("cat-pho"),
    timeMinutes: 35,
    difficulty: "medium",
    excerpt: "Vývar s jasnou chutí, tenké plátky hovězího a bylinky na závěr.",
    intro:
      "Pho Bo je klasická vietnamská léčivá polévka. Tento rychlý recept zvládneš i v týdnu — bez osmihodinového vývaru, ale s plnou chutí.",
    ingredients: [
      "1 l hovězího vývaru",
      "200 g tenkých plátků hovězí svíčkové",
      "150 g rýžových nudlí pho",
      "2 hvězdičky badyánu",
      "1 skořicová tyčinka",
      "2 lžíce rybí omáčky",
      "Čerstvé bylinky: bazalka, koriandr, máta",
      "Limetka, chilli, klíčky sóji na podávání",
    ],
    instructions: [
      "Vývar přiveď k varu, přidej badyán a skořici. Nech 20 minut probublávat.",
      "Rýžové nudle uvař dle návodu na obalu, sceď a rozděl do misek.",
      "Vývar přeceď, dochuť rybí omáčkou a solí.",
      "Do každé misky vlož syrové plátky masa a ihned přelij horkým vývarem — maso se dovaří samo.",
      "Podávej s limetkou, chilli, klíčky sóji a čerstvými bylinkami.",
    ],
    videoUrl: "https://www.youtube.com/watch?v=example-pho",
    seo: {
      _type: "seo",
      title: "Rychlý Pho Bo za 35 minut | Haibazo",
      description:
        "Vývar s jasnou chutí, tenké plátky hovězího a bylinky na závěr. Recept na Pho Bo za 35 minut.",
    },
  },
  {
    _id: "recipe-banh-mi",
    _type: "recipe",
    title: "Bánh Mì s křupavým tofu",
    slug: { _type: "slug", current: "banh-mi-tofu" },
    coverImage: {
      _type: "imageWithAlt",
      alt: "Bánh Mì sendvič s tofu a pikledovanou zeleninou",
      asset: { _type: "reference", _ref: "image-unsplash-banh-mi" },
    },
    category: ref("cat-street-food"),
    timeMinutes: 25,
    difficulty: "easy",
    excerpt: "Lehký sendvič s pikledovanou zeleninou a pikantní majonézou.",
    intro:
      "Bánh Mì je dokonalý příklad vietnamské street food kultury. Křupavá bageta, smažené tofu, pikle a sriracha mayo — kombinace, která funguje pokaždé.",
    ingredients: [
      "1 bageta (nebo 2 menší vietnamské housky)",
      "200 g pevného tofu",
      "1 mrkev + 1 ředkev — julienne",
      "3 lžíce rýžového octa + 1 lžička cukru + špetka soli (na pikle)",
      "3 lžíce majonézy + 1 lžička sriracha",
      "Čerstvý koriandr, plátky chilli",
      "Olej na smažení",
    ],
    instructions: [
      "Mrkev a ředkev nakrájej na julienne, zalijj směsí octa, cukru a soli. Nech 15 minut pikledovat.",
      "Tofu nakrájej na plátky, osuš a na oleji opečj dozlatova z obou stran.",
      "Sriracha majonézu smíchej a natři na vnitřek bagety.",
      "Sestav sendvič: majonéza, tofu, pike, koriandr, chilli.",
    ],
    seo: {
      _type: "seo",
      title: "Bánh Mì s křupavým tofu | Haibazo",
      description:
        "Lehký vietnamský sendvič s pikledovanou zeleninou a pikantní majonézou. Hotový za 25 minut.",
    },
  },
  {
    _id: "recipe-curry-lilek",
    _type: "recipe",
    title: "Kokosové curry s lilkem",
    slug: { _type: "slug", current: "kokosove-curry-lilek" },
    coverImage: {
      _type: "imageWithAlt",
      alt: "Kokosové curry s lilkem v misce podávané s rýží",
      asset: { _type: "reference", _ref: "image-unsplash-curry" },
    },
    category: ref("cat-vegan"),
    timeMinutes: 30,
    difficulty: "easy",
    excerpt: "Krémové curry, které zvládneš během jednoho večera po práci.",
    intro:
      "Tohle curry je moje go-to jídlo na unaveného pondělí. Kokosové mléko, červená curry pasta a lilek — tři ingredience, které splňují vše.",
    ingredients: [
      "1 velký lilek — kostičky 2 cm",
      "400 ml kokosového mléka",
      "2 lžíce červené curry pasty",
      "1 cibule, 3 stroužky česneku",
      "1 lžíce rybí omáčky (nebo sojové pro vegan)",
      "Šťáva z 1/2 limetky",
      "Čerstvá bazalka nebo koriandr",
      "Vařená rýže na podávání",
    ],
    instructions: [
      "Cibuli a česnek zpěň na oleji do měkka (asi 3 minuty).",
      "Přidej curry pastu a míchej 1 minutu, dokud nevzní aromaticky.",
      "Přidej lilek, promíchej a opeč 2 minuty.",
      "Vlij kokosové mléko, přiveď k varu a vař 15 minut na středním ohni.",
      "Dochut rybí omáčkou a limetkou. Podávej s rýží a bylinkami.",
    ],
    seo: {
      _type: "seo",
      title: "Kokosové curry s lilkem | Haibazo",
      description:
        "Krémové veganské curry za 30 minut. Kokosové mléko, červená curry pasta a lilek.",
    },
  },
  {
    _id: "recipe-nudle-krevety",
    _type: "recipe",
    title: "Rýžové nudle s krevetami",
    slug: { _type: "slug", current: "ryzove-nudle-krevety" },
    coverImage: {
      _type: "imageWithAlt",
      alt: "Rýžové nudle s krevetami ve woku se zeleninou",
      asset: { _type: "reference", _ref: "image-unsplash-noodles" },
    },
    category: ref("cat-quick"),
    timeMinutes: 20,
    difficulty: "easy",
    excerpt: "Svěží wok styl s limetou, chilli a koriandrem.",
    intro:
      "Dvacet minut od ledničky na stůl. Krevety, nudle a zelenina ve woku — jednoduchý recept, který chutná jako z restaurace.",
    ingredients: [
      "200 g rýžových nudlí",
      "300 g oloupanných krevet",
      "2 lžíce sójové omáčky",
      "1 lžíce oyster sauce",
      "1 lžička sezamového oleje",
      "2 stroužky česneku, 1 chilli",
      "Šťáva z 1 limetky",
      "Čerstvý koriandr",
    ],
    instructions: [
      "Nudle zalijj vařící vodou, nech 5 minut odležet, sceď.",
      "Wok rozehřej na vysokou teplotu, přidej olej a opečj česnek s chilli 30 sekund.",
      "Přidej krevety a opékej 2 minuty z každé strany.",
      "Přidej nudle, sójovou omáčku a oyster sauce. Wokuj 2 minuty.",
      "Stáhni z ohně, přidej sezamový olej, limetku a koriandr.",
    ],
    seo: {
      _type: "seo",
      title: "Rýžové nudle s krevetami | Haibazo",
    },
  },
  {
    _id: "recipe-jarni-zavitky",
    _type: "recipe",
    title: "Křupavé jarní závitky",
    slug: { _type: "slug", current: "jarni-zavitky" },
    coverImage: {
      _type: "imageWithAlt",
      alt: "Smažené jarní závitky na talíři se sweet chilli dipem",
      asset: { _type: "reference", _ref: "image-unsplash-spring-rolls" },
    },
    category: ref("cat-street-food"),
    timeMinutes: 40,
    difficulty: "medium",
    excerpt: "Domácí závitky se sladko-kyselým dipem a čerstvými bylinkami.",
    intro:
      "Jarní závitky jsou ideální na víkendový projekt. Křupavé těsto, voňavá náplň a domácí dip — stojí za každou minutu přípravy.",
    ingredients: [
      "12 listů spring roll pastry (nebo rýžového papíru)",
      "200 g vepřového mletého masa nebo tofu",
      "100 g skleněných nudlí",
      "1 mrkev — strouhané",
      "100 g zelí — nakrájené",
      "2 lžíce sójové omáčky, 1 lžíce hoisin omáčky",
      "Olej na smažení",
    ],
    instructions: [
      "Skleněné nudle zalijj vařící vodou na 5 minut, sceď a nakrájej.",
      "Maso nebo tofu opečj na oleji, přidej zeleninu a nudle. Dochuť sójovou a hoisin omáčkou.",
      "Náplň nech vychladnout. Pak zabal do listů těsta.",
      "Smažj ve vrstvě oleje na 180 °C dozlatova (asi 3–4 minuty).",
      "Podávej okamžitě se sweet chilli dipem.",
    ],
    seo: {
      _type: "seo",
      title: "Křupavé jarní závitky | Haibazo",
    },
  },
  {
    _id: "recipe-salat-papaja",
    _type: "recipe",
    title: "Salát z papáje se sezamem",
    slug: { _type: "slug", current: "salat-z-papaji" },
    coverImage: {
      _type: "imageWithAlt",
      alt: "Čerstvý salát z nezralé papáje se sezamem a limetkou",
      asset: { _type: "reference", _ref: "image-unsplash-salad" },
    },
    category: ref("cat-quick"),
    timeMinutes: 15,
    difficulty: "easy",
    excerpt: "Křupavý, svěží a lehce pálivý salát pro horké dny.",
    intro:
      "Thai papaya salad — Šom Tum — v domácí verzi. Stačí struhadlo, třecí miska a 15 minut. Výsledek osvěží i v největší letní vedro.",
    ingredients: [
      "1 nezralá papája (nebo alternativně cuketa) — strouhané",
      "1 mrkev — strouhané",
      "2 lžíce limetkové šťávy",
      "1 lžíce rybí omáčky",
      "1 lžička cukru",
      "1 chilli — nakrájené",
      "2 lžíce pražených arašídů nebo sezamu",
      "Čerstvá máta nebo koriandr",
    ],
    instructions: [
      "Papáju a mrkev nastrouhej na hrubém struhadle.",
      "V misce smíchej limetkovou šťávu, rybí omáčku, cukr a chilli.",
      "Zeleninu přidej k zálivce a promíchej. Nech 5 minut odleže.",
      "Podávej posypané pražengými arašídy nebo sezamem a čerstvými bylinkami.",
    ],
    seo: {
      _type: "seo",
      title: "Salát z papáje se sezamem | Haibazo",
    },
  },
];

// ─── Články ──────────────────────────────────────────────────────────────────
const articles = [
  {
    _id: "article-vejce",
    _type: "article",
    title:
      "Tajemství kódu na vejcích: jediné číslo, které ti řekne všechno o tom, co jíš",
    slug: { _type: "slug", current: "tajemstvi-kodu-na-vejcich" },
    coverImage: {
      _type: "imageWithAlt",
      alt: "Vejce s vyraženým kódem na skořápce",
      asset: { _type: "reference", _ref: "image-placeholder-vejce" },
    },
    publishedAt: "2026-02-10T10:00:00Z",
    excerpt:
      "Stojíš před regálem plným vajec — od klece po bio. Naučíme tě rozluštit kód na skořápce, abys věděl*a přesně co kupuješ.",
    body: [
      textBlock(
        'Stojíš před regálem plným vajec. Jedny \u201ez podestýlky", druhý \u201ečerstvé z farmy", třetí \u201eod šťastných slepic". Jak se v tom vyznat? Všechno, co potřebuješ vědět, je vyražené přímo na skořápce.',
        "v0",
      ),
      {
        _type: "block",
        _key: "v1",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "v1s",
            text: "Ignoruj krabici, čti skořápku: tvůj průvodce kódem",
            marks: [],
          },
        ],
        markDefs: [],
      },
      textBlock(
        "Kód na vajíčku vypadá třeba takhle: 1-CZ-1234. Pro tebe je nejdůležitější první číslice. Ta odhaluje, jaký život slepice žila.",
        "v2",
      ),
      textBlock(
        "3 = KLEC: Život na prostoru o velikosti papíru A4. Slepice se nemůže proběhnout ani si pořádně protáhnout křídla. Dobrá zpráva: V Česku budou od roku 2027 zakázány.",
        "v3",
      ),
      textBlock(
        "2 = HALA (CHOV NA PODESTÝLCE): Žádné klece, ale slepice se mohou volně pohybovat po hale, hrabat v podestýlce a hřadovat.",
        "v4",
      ),
      textBlock(
        "1 = VOLNÝ VÝBĚH: Hala s přístupem na zahradu. Přes den můžou slepice ven na trávu a na sluníčko.",
        "v5",
      ),
      textBlock(
        "0 = BIO: VIP verze volného výběhu. Ještě víc místa, povinný výběh a certifikované bio krmivo bez GMO.",
        "v6",
      ),
      {
        _type: "block",
        _key: "v7",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "v7s",
            text: '\u201eČeské vejce" v polském kabátu?',
            marks: [],
          },
        ],
        markDefs: [],
      },
      textBlock(
        'Velký pozor! Kód na krabici ti říká jen to, kde vejce zabalili, ne odkud jsou. Česká balírna může legálně balit vejce z Polska. Pokud chceš fakt české, musíš hledat \u201eCZ" přímo na skořápce.',
        "v8",
      ),
      {
        _type: "block",
        _key: "v9",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "v9s",
            text: "Jsou vejce od šťastnějších slepic zdravější?",
            marks: [],
          },
        ],
        markDefs: [],
      },
      textBlock(
        "Rozdíly v nutriční hodnotě jsou primárně důsledkem krmiva, ne samotného systému chovu. Slepice, co chodí ven (kód 1 a 0), mají ve vejcích prokazatelně více vitamínu D a B9.",
        "v10",
      ),
      textBlock(
        "Barva žloutku není spolehlivý ukazatel kvality — v komerčních chovech se sytá oranžová dosahuje přidáním pigmentů do krmiva. Barva skořápky (bílá/hnědá) nemá vliv na chuť ani výživu.",
        "v11",
      ),
      {
        _type: "block",
        _key: "v12",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "v12s",
            text: "Kolik stojí štěstí slepice?",
            marks: [],
          },
        ],
        markDefs: [],
      },
      textBlock(
        "Čím lepší život pro slepici, tím vyšší cena. Po zákazu klecových chovů v roce 2027 nejlevnější vejce z trhu zmizí. Volba je na tobě — teď už víš, co to první číslo znamená.",
        "v13",
      ),
    ],
    seo: {
      _type: "seo",
      title: "Tajemství kódu na vejcích | Haibazo",
      description:
        "Naučíme tě rozluštit kód na skořápce vejce — a zjistit, jaký život vedla slepice, než ses rozhodl*a co koupit.",
    },
  },
  {
    _id: "article-steak",
    _type: "article",
    title:
      "Rare vs. Well-Done: věčná válka o steak. Věda říká, že možná všechno děláš špatně.",
    slug: { _type: "slug", current: "rare-vs-well-done-steak" },
    coverImage: {
      _type: "imageWithAlt",
      alt: "Steak nakrájený na prkénku s různými stupni propečení",
      asset: { _type: "reference", _ref: "image-placeholder-steak" },
    },
    publishedAt: "2026-01-28T10:00:00Z",
    excerpt:
      "Věčná debata, která dokáže rozdělit rodiny. Kde je pravda? Zapomeň na dohady — přináším vědecky podložený manuál.",
    body: [
      textBlock(
        "Věčná debata, která dokáže rozdělit rodiny u nedělního oběda: jak má být propečený steak? Zapomeň na dohady a pocity. Přináším ti definitivní, vědecky podložený manuál.",
        "s0",
      ),
      {
        _type: "block",
        _key: "s1",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "s1s",
            text: "Základní pravidlo: zapomeň na mačkání palce, pořiď si teploměr",
            marks: [],
          },
        ],
        markDefs: [],
      },
      textBlock(
        "Test dlaně je asi tak přesný jako horoskop z Bravíčka. Pokud chceš konzistentní výsledky, tvůj jediný true friend je digitální vpichový teploměr.",
        "s2",
      ),
      textBlock(
        "Rare: 49–54 °C — střed jasně červený, výrazná chuť. Medium Rare: 54–57 °C — svatý grál šéfkuchařů, neuvěřitelně šťavnaté. Medium: 57–63 °C — růžový střed, pevnější. Well Done: 70 °C+ — hnědošedé, pevné.",
        "s3",
      ),
      {
        _type: "block",
        _key: "s4",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "s4s",
            text: "Wagyu paradox: proč u nejlepšího masa platí opačná pravidla",
            marks: [],
          },
        ],
        markDefs: [],
      },
      textBlock(
        "Wagyu má extrémní mramorování — intramuskulární tuk, který se rozpouští při 54–60 °C. Pokud dáš wagyu rare (pod 54 °C), tuk se nestihne rozpustit a steak bude voskový.",
        "s5",
      ),
      textBlock(
        "Max The Meat Guy otestoval wagyu na všechny způsoby — 4 z 5 lidí preferovalo well-done. Veškeré mramorování se kompletně rozpustilo a vytvořilo máslový, šťavnatý výsledek.",
        "s6",
      ),
      textBlock(
        "Pravidlo: čím víc mramorování, tím vyšší teplotu maso přímo vyžaduje.",
        "s7",
      ),
      {
        _type: "block",
        _key: "s8",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "s8s",
            text: "Proč steak není kuře (a krvavý burger je big no-no)",
            marks: [],
          },
        ],
        markDefs: [],
      },
      textBlock(
        "Hovězí: bakterie jsou na povrchu — opékáním ho sterilizuješ, vnitřek je bezpečný. U burgerů se bakterie promíchají do celého objemu: musí být plně propečený. Kuřecí a vepřové: vždy důkladně tepelně upravené.",
        "s9",
      ),
      {
        _type: "block",
        _key: "s10",
        style: "h2",
        children: [
          {
            _type: "span",
            _key: "s10s",
            text: "Finální life-hacky",
            marks: [],
          },
        ],
        markDefs: [],
      },
      textBlock(
        "Kup si teploměr. U libových řezů (svíčková) rare/medium-rare. U mramorovaných (roštěnec) medium-rare/medium. U wagyu well-done. A vždy nech steak 5–10 minut odpočinout — šťávy se rovnoměrně rozloží.",
        "s11",
      ),
    ],
    seo: {
      _type: "seo",
      title: "Rare vs. Well-Done: jak na dokonalý steak | Haibazo",
      description:
        "Vědecky podložený manuál pro dokonalý steak — od teploměru přes wagyu paradox až po bezpečnost jídla.",
    },
  },
  {
    _id: "article-pantry",
    _type: "article",
    title: "Jak postavit domácí pantry pro asijskou kuchyni",
    slug: { _type: "slug", current: "domaci-pantry" },
    coverImage: {
      _type: "imageWithAlt",
      alt: "Polička s asijskými omáčkami, pastami a kořením",
      asset: { _type: "reference", _ref: "image-placeholder-pantry" },
    },
    publishedAt: "2026-01-20T10:00:00Z",
    excerpt:
      "Základní omáčky, pasty a koření, které pokryjí 80 % mých receptů.",
    body: [
      textBlock(
        "Mít správně zásobenou spíž je základ každé dobré kuchyně. V asijské kuchyni to platí dvojnásob — bez sójové omáčky, rybí omáčky a curry pasty se zkrátka nevaří.",
        "p1",
      ),
      textBlock(
        "Začni třemi základy: sójová omáčka (tmavá i světlá), rybí omáčka a sezamový olej. Tyto tři ingredience tvoří umami základ pro 80 % mých receptů.",
        "p2",
      ),
      textBlock(
        "Postupně doplňuj: oyster sauce, hoisin omáčka, rýžový ocet, kokosové mléko a aspoň jedna curry pasta (doporučuji červenou). S tímto arsenálem zvládneš uvařit cokoli z tohoto webu.",
        "p3",
      ),
    ],
    seo: {
      _type: "seo",
      title: "Jak postavit domácí pantry pro asijskou kuchyni | Haibazo",
      description:
        "Základní omáčky, pasty a koření, které pokryjí 80 % receptů asijské kuchyně.",
    },
  },
  {
    _id: "article-street-food",
    _type: "article",
    title: "Street food trend report: co vařit doma",
    slug: { _type: "slug", current: "street-food-trendy" },
    coverImage: {
      _type: "imageWithAlt",
      alt: "Stánek se street food jídlem na asijském trhu",
      asset: { _type: "reference", _ref: "image-placeholder-street-food" },
    },
    publishedAt: "2026-01-09T10:00:00Z",
    excerpt:
      "Nejzajímavější chutě z trhů, které dávají smysl i v domácí kuchyni.",
    body: [
      textBlock(
        "Ulice Ho Či Minova Města, bangkokské noční trhy nebo tchajpejské noční markety — každé z těchto míst má jedno společné: jídlo, které je jednoduché, rychlé a neuvěřitelně chutné.",
        "sf1",
      ),
      textBlock(
        "Letos dominují Bánh Cuốn, Tteokbokki a Lokma. Všechny zvládneš doma s dostupnými ingrediencemi.",
        "sf2",
      ),
    ],
    seo: {
      _type: "seo",
      title: "Street food trend report | Haibazo",
      description:
        "Nejzajímavější chutě z trhů, které dávají smysl i v domácí kuchyni.",
    },
  },
  {
    _id: "article-meal-prep",
    _type: "article",
    title: "Meal prep: 5 obědů do krabičky za hodinu",
    slug: { _type: "slug", current: "meal-prep-krabicky" },
    coverImage: {
      _type: "imageWithAlt",
      alt: "Pět krabičkových obědů připravených na celý týden",
      asset: { _type: "reference", _ref: "image-placeholder-meal-prep" },
    },
    publishedAt: "2025-12-15T10:00:00Z",
    excerpt: "Praktický systém, jak vařit méně často a jíst lépe celý týden.",
    body: [
      textBlock(
        "Systém meal prep pro mě začal jako nutnost a stal se zvykem. Nedělní hodina v kuchyni = 5 chutných obědů bez každodenního stresu.",
        "mp1",
      ),
      textBlock(
        "Základ: vždy uvař velké množství rýže nebo nudlí, připrav 2 různé proteiny a aspoň 3 druhy zeleniny. Kombinuj různě každý den.",
        "mp2",
      ),
    ],
    seo: {
      _type: "seo",
      title: "Meal prep: 5 obědů za hodinu | Haibazo",
      description:
        "Praktický systém, jak vařit méně často a jíst lépe celý týden.",
    },
  },
  {
    _id: "article-ramen",
    _type: "article",
    title: "5 chyb, které ničí domácí ramen",
    slug: { _type: "slug", current: "chyby-domaci-ramen" },
    coverImage: {
      _type: "imageWithAlt",
      alt: "Miska domácího ramenu s vajíčkem a masem",
      asset: { _type: "reference", _ref: "image-placeholder-ramen" },
    },
    publishedAt: "2025-11-28T10:00:00Z",
    excerpt:
      "Od textury nudlí po vrstvení umami. Tohle jsou nejčastější přešlapy.",
    body: [
      textBlock(
        "Ramen je jídlo, které vypadá jednoduše, ale skrývá desítky proměnných. Po dvou letech domácích pokusů jsem sestavil seznam chyb, které jsem sám udělal.",
        "r1",
      ),
      textBlock(
        "Chyba č. 1: špatné nudle. Ramen nudle jsou alkalické — to jim dává žlutou barvu a pružnost. Nemůžeš je nahradit špagety.",
        "r2",
      ),
      textBlock(
        "Chyba č. 2: studená miska. Polévku dej do vychladlé misky a okamžitě klesne teplota. Misku vždy zahřej horkou vodou před servírováním.",
        "r3",
      ),
    ],
    seo: {
      _type: "seo",
      title: "5 chyb, které ničí domácí ramen | Haibazo",
      description:
        "Od textury nudlí po vrstvení umami — nejčastější přešlapy při domácím ramenu.",
    },
  },
];

// ─── Homepage singleton ──────────────────────────────────────────────────────
const homepageDoc = {
  _id: "homepage",
  _type: "homepage",
  heroTitle: "HAIBAZO: moderní recepty bez chaosu",
  heroSubtitle:
    "Jednoduché postupy, výrazné chutě a inspirace z asijského street foodu pro každý den.",
  heroCTALabel: "Prozkoumat recepty",
  heroCTAHref: "/recipes",
  featuredRecipes: [
    ref("recipe-pho-bo"),
    ref("recipe-banh-mi"),
    ref("recipe-curry-lilek"),
    ref("recipe-nudle-krevety"),
    ref("recipe-jarni-zavitky"),
    ref("recipe-salat-papaja"),
  ],
  featuredArticles: [
    ref("article-vejce"),
    ref("article-steak"),
    ref("article-pantry"),
    ref("article-street-food"),
  ],
  seo: {
    _type: "seo",
    title: "Haibazo — moderní asijské recepty",
    description:
      "Jednoduché asijské recepty, street food tipy a food magazín od Erika Haibazo.",
  },
};

// ─── About page singleton ─────────────────────────────────────────────────────
const aboutPageDoc = {
  _id: "aboutPage",
  _type: "aboutPage",
  title: "O Erikovi",
  bio: [
    textBlock(
      "Ahoj, jsem Erik. Vařím, fotím a sdílím recepty inspirované asijskou street food kulturou.",
      "ab1",
    ),
    textBlock(
      "Začalo to cestami po jihovýchodní Asii — thajskými nočními trhy, vietnamskými nudlovými barech a korejskými BBQ restauracemi. Přivezl jsem si domů obsesi s jednoduchostí a výraznými chutěmi.",
      "ab2",
    ),
    textBlock(
      "Haibazo je místo, kde sdílím to, co vařím pro sebe: recepty, které fungují v každodenní domácí kuchyni bez speciálního vybavení.",
      "ab3",
    ),
  ],
  seo: {
    _type: "seo",
    title: "O Erikovi | Haibazo",
    description:
      "Erik Haibazo — foodie, kuchař a tvůrce obsahu zaměřený na asijskou street food kulturu.",
  },
};

// ─── Seed runner ─────────────────────────────────────────────────────────────
async function seed() {
  console.log("🌱 Spouštím seed...\n");

  // Kategorie
  console.log("📁 Kategorie...");
  for (const doc of categories) {
    await client.createOrReplace(doc);
    console.log(`   ✅ ${doc.name}`);
  }

  // Recepty (obrázky jsou placeholder reference — přidej reálné fotky přes Studio)
  console.log("\n🍜 Recepty...");
  for (const doc of recipes) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { coverImage: _ci, ...docWithoutImage } = doc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await client.createOrReplace(docWithoutImage as any);
    console.log(`   ✅ ${doc.title}`);
  }

  // Články
  console.log("\n📰 Články...");
  for (const doc of articles) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { coverImage: _ci, ...docWithoutImage } = doc;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await client.createOrReplace(docWithoutImage as any);
    console.log(`   ✅ ${doc.title}`);
  }

  // Homepage singleton
  console.log("\n🏠 Homepage...");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await client.createOrReplace(homepageDoc as any);
  console.log("   ✅ Homepage");

  // About page singleton
  console.log("\n👤 About page...");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await client.createOrReplace(aboutPageDoc as any);
  console.log("   ✅ About page");

  console.log("\n✨ Seed dokončen!");
  console.log(
    "\n📸 Poznámka: Obrázky je potřeba nahrát ručně přes Sanity Studio.",
  );
  console.log(
    "   Jdi na /studio → Recepty/Články → vyber dokument → nahraj Cover image.",
  );
}

seed().catch((err) => {
  console.error("❌ Seed selhal:", err.message);
  process.exit(1);
});
