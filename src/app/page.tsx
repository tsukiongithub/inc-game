import { isLocalStorageAvailable } from "~/utils/utils";

import Clicker from "~/components/clicker";
import Inventory from "~/components/inventory";
import Shop from "~/components/shop";

export default async function Home() {
  return (
    <main className="flex min-h-screen gap-4 p-6">
      {isLocalStorageAvailable() && <div>hello</div>}
      <Clicker />
      <Inventory />
      <Shop />
    </main>
  );
}
