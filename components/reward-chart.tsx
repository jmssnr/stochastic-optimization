import { colors } from "@/components/colors";
import { cn } from "@/lib/utils";
import { scaleBand, scaleLinear } from "d3-scale";

const RewardChart = (props: {
  width: number;
  height: number;
  data: { constant: number; kesten: number; harmonic: number };
  highlight: string;
}) => {
  const { width, height, data, highlight } = props;

  const yScale = scaleBand()
    .range([height, 0])
    .domain(["constant", "kesten", "harmonic"]);

  const xScale = scaleLinear()
    .range([0, width])
    .domain([0, Math.max(data.constant, data.harmonic, data.kesten)]);

  return (
    <svg width={width} height={height} className="overflow-visible">
      <rect
        width={width}
        height={height}
        className="fill-gray-900 stroke-gray-500"
      />
      <rect
        y={yScale("constant")}
        height={yScale.bandwidth()}
        x={0}
        width={xScale(data.constant)}
        className={cn(
          "transition-all",
          colors["amber"].fill,
          colors["amber"].stroke,
          highlight !== "constant" && "opacity-20",
        )}
      />
      <rect
        y={yScale("kesten")}
        height={yScale.bandwidth()}
        x={0}
        width={xScale(data.kesten)}
        className={cn(
          "transition-all",
          colors["blue"].fill,
          colors["blue"].stroke,
          highlight !== "kesten" && "opacity-20",
        )}
      />
      <rect
        y={yScale("harmonic")}
        height={yScale.bandwidth()}
        x={0}
        width={xScale(data.harmonic)}
        className={cn(
          "transition-all",
          colors["green"].fill,
          colors["green"].stroke,
          highlight !== "harmonic" && "opacity-20",
        )}
      />
    </svg>
  );
};

export default RewardChart;
