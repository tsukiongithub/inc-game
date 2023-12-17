"use client";

import { useEffect } from "react";
import { useDebounce, useLocalStorage } from "@uidotdev/usehooks";

import { useInterval } from "~/utils/hooks";

import { useCountStore } from "../app/zustand-store";
import { Button } from "./ui/button";

const Clicker = () => {
  const [lSCount, setLSCount] = useLocalStorage("count", 0);
  const count = useCountStore((state) => state.count);
  const autoCount = useCountStore((state) => state.autoIncrementor);
  const incrementCount = useCountStore((state) => state.increment);
  const autoIncrementCount = useCountStore((state) => state.autoIncrement);
  const setCount = useCountStore((state) => state.setCount);
  const debouncedCount = useDebounce(count, 150);

  useEffect(() => {
    setCount(lSCount);
  }, []);

  useEffect(() => {
    setLSCount(count);
  }, [debouncedCount]);

  useInterval(
    () => {
      autoIncrementCount();
    },
    1,
    !!autoCount,
  );

  return (
    <>
      <main className="grow rounded-lg bg-gray-100 p-6">
        <h1 className="mb-4 text-2xl font-bold">Office</h1>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <span className="text-sm font-semibold">C/s:</span>
            <span className="ml-2">{autoCount}</span>
          </div>
          <div className="flex items-center">
            <span className="text-lg font-semibold">Clicks:</span>
            <span className="ml-2">{count}</span>
          </div>
        </div>
        <Button
          className="mt-4"
          onClick={() => {
            incrementCount();
          }}
        >
          Click!
        </Button>
      </main>
    </>
  );
};

export default Clicker;
