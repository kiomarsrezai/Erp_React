import { Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { grey, blue, green } from "@mui/material/colors";
import { getPercent, numberWithCommas } from "helper/calculate-utils";
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
  lineLabel: string;
  barLabel: string;
}

function FixedChart(props: BulletChartProps) {
  const { data, barName, lineName, lineLabel, barLabel } = props;

  const barColor = "#999";
  const innerBarColor = blue[300];
  const lineColor = green[700];

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
            <Typography variant="body2" color={lineColor}>
              {lineLabel} :{" "}
              <strong>{numberWithCommas(payload[0]?.payload[lineName])}</strong>
            </Typography>

            <Typography variant="body2" color="black">
              % جذب :{" "}
              <strong>
                %
                {getPercent(
                  payload[0]?.payload[lineName],
                  payload[0]?.payload[barName]
                )}
              </strong>
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
        <Typography variant="caption" color={lineColor}>
          {lineLabel}
        </Typography>
      </Stack>
    );
  };

  const CustomBarWithTarget = (barProps: any) => {
    const { x, y, width, height, ...barData } = barProps;

    const isHigh = height >= 300;

    return (
      <svg>
        <rect
          x={x}
          y={y + (isHigh ? 10 : 0)}
          width={width}
          height={height - (isHigh ? 10 : 0)}
          stroke="none"
          fill={barColor}
          rx={"4"}
        />

        <text
          x={x + width / 2}
          y={y + (isHigh ? 10 : 0)}
          dy={-4}
          fontSize="14"
          fill={"black"}
          textAnchor="middle"
        >
          {getPercent(barData[lineName], barData[barName])}%
        </text>
      </svg>
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
          fill={barColor}
          shape={<CustomBarWithTarget />}
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

export default FixedChart;
