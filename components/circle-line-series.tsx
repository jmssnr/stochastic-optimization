import { colors } from "@/components/colors";
import { cn } from "@/lib/utils";
import { ScaleLinear } from "d3-scale";
import { line } from "d3-shape";

const CircleLineSeries = ({
  data,
  xScale,
  yScale,
  color,
  highlight = false,
}: {
  data: number[];
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  color: keyof typeof colors;
  highlight?: boolean;
}) => {
  const linePath = line<number>()
    .x((_, i) => xScale(i))
    .y((d) => yScale(d));

  return (
    <g className={cn(!highlight && "opacity-20")}>
      <path
        d={linePath(data) ?? ""}
        className={cn("fill-none", colors[color].stroke)}
      />
      {data.map((d, i) => (
        <circle
          key={i}
          cx={xScale(i)}
          cy={yScale(d)}
          r={5}
          className={cn(colors[color].fill, colors[color].stroke)}
        />
      ))}
    </g>
  );
};

export default CircleLineSeries;
