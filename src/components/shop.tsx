"use client";

import { type ShopItem } from "~/types/ShopItem";

import { useShopStore } from "~/app/zustand-store";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { BadgeCent } from "lucide-react";

const Shop = () => {
  const items = useShopStore((state) => state.items);

  return (
    <>
      <aside className="col-span-1 rounded-lg bg-gray-100 p-6">
        <h1 className="mb-4 text-2xl font-bold">Shop</h1>
        <div className="space-y-4">
          {items.map((item, i) => {
            return <ShopItem item={item} key={i} />;
          })}
        </div>
      </aside>
    </>
  );
};

type ShopItemProps = {
  item: ShopItem;
};

const ShopItem = ({ item }: ShopItemProps) => {
  const buyItem = useShopStore((state) => state.buyItem);

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <div>{item.name}</div>
          <div className="ml-auto flex items-start gap-1 text-gray-500">
            <div>{item.price}</div>
            <BadgeCent className="h-6 w-6" />
          </div>
        </CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full"
          size="sm"
          onClick={() => {
            buyItem(item);
          }}
        >
          Buy
        </Button>
      </CardContent>
    </Card>
  );
};

export default Shop;
