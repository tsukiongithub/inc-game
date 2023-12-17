import { create } from "zustand";
import { ShopItem } from "~/types/ShopItem";
import { UpgradeItem } from "~/types/UpgradeItem";

type CountState = {
  count: number;
  clickerIncrementor: number;
  autoIncrementor: number;
};

type CountActions = {
  setCount: (count: CountState["count"]) => void;
  increment: () => void;
  autoIncrement: () => void;
};

const useCountStore = create<CountState & CountActions>((set) => ({
  count: 0,
  clickerIncrementor: 1,
  autoIncrementor: 0,
  setCount: (newCount) => set(() => ({ count: newCount })),
  increment: () =>
    set((state) => ({ count: state.count + state.clickerIncrementor })),
  autoIncrement: () =>
    set((state) => ({ count: state.count + state.autoIncrementor })),
}));

type ShopState = {
  items: ShopItem[];
};

type ShopActions = {
  buyItem: (item: ShopItem) => void;
};

const useShopStore = create<ShopState & ShopActions>((set, get) => ({
  items: [
    {
      id: "autoclicker",
      name: "Intern",
      description: `Hire an "unpaid" intern to click for you.`,
      amount: 0,
      effect: () => {
        useCountStore.setState((state) => ({
          autoIncrementor: state.autoIncrementor + 1,
        }));
      },
      base: 10,
      price: 10,
      priceGrowth: 1.2,
      priceCoeffecient: 0.5,
    },
    {
      id: "computer",
      name: "Computer",
      description: "More computers means more things to click on.",
      amount: 0,
      effect: () => {
        useCountStore.setState((state) => ({
          autoIncrementor: state.autoIncrementor + 5,
        }));
      },
      price: 50,
      base: 50,
      priceGrowth: 1.25,
      priceCoeffecient: 0.5,
    },
  ],
  buyItem: (item) => {
    if (useCountStore.getState().count >= item.price) {
      set((state) => {
        const newItems = state.items.map((_item) => {
          // exponential formula: n = c * n^p + b
          // cookie clicker formula: n = b * p^n <- currently using this
          const newAmount = item.amount + 1;
          const newPrice = Math.ceil(
            item.price * item.priceGrowth ** newAmount,
          );

          const newItem: ShopItem =
            item.id === _item.id
              ? {
                  ..._item,
                  amount: newAmount,
                  price: newPrice,
                }
              : _item;

          return newItem;
        });

        return { items: newItems };
      });

      item.effect();

      useCountStore.setState((state) => ({
        count: state.count - item.price,
      }));
    }
  },
}));

type UpgradeState = {
  upgrades: UpgradeItem[];
};

type UpgradeActions = {
  buyUpgrade: (upgrade: UpgradeItem) => void;
};

