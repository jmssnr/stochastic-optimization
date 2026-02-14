import CircleLineSeries from "@/components/circle-line-series";
import { Iteration } from "@/core/types";
import { scaleLinear } from "d3-scale";

const OrderQuantityChart = (props: {
  width: number;
  height: number;
  data: Iteration[];
}) => {
  const { width, height, data } = props;

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
      />
      <CircleLineSeries
        data={data.map((d) => d.kesten.orderQuantity)}
        xScale={xScale}
        yScale={yScale}
        color="blue"
        highlight
      />
      <CircleLineSeries
        data={data.map((d) => d.harmonic.orderQuantity)}
        xScale={xScale}
        yScale={yScale}
        color="green"
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
      <line
        x1={width}
        x2={width}
        y1={0}
        y2={height}
        className="stroke-gray-500"
      />
    </svg>
  );
};

export default OrderQuantityChart;
