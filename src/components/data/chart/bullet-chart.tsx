import { Stack } from "@mui/material";
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

  const barColor = "#999";
  const innerBarColor = blue[300];
  const lineColor = green[700];

  // bar
  const CustomBarWithTarget = (props: any) => {
    const { x, y, width, height, ...barData } = props;

    const check = barData[innerBarName] / barData[barName];
    const customHeight = height * check;
    const customWidth = width / 3;
    const customX = x + width / 2 - customWidth / 2;
    const customY = y + height - customHeight;

    return (
      <svg>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          stroke="none"
          fill={barColor}
        />

        <rect
          x={customX}
          y={customY}
          width={customWidth}
          height={customHeight}
          stroke="none"
          fill={innerBarColor}
        />

        <text
          x={x + width / 2}
          y={y}
          dy={-4}
          fontSize="14"
          fill={"black"}
          textAnchor="middle"
        >
          {Math.round((barData[lineName] / barData[barName]) * 100)}%
        </text>
      </svg>
    );
  };

  // formaters
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Card variant="outlined" sx={{ borderColor: blue[200] }} dir="rtl">
          <CardContent>
            <Typography variant="body2" color="GrayText" mb={1}>
              منطقه : <strong>{label}</strong>
            </Typography>
            <Typography variant="body2" color={barColor}>
              {barLabel} :{" "}
              <strong>{numberWithCommas(payload[0]?.payload[barName])}</strong>
            </Typography>
            <Typography variant="body2" color={innerBarColor}>
              {innerBarLabel} :{" "}
              <strong>
                {numberWithCommas(payload[0]?.payload[innerBarName])}
              </strong>
            </Typography>
            <Typography variant="body2" color={lineColor}>
              {lineLabel} :{" "}
              <strong>{numberWithCommas(payload[0]?.payload[lineName])}</strong>
            </Typography>
          </CardContent>
        </Card>
      );
    }

    return null;
  };

  const CustomLegend = () => {
    return (
      <Stack direction={"row"} justifyContent={"center"} gap={3}>
        <Typography variant="caption" color={barColor}>
          {barLabel}
        </Typography>
        <Typography variant="caption" color={innerBarColor}>
          {innerBarLabel}
        </Typography>
        <Typography variant="caption" color={lineColor}>
          {lineLabel}
        </Typography>
      </Stack>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
        <CartesianGrid stroke={grey[300]} strokeDasharray="3 3" />
        <XAxis dataKey="AreaName" interval={0} fontSize={12} />
        <YAxis width={180} tickFormatter={(value) => numberWithCommas(value)} />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
        <Bar
          dataKey={barName}
          barSize={40}
          shape={<CustomBarWithTarget />}
          fill={grey[400]}
        />

        <Line
          type="monotone"
          dataKey={lineName}
          stroke={lineColor}
          strokeWidth={4}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default BulletChart;
