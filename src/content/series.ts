export type Genre =
  | "Drama"
  | "Romance"
  | "Thriller"
  | "Action"
  | "Crime"
  | "Comedy"
  | "Family"
  | "Emotional"
  | "Talk Show"
  | "Documentary"
  | "Podcast"
  | "Youth";

export type Series = {
  readonly slug: string;
  readonly title: string;
  readonly titleBn: string;
  // A series can now carry more than one genre tag (e.g. "Drama, Romance"),
  // so this is a list rather than a single value.
  readonly genre: readonly Genre[];
  readonly episodes: number;
  readonly synopsis: string;
  readonly poster: string;
};

export const series = [
  {
    slug: "ayesha-aditto",
    title: "Ayesha Aditto",
    titleBn: "আয়েশা আদিত্য",
    genre: ["Drama", "Romance"],
    episodes: 1,
    synopsis:
      "The story follows the emotional journey of Ayesha and Aditto as they navigate love, complex relationships, and the struggles of life together.",
    poster: "/posters/poster-1.jpg",
  },
  {
    slug: "chupi-chupi",
    title: "Chupi Chupi",
    titleBn: "চুপি চুপি",
    genre: ["Drama", "Romance"],
    episodes: 1,
    synopsis:
      "A story revolving around a complex love triangle, secrets, and subtle romantic emotions among three individuals.",
    poster: "/posters/poster-2.jpg",
  },
  {
    slug: "co-sarangkot",
    title: "C/O Sarangkot",
    titleBn: "কেয়ার অফ সারাংকোট",
    genre: ["Drama", "Romance"],
    episodes: 1,
    synopsis:
      "Set against scenic landscapes, the story revolves around unexpected encounters, emotional bonds, and a journey of love.",
    poster: "/posters/poster-3.jpg",
  },
  {
    slug: "dhoasha",
    title: "Dhoasha",
    titleBn: "ধোঁয়াশা",
    genre: ["Action", "Crime", "Thriller"],
    episodes: 1,
    synopsis:
      "A suspenseful tale filled with danger and secrets, as two individuals find themselves caught in a web of mystery and survival.",
    poster: "/posters/poster-4.jpg",
  },
  {
    slug: "fagun-evabeo-ase",
    title: "Fagun Evabeo Ase",
    titleBn: "ফাল্গুন এভাবেও আসে",
    genre: ["Romance", "Comedy", "Drama"],
    episodes: 1,
    synopsis:
      "A heartwarming tale of youth, friendship, and unexpected romance arriving like the vibrant colors of spring.",
    poster: "/posters/poster-5.jpg",
  },
  {
    slug: "jabon-manei-bangla-cinema",
    title: "Jabon Manei Bangla Cinema",
    titleBn: "জীবন মানেই বাংলা সিনেমা",
    genre: ["Comedy", "Drama", "Family"],
    episodes: 1,
    synopsis:
      "A dramatic and humorous reflection on daily struggles, family dynamics, and emotional twists, showing how real life often mirrors the drama of Bengali cinema.",
    poster: "/posters/poster-6.jpg",
  },
  {
    slug: "keno-ei-shongota",
    title: "Keno Ei Shongota",
    titleBn: "কেন এই সংগোপতা",
    genre: ["Drama", "Family", "Emotional"],
    episodes: 1,
    synopsis:
      "A deeply moving tale exploring intricate family ties, emotional distance, and unspoken bonds across different generations.",
    poster: "/posters/poster-7.jpg",
  },
  {
    slug: "legend-and-legacy",
    title: "Legend & Legacy",
    titleBn: "লেজেন্ড অ্যান্ড লেগ্যাসি",
    genre: ["Talk Show", "Documentary"],
    episodes: 13,
    synopsis:
      "Hosted by Rumana Malik Munmun, this talk show celebrates iconic Bangladeshi personalities and legends as they share their extraordinary life journeys, experiences, and cultural legacies.",
    poster: "/posters/poster-8.jpg",
  },
  {
    slug: "monty-bubly",
    title: "Monty Bubly",
    titleBn: "মন্টি বাবলি",
    genre: ["Comedy", "Romance", "Drama"],
    episodes: 1,
    synopsis:
      "A lighthearted romantic comedy depicting the humorous dynamics, money troubles, and quirky relationship between Monty and Bubly.",
    poster: "/posters/poster-9.jpg",
  },
  {
    slug: "plan-b",
    title: "Plan B",
    titleBn: "প্ল্যান বি",
    genre: ["Comedy", "Drama", "Youth"],
    episodes: 1,
    synopsis:
      "A fun-filled youth drama about a group of close friends who pull together an unexpected alternate strategy when their primary plans fall apart.",
    poster: "/posters/poster-10.jpg",
  },
  {
    slug: "she",
    title: "She: Real Talk, Real Change",
    titleBn: "শী: রিয়েল টক, রিয়েল চেঞ্জ",
    genre: ["Talk Show", "Podcast"],
    episodes: 10,
    synopsis:
      "An engaging podcast-style talk show highlighting candid conversations about women's empowerment, personal journeys, and real-life experiences.",
    poster: "/posters/poster-11.jpg",
  },
  {
    slug: "she-season-02",
    title: "She Season 02: Real Talk, Real Change",
    titleBn: "শী সিজন ০২: রিয়েল টক, রিয়েল চেঞ্জ",
    genre: ["Talk Show", "Podcast"],
    episodes: 12,
    synopsis:
      "Hosted by Sarah Alam, the second season of 'She' brings inspiring conversations with notable guests like Toma Mirza, Jessia Islam, and Ritu Porna Chakma, focusing on women's empowerment, unique choices, and driving real change.",
    poster: "/posters/poster-12.jpg",
  },
  {
    slug: "sondhi",
    title: "Sondhi",
    titleBn: "সন্ধি",
    genre: ["Drama", "Romance"],
    episodes: 1,
    synopsis:
      "A touching romantic story exploring love, understanding, and emotional reconciliation between two individuals starring Safa Kabir and Khairul Basar.",
    poster: "/posters/poster-13.jpg",
  },
  {
    slug: "shuvo-kaje-deri-korte-nei",
    title: "Shuvo Kaje Deri Korte Nei",
    titleBn: "শুভ কাজে দেরি করতে নেই",
    genre: ["Comedy", "Romance", "Drama"],
    episodes: 1,
    synopsis:
      "A lighthearted romantic drama surrounding marriage complications, humorous misunderstandings, and the rush to complete good deeds without delay.",
    poster: "/posters/poster-14.jpg",
  },
  {
    slug: "tobuo-eshechilo-prem",
    title: "Tobuo Eshechilo Prem",
    titleBn: "তবুও এসেছিল প্রেম",
    genre: ["Drama", "Romance"],
    episodes: 1,
    synopsis:
      "A heartfelt romantic drama about two people who unexpectedly find love amidst life's challenges, distance, and emotional hurdles.",
    poster: "/posters/poster-15.jpg",
  },
] as const satisfies readonly Series[];
