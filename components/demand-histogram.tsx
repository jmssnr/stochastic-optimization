import { bin, thresholdFreedmanDiaconis } from "d3-array";
import { scaleLinear } from "d3-scale";

const DemandHistogram = (props: {
  width: number;
  height: number;
  data: number[];
}) => {
  const { width, height, data } = props;

  const histogram = bin()
    .value((d) => d)
    .domain([0, 100])
    .thresholds(30);
  const bins = histogram(data);

  const yScale = scaleLinear()
    .range([height, 0])
    .domain([0, 100]);

  const xScale = scaleLinear()
    .range([0, width])
    .domain([0, Math.max(...bins.map((b) => b.length))]);

  return (
    <svg width={width} height={height} className="overflow-visible">
      {bins.map((b, i) => (
        <rect
          key={i}
          x={0}
          y={yScale(b.x1!)}
          height={yScale(b.x0!) - yScale(b.x1!)}
          width={xScale(b.length)}
          className="fill-teal-900 stroke-teal-400 transition-all"
        />
      ))}
    </svg>
  );
};

export default DemandHistogram;
