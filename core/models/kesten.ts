import { SDPModel } from "@/core/models/base";

export class Kesten extends SDPModel<"counter"> {
  states = { counter: 0, orderQuantity: 0 };
  decisions = { stepSize: 0 };
  prevDerivative: number = 0;
  theta: number = 1.5;

  transition(demand: number) {
    const derivative = this.getDerivative(demand);

    this.states.orderQuantity = this.getNextOrderQuantity(derivative);

    if (derivative * this.prevDerivative < 0) {
      this.states.counter++;
    }

    this.prevDerivative = derivative;
  }

  policy(): void {
    this.decisions.stepSize =
      this.theta / (this.theta + this.states.counter - 1);
  }
}
