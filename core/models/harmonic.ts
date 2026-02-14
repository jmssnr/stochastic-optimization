import { SDPModel } from "@/core/models/base";

export class Harmonic extends SDPModel<"time"> {
  states = { orderQuantity: 0, time: 0 };
  decisions = { stepSize: 0 };
  theta: number = 50;

  transition(demand: number) {
    const derivative = this.getDerivative(demand);
    this.states.time++;
    this.states.orderQuantity = this.getNextOrderQuantity(derivative);
  }

  policy(): void {
    this.decisions.stepSize = this.theta / (this.theta + this.states.time - 1);
  }
}