const useUpgradesStore = create<UpgradeState & UpgradeActions>((set) => ({
  upgrades: [
    {
      id: "trackball-mouse",
      name: "Trackball Mouse",
      description: "A rudementary trackball mouse. Uprades manual clicking.",
      price: 100,
      effect: () => {
        useCountStore.setState((state) => ({
          clickerIncrementor: state.clickerIncrementor + 1,
        }));
      },
      bought: false,
    },
    {
      id: "ergonomic-chair",
      name: "Ergonomic Chair",
      description:
        "Boost comfort with an ergonomic chair, allowing for longer and more productive clicking sessions.",
      price: 50,
      effect: () => {
        console.log("Ergonomic Chair effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "coffee-machine",
      name: "Coffee Machine",
      description:
        "Automate coffee breaks to temporarily increase your click rate.",
      price: 200,
      effect: () => {
        console.log("Coffee Machine effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "office-plants",
      name: "Office Plants",
      description:
        "Improve the office environment with plants, gradually enhancing your click efficiency.",
      price: 75,
      effect: () => {
        console.log("Office Plants effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "assistant-interns",
      name: "Assistant Interns",
      description:
        "Hire interns to help with clicking, providing a passive click rate.",
      price: 500,
      effect: () => {
        console.log("Assistant Interns effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "skill-training",
      name: "Skill Training",
      description:
        "Invest in training programs to enhance your clicking skills, granting additional bonuses.",
      price: 150,
      effect: () => {
        console.log("Skill Training effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "upgraded-mouse",
      name: "Upgraded Mouse",
      description:
        "Enhance your clicking speed and accuracy with an advanced mouse.",
      price: 120,
      effect: () => {
        console.log("Upgraded Mouse effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "motivational-posters",
      name: "Motivational Posters",
      description:
        "Boost morale and increase the effectiveness of each click with motivational posters.",
      price: 80,
      effect: () => {
        console.log("Motivational Posters effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "efficiency-software",
      name: "Efficiency Software",
      description:
        "Purchase software upgrades to automate certain clicking tasks temporarily.",
      price: 250,
      effect: () => {
        console.log("Efficiency Software effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "smartphone-app",
      name: "Smartphone App",
      description:
        "Click and earn resources even when away from the computer with a dedicated smartphone app.",
      price: 300,
      effect: () => {
        console.log("Smartphone App effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "office-decorations",
      name: "Office Decorations",
      description:
        "Upgrade the office ambiance, providing long-term benefits to click efficiency.",
      price: 100,
      effect: () => {
        console.log("Office Decorations effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "time-management-course",
      name: "Time Management Course",
      description:
        "Improve your time management skills, increasing overall productivity.",
      price: 200,
      effect: () => {
        console.log("Time Management Course effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "virtual-assistant",
      name: "Virtual Assistant",
      description:
        "Hire a virtual assistant to automate clicks at a slower but steady rate.",
      price: 600,
      effect: () => {
        console.log("Virtual Assistant effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "desk-organizer",
      name: "Desk Organizer",
      description:
        "Streamline your workspace, boosting click efficiency and providing additional bonuses.",
      price: 80,
      effect: () => {
        console.log("Desk Organizer effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "multi-tasking-training",
      name: "Multi-Tasking Training",
      description:
        "Learn to click on multiple targets simultaneously for increased efficiency.",
      price: 150,
      effect: () => {
        console.log("Multi-Tasking Training effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "employee-motivation-seminar",
      name: "Employee Motivation Seminar",
      description:
        "Attend a seminar to increase the morale of all virtual employees, resulting in a temporary boost to click rate.",
      price: 120,
      effect: () => {
        console.log("Employee Motivation Seminar effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "upgraded-keyboard",
      name: "Upgraded Keyboard",
      description:
        "Enhance typing speed and accuracy with an upgraded keyboard, providing additional benefits during the game.",
      price: 100,
      effect: () => {
        console.log("Upgraded Keyboard effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "office-expansion",
      name: "Office Expansion",
      description:
        "Unlock new areas in the office, each offering unique bonuses.",
      price: 1000,
      effect: () => {
        console.log("Office Expansion effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "networking-event",
      name: "Networking Event",
      description:
        "Increase your connections and enjoy long-term benefits to click efficiency.",
      price: 180,
      effect: () => {
        console.log("Networking Event effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
    {
      id: "time-warp",
      name: "Time Warp",
      description:
        "Temporarily speed up time, allowing you to accumulate resources faster for a limited duration.",
      price: 400,
      effect: () => {
        console.log("Time Warp effect");
        // Add your code here for the effect of the upgrade
      },
      bought: false,
    },
  ],
  buyUpgrade: (upgrade) => {
    if (useCountStore.getState().count >= upgrade.price && !upgrade.bought) {
      set((state) => {
        const newUpgrades = state.upgrades.map((_upgrade) => {
          return upgrade.id === _upgrade.id
            ? { ..._upgrade, bought: true }
            : _upgrade;
        });

        return { upgrades: newUpgrades };
      });
    }
  },
}));

export { useCountStore, useShopStore };
