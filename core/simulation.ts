import { Constant } from "@/core/models/constant";
import { Harmonic } from "@/core/models/harmonic";
import { Kesten } from "@/core/models/kesten";
import { uniform } from "@/core/random/uniform-distribution";

const NUM_ITERATIONS = 160;
const DMIN = 50;
const DMAX = 100;

export function* simulation() {
  const kesten = new Kesten();
  const constant = new Constant();
  const harmonic = new Harmonic();

  let demand = 0;

  for (let i = 0; i < NUM_ITERATIONS; i++) {
    yield {
      demand,
      kesten: {
        orderQuantity: kesten.states.orderQuantity,
        reward: kesten.cumulativeReward,
      },
      constant: {
        orderQuantity: constant.states.orderQuantity,
        reward: constant.cumulativeReward,
      },
      harmonic: {
        orderQuantity: harmonic.states.orderQuantity,
        reward: harmonic.cumulativeReward,
      },
    };

    demand = uniform(DMIN, DMAX);
    kesten.step(demand);
    constant.step(demand);
    harmonic.step(demand);
  }
}
