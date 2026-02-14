import { scaleLinear } from "d3-scale";

const DemandHistogram = (props: {
  width: number;
  height: number;
  data: number[];
}) => {
  const { width, height, data } = props;

  const xScale = scaleLinear()
    .range([0, width])
    .domain([0, data.length < 4 ? 4 : data.length]);

  const yScale = scaleLinear().range([height, 0]).domain([0, 100]);
  return <div>DemandHistogram</div>;
};

export default DemandHistogram;
