"use client";

import OrderQuantityChart from "@/components/order-quantity-chart";
import { simulation } from "@/core/simulation";
import { useAnimate } from "@/hooks/use-animate";

export default function Home() {
  const data = useAnimate(simulation());
  return (
    <main className="w-dvh h-dvh grid place-content-center">
      <OrderQuantityChart width={500} height={500} data={data} />
    </main>
  );
}
