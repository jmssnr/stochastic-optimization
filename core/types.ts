export type Iteration = {
  demand: number;
  kesten: { orderQuantity: number; reward: number };
  constant: { orderQuantity: number; reward: number };
  harmonic: { orderQuantity: number; reward: number };
};
