"use client";

import ResponsiveContainer from "@/components/chart/responsive-container";
import OrderQuantityChart from "@/components/order-quantity-chart";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { simulation } from "@/core/simulation";
import { useAnimate } from "@/hooks/use-animate";
import { useState } from "react";

export default function Home() {
  const [rule, setRule] = useState<string>("kesten");
  const data = useAnimate(simulation());

  return (
    <main className="w-screen h-screen p-20">
      <div className="w-full h-full flex">
        <div className="flex-2 min-w-0 min-h-0 w-full h-full">
          <div className="min-w-0 min-h-0 w-full h-full flex flex-col gap-5">
            <div>
              <h1 className="text-2xl font-bold">
                Stochastic optimization applied to the Newsvendor problem
              </h1>
              <h2 className="text-gray-400">
                Chart shows the evolution of the current order quantity towards
                its optimal value for three different step size rules
              </h2>
            </div>
            <RadioGroup
              className="w-fit flex gap-6"
              orientation="horizontal"
              value={rule}
              onValueChange={(v) => setRule(v)}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="constant" id="r1" />
                <Label htmlFor="r1">Constant</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="harmonic" id="r2" />
                <Label htmlFor="r2">Harmonic</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="kesten" id="r3" />
                <Label htmlFor="r3">Kesten</Label>
              </div>
            </RadioGroup>
            <div className="min-w-0 min-h-0 w-full h-full">
              <ResponsiveContainer>
                {({ width, height }) => (
                  <OrderQuantityChart
                    width={width}
                    height={height}
                    data={data}
                    rule={rule}
                  />
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="flex-1 w-full h-full "></div>
      </div>
    </main>
  );
}
