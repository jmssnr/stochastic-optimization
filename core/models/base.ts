import { COST, PRICE } from "@/core/parameters";

export abstract class SDPModel<S extends string = string> {
  price = PRICE;
  cost = COST;
  cumulativeReward = 0;
  abstract states: Record<"orderQuantity" | S, number>;
  abstract decisions: Record<"stepSize", number>;
  abstract transition(demand: number): void;
  abstract policy(): void;

  contribution(demand: number) {
    this.cumulativeReward +=
      this.price * Math.min(this.states.orderQuantity, demand) -
      this.cost * this.states.orderQuantity;
  }

  step(demand: number) {
    this.contribution(demand);
    this.policy();
    this.transition(demand);
  }

  getDerivative(demand: number) {
    return this.states.orderQuantity < demand
      ? this.price - this.cost
      : -this.cost;
  }

  getNextOrderQuantity(derivative: number) {
    return Math.max(
      0,
      this.states.orderQuantity + this.decisions.stepSize * derivative,
    );
  }
}
