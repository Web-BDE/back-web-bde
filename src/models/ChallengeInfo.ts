//Metadata for challenges
export interface ChallengeInfo {
  name?: string;
  description?: string;
  reward?: number;
  maxAtempts?: number;
  imageId?: string
}

//Minimal format of challenges info
export interface ChallengeInfoMinimal {
  name: string;
  reward: number;
  id: number;
}

//Schema used for requests
export const ChallengeSchema = {
  type: "object",
  description: "Challenge metadata",
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    reward: { type: "number" },
    maxAtempts: { type: "number" },
  },
  additionalProperties: false,
};
