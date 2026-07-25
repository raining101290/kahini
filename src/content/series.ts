export type Genre =
  | "Romance"
  | "Thriller"
  | "Family Drama"
  | "Revenge"
  | "Campus"
  | "Supernatural";

export type Series = {
  readonly slug: string;
  readonly title: string;
  readonly titleBn: string;
  readonly genre: Genre;
  readonly episodes: number;
  readonly synopsis: string;
  readonly poster: string;
};

export const series = [
  {
    slug: "monsoon-vows",
    title: "Monsoon Vows",
    titleBn: "বর্ষার প্রতিশ্রুতি",
    genre: "Romance",
    episodes: 12,
    synopsis:
      "A wedding photographer and a runaway bride keep meeting at the wrong weddings — until one turns out to be her own.",
    poster: "/posters/poster-1.jpg",
  },
  {
    slug: "second-chance-tea-stall",
    title: "Second Chance Tea Stall",
    titleBn: "দ্বিতীয় সুযোগের চা স্টল",
    genre: "Romance",
    episodes: 10,
    synopsis:
      "She inherits her ex's family tea stall. He shows up every morning at 7, pretending it's for the tea.",
    poster: "/posters/poster-2.jpg",
  },
  {
    slug: "the-last-rickshaw",
    title: "The Last Rickshaw",
    titleBn: "শেষ রিকশা",
    genre: "Thriller",
    episodes: 14,
    synopsis:
      "A rickshaw puller picks up the same passenger every night at midnight — and every night, a different person goes missing.",
    poster: "/posters/poster-3.jpg",
  },
  {
    slug: "blackout-in-old-dhaka",
    title: "Blackout in Old Dhaka",
    titleBn: "পুরান ঢাকায় ব্ল্যাকআউট",
    genre: "Thriller",
    episodes: 16,
    synopsis:
      "The power cuts out on the same street every night at 9pm — right before someone in the building dies.",
    poster: "/posters/poster-4.jpg",
  },
  {
    slug: "the-inheritance-house",
    title: "The Inheritance House",
    titleBn: "উত্তরাধিকারের বাড়ি",
    genre: "Family Drama",
    episodes: 9,
    synopsis:
      "Three siblings return to their childhood home to sell it, and find their late father left them a condition none of them expected.",
    poster: "/posters/poster-5.jpg",
  },
  {
    slug: "eldest-daughter",
    title: "Eldest Daughter",
    titleBn: "বড় মেয়ে",
    genre: "Family Drama",
    episodes: 11,
    synopsis:
      "She raised her siblings after her mother left. Now her mother is back, and wants to be a parent again.",
    poster: "/posters/poster-6.jpg",
  },
  {
    slug: "office-408",
    title: "Office 408",
    titleBn: "অফিস ৪০৮",
    genre: "Revenge",
    episodes: 18,
    synopsis:
      "Fired and blacklisted by a rival firm, she comes back under a new name — in the corner office two floors above theirs.",
    poster: "/posters/poster-7.jpg",
  },
  {
    slug: "burn-the-contract",
    title: "Burn the Contract",
    titleBn: "চুক্তি পোড়াও",
    genre: "Revenge",
    episodes: 13,
    synopsis:
      "A business deal cost him his father's company. Ten years later, he's the one holding the contract that can end theirs.",
    poster: "/posters/poster-8.jpg",
  },
  {
    slug: "notebook-of-secrets",
    title: "Notebook of Secrets",
    titleBn: "গোপন নোটবুক",
    genre: "Campus",
    episodes: 10,
    synopsis:
      "A found notebook full of anonymous confessions turns a quiet campus upside down, one page at a time.",
    poster: "/posters/poster-9.jpg",
  },
  {
    slug: "hostel-403",
    title: "Hostel 403",
    titleBn: "হোস্টেল ৪০৩",
    genre: "Campus",
    episodes: 12,
    synopsis:
      "Four roommates, one hostel room, and a pact to fix each other's love lives before final exams.",
    poster: "/posters/poster-10.jpg",
  },
  {
    slug: "the-ferry-that-returns",
    title: "The Ferry That Returns",
    titleBn: "ফিরে আসা খেয়া",
    genre: "Supernatural",
    episodes: 8,
    synopsis:
      "Every full moon, a ferry crosses the river with the same passengers it lost twenty years ago.",
    poster: "/posters/poster-11.jpg",
  },
  {
    slug: "the-grandmothers-lamp",
    title: "The Grandmother's Lamp",
    titleBn: "ঠাকুরমার প্রদীপ",
    genre: "Supernatural",
    episodes: 15,
    synopsis:
      "An old oil lamp passed down through the family shows the next person to hold it one memory that isn't their own.",
    poster: "/posters/poster-12.jpg",
  },
] as const satisfies readonly Series[];
