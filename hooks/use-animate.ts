import { useEffect, useRef, useState } from "react";

export function useAnimate<T extends object>(
  simulation: Generator<T>,
  throttle = 100,
) {
  const [state, setState] = useState<T[]>([]);
  const frameIdRef = useRef(0);
  const lastUpdateRef = useRef(0);
  const simulator = useRef(simulation);

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
    frameIdRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameIdRef.current);
  }, []);

  return state;
}
