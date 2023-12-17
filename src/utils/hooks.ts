import { useEffect, useRef } from "react";

/**
 * @param {VoidFunction} callback callback method to call after the delay
 * @param {number} delay number of seconds
 * @param {boolean} enabled
 */
const useInterval = (
  callback: VoidFunction | null,
  delay: number,
  enabled = true,
) => {
  const savedCallback = useRef<typeof callback | null>(callback);

  useEffect(() => {
    if (savedCallback.current) savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current && enabled) savedCallback.current();
    }
    const id = setInterval(tick, delay * 1000);
    return () => clearInterval(id);
  }, [enabled, delay]);
};

export { useInterval };
