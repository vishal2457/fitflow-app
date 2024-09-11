import { TMember } from "mx-schema";

export type User = TMember & {
  trainer: { name: string; id: number };
  enableAI: boolean;
};
