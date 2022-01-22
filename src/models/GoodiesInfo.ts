//Metadata for goodies
export interface GoodiesInfo {
  name?: string;
  description?: string;
  buyLimit?: number;
  price?: number;
  image?: string;
}

//Minimal format of goodies info
export interface GoodiesInfoMinimal {
  name: string;
  price: number;
  image: string;
}

//Schema used for requests
export const GoodiesSchema = {
  type: "object",
  description: "Goodies metadata",
  required: [],
  properties: {
    name: { type: "string" },
    description: { type: "string" },
    image: { type: "string" },
    price: { type: "number" },
    buyLimit: { type: "number" },
  },
  additionalProperties: false,
};
