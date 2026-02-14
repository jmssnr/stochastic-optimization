import { SDPModel } from "@/core/base";

export class Constant extends SDPModel {
  states = { orderQuantity: 0 };
  decisions = { stepSize: 0 };
  theta: number = 1.5;

  transition(demand: number) {
    const derivative = this.getDerivative(demand);
    this.states.orderQuantity = this.getNextOrderQuantity(derivative);
  }

  policy(): void {
    this.decisions.stepSize = this.theta;
  }
}
