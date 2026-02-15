"use client";

import ResponsiveContainer from "@/components/chart/responsive-container";
import DemandHistogram from "@/components/demand-histogram";
import OrderQuantityChart from "@/components/order-quantity-chart";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { analyticOptimum } from "@/core/analytic";
import { simulation } from "@/core/simulation";
import { useAnimate } from "@/hooks/use-animate";
import { useState } from "react";

export default function Home() {
  const [rule, setRule] = useState<string>("kesten");

  const [demandDistribution, setDemandDistribution] =
    useState<string>("uniform");

  const optimum = analyticOptimum(demandDistribution);

  const data = useAnimate(simulation, demandDistribution);

  return (
    <main className="w-dvw h-dvh p-10 sm:p-20 ">
      <div className="w-full h-full flex flex-col gap-10 sm:flex-row sm:gap-0">
        <div className="flex-2 min-w-0 min-h-0 w-full h-full">
          <div className="min-w-0 min-h-0 w-full h-full flex flex-col gap-5">
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
                    optimum={optimum}
                  />
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full h-full min-w-0 min-h-0 pl-2">
          <div className="min-w-0 min-h-0 w-full h-full flex flex-col gap-5">
            <RadioGroup
              className="w-fit flex gap-6"
              orientation="horizontal"
              value={demandDistribution}
              onValueChange={(v) => setDemandDistribution(v)}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="uniform" id="r5" />
                <Label htmlFor="r5">Uniform</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="gaussian" id="r7" />
                <Label htmlFor="r7">Gaussian</Label>
              </div>
            </RadioGroup>
            <div className="min-w-0 min-h-0 w-full h-full">
              <ResponsiveContainer>
                {({ width, height }) => (
                  <DemandHistogram
                    width={width}
                    height={height}
                    data={data.map((d) => d.demand)}
                  />
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
