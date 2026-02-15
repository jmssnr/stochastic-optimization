import { exogenousInformation } from "@/core/exogenous-information";
import { useEffect, useRef, useState } from "react";

export function useAnimate<T extends object>(
  simulation: (demand: () => number) => Generator<T>,
  demandDistribution: string,
  throttle = 100,
) {
  const [state, setState] = useState<T[]>([]);
  const frameIdRef = useRef(0);
  const lastUpdateRef = useRef(0);
  const randomDemand = exogenousInformation(demandDistribution);
  const simulator = useRef(simulation(randomDemand));

  const frame = (time: number) => {
    if (time - lastUpdateRef.current >= throttle) {
      lastUpdateRef.current = time;

      const result = simulator.current.next();

      if (!result.done) {
        setState((prev) => [...prev, result.value]);
        frameIdRef.current = requestAnimationFrame(frame);
      }
    } else {
      frameIdRef.current = requestAnimationFrame(frame);
    }
  };

  useEffect(() => {
    if (frameIdRef.current) {
      cancelAnimationFrame(frameIdRef.current);
    }
    simulator.current = simulation(randomDemand);
    lastUpdateRef.current = 0;
    setState([]);

    frameIdRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [demandDistribution]);

  return state;
}
