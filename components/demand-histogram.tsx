import { bin } from "d3-array";
import { scaleLinear } from "d3-scale";

const HorizontalHistogram = (props: {
  width: number;
  height: number;
  data: number[];
}) => {
  const { width, height, data } = props;

  const histogram = bin()
    .value((d) => d)
    .domain([0, 150])
    .thresholds(30);

  const bins = histogram(data);

  const xScale = scaleLinear().domain([0, 150]).range([0, width]);

  const yScale = scaleLinear()
    .domain([0, Math.max(...bins.map((b) => b.length))])
    .range([height, 0]);

  return (
    <svg width={width} height={height} className="overflow-visible">
      {bins.map((b, i) => (
        <rect
          key={i}
          x={xScale(b.x0!)}
          y={yScale(b.length)}
          width={xScale(b.x1!) - xScale(b.x0!)}
          height={height - yScale(b.length)}
          className="fill-teal-900 stroke-teal-400 transition-all"
        />
      ))}
      <line x1={0} x2={width} y1={height} y2={height} className="stroke-gray-400"/>
    </svg>
  );
};

const VerticalHistogram = (props: {
  width: number;
  height: number;
  data: number[];
}) => {
  const { width, height, data } = props;

  const histogram = bin()
    .value((d) => d)
    .domain([0, 150])
    .thresholds(30);
  const bins = histogram(data);

  const yScale = scaleLinear().range([height, 0]).domain([0, 150]);

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

const DemandHistogram = (props: {
  width: number;
  height: number;
  data: number[];
}) => {
  return (
    <div>
      <div className="block sm:hidden">
        <HorizontalHistogram {...props} />
      </div>
      <div className="hidden sm:block">
        <VerticalHistogram {...props} />
      </div>
    </div>
  );
};

export default DemandHistogram;
