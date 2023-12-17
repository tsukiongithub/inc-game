"use client";

import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ShopItem } from "~/types/ShopItem";
import { useShopStore } from "~/app/zustand-store";

const Inventory = () => {
  const items = useShopStore((state) => state.items);

  return (
    <div className="rounded-lg bg-gray-100 p-6">
      <h1 className="mb-4 text-2xl font-bold">Inventory</h1>

      <div className="space-y-4">
        {items.map((item, i) => {
          return <InventoryItem item={item} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Inventory;

type InventoryItemProps = {
  item: ShopItem;
};

const InventoryItem = ({ item }: InventoryItemProps) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle>{item.name}</CardTitle>
        <CardDescription>You have: {item.amount}</CardDescription>
      </CardHeader>
    </Card>
  );
};
