import { DMAX, DMIN, MEAN, STDEV } from "@/core/parameters";
import { gaussian } from "@/core/random/gaussian-distribution";
import { uniform } from "@/core/random/uniform-distribution";

export function exogenousInformation(
  type: "uniform" | "gaussian" | (string & {}),
) {
  if (type === "uniform") {
    return () => uniform(DMIN, DMAX);
  }

  return () => gaussian(MEAN, STDEV);
}
