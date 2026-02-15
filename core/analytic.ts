import { COST, DMAX, DMIN, MEAN, PRICE, STDEV } from "@/core/parameters";

export function analyticOptimum(type: "uniform" | "gaussian" | (string & {})) {
  if (type === "uniform") {
    return DMIN + ((DMAX - DMIN) * (PRICE - COST)) / PRICE;
  }

  return MEAN + STDEV * -0.56595;
}
