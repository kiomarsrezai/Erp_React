import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { grey, blue, green } from "@mui/material/colors";
import { numberWithCommas } from "helper/calculate-utils";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface BulletChartProps {
  data: any[];
  lineName: string;
  barName: string;
  innerBarName: string;
  lineLabel: string;
  barLabel: string;
  innerBarLabel: string;
}

function BulletChart(props: BulletChartProps) {
  const {
    data,
    barName,
    innerBarName,
    lineName,
    lineLabel,
    barLabel,
    innerBarLabel,
  } = props;

  // bar
  const CustomBarWithTarget = (props: any) => {
    const { x, y, width, height, ...barData } = props;

    const check = barData[innerBarName] / barData[barName];
    const customHeight = height * check;
    const customX = x + width / 4;
    const customWidth = width / 2;
    const customY = y + height - customHeight;

    return (
      <svg>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          stroke="none"
          fill="#999"
        />

        <rect
          x={customX}
          y={customY}
          width={customWidth}
          height={customHeight}
          stroke="none"
          fill={blue[200]}
        />
      </svg>
    );
  };

  // formaters

  // const tooltipFormatter = (value: number, name: string) => {
  //   let nameValue = "";
  //   if (name === barName) nameValue = barLabel;
  //   if (name === lineName) nameValue = lineLabel;
  //   if (name === innerBarName) nameValue = innerBarLabel;

  //   return [numberWithCommas(value), nameValue];
  // };
  const CustomTooltip = ({ active, payload, label, ...others }: any) => {
    if (active && payload && payload.length) {
      // console.log(others);
      return (
        <Card variant="outlined" sx={{ borderColor: blue[200] }} dir="rtl">
          <CardContent>
            <Typography variant="body1">بخش : {label}</Typography>
            <Typography variant="body1">
              {barLabel} : {payload[1]?.value}
            </Typography>
          </CardContent>
        </Card>
      );
    }

    return null;
  };

  const legendFormatter = (value: string, entry: any) => {
    console.log(entry);

    if (value === barName) return barLabel;
    if (value === lineName) return lineLabel;
    if (value === innerBarName) return innerBarLabel;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
        <CartesianGrid stroke={grey[300]} strokeDasharray="3 3" />
        <XAxis dataKey="AreaName" interval={0} fontSize={12} />
        <YAxis width={180} tickFormatter={(value) => numberWithCommas(value)} />
        <Tooltip
          content={<CustomTooltip />} /*formatter={tooltipFormatter as any}*/
        />
        <Legend formatter={legendFormatter} />
        <Bar
          dataKey={barName}
          barSize={40}
          shape={<CustomBarWithTarget />}
          fill={grey[400]}
        />

        {/* <Bar dataKey={innerBarName} barSize={40} fill={blue[400]} hide /> */}

        <Line
          type="monotone"
          dataKey={lineName}
          stroke={green[700]}
          strokeWidth={4}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default BulletChart;
