export type ShopItem = {
  id: string;
  name: string;
  description: string;
  amount: number;
  effect: () => void;
  price: number;
  base: number;
  priceGrowth: number;
  priceCoeffecient: number;
};
