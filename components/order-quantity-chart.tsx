import CircleLineSeries from "@/components/circle-line-series";
import RewardChart from "@/components/reward-chart";
import { Iteration } from "@/core/types";
import { scaleLinear } from "d3-scale";

const OrderQuantityChart = (props: {
  width: number;
  height: number;
  data: Iteration[];
  rule: string;
}) => {
  const { rule, width, height, data } = props;

  const xScale = scaleLinear()
    .range([0, width])
    .domain([0, data.length < 4 ? 4 : data.length]);

  const yScale = scaleLinear().range([height, 0]).domain([0, 100]);

  return (
    <svg width={width} height={height} className="overflow-visible">
      <CircleLineSeries
        data={data.map((d) => d.constant.orderQuantity)}
        xScale={xScale}
        yScale={yScale}
        color="amber"
        highlight={rule === "constant"}
      />
      <CircleLineSeries
        data={data.map((d) => d.kesten.orderQuantity)}
        xScale={xScale}
        yScale={yScale}
        color="blue"
        highlight={rule === "kesten"}
      />
      <CircleLineSeries
        data={data.map((d) => d.harmonic.orderQuantity)}
        xScale={xScale}
        yScale={yScale}
        color="green"
        highlight={rule === "harmonic"}
      />
      <line
        x1={0}
        x2={width}
        y1={height}
        y2={height}
        className="stroke-gray-500"
      />
      <text className="text-sm fill-gray-400" x={0} y={height} dy={20}>
        Days
      </text>
      <text
        className="text-sm fill-gray-400"
        x={width}
        y={0}
        dy={20}
        transform={`rotate(90, ${width}, ${0})`}
      >
        Order Quantity
      </text>
      <line
        x1={width}
        x2={width}
        y1={0}
        y2={height}
        className="stroke-gray-500"
      />
      <g transform="translate(0, 100)">
        <text className="text-sm fill-gray-400" x={0} y={0} dy={-15}>
          Cumulative Reward
        </text>
        <RewardChart
          width={150}
          height={100}
          data={{
            constant: data.at(-1)!.constant.reward,
            harmonic: data.at(-1)!.harmonic.reward,
            kesten: data.at(-1)!.kesten.reward,
          }}
          highlight={rule}
        />
      </g>
    </svg>
  );
};

export default OrderQuantityChart;
