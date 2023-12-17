import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const isLocalStorageAvailable = () => {
  const text = "localStorageIsAvailable";

  try {
    localStorage.setItem(text, text);
    localStorage.removeItem(text);
    return true;
  } catch (e) {
    return false;
  }
};

export { isLocalStorageAvailable, cn };
