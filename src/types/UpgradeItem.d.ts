export type UpgradeItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  bought: boolean;
  effect: () => void;
};
