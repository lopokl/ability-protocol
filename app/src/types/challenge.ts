export type Language = "en" | "ua";

export interface Challenge {
  id: string;
  category: { en: string; ua: string };
  difficulty: { en: string; ua: string };
  bounty: string;
  token: string;
  title: { en: string; ua: string };
  description: { en: string; ua: string };
  labReward: { en: string; ua: string };
  starterCode: { en: string; ua: string };
}
