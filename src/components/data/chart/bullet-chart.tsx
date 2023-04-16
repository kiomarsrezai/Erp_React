import { grey, blue } from "@mui/material/colors";
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

const MosavabLabel = "مصوب";
const ExpenseLabel = "عملکرد";

const CustomBarWithTarget = (props: any) => {
  const { fill, x, y, width, height, MosavabDaily, Mosavab } = props;

  const check = MosavabDaily / Mosavab;
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
        fill={fill}
      />
    </svg>
  );
};

interface ChartDataShape {
  AreaName: string;
  Mosavab: number;
  Expense: number;
  MosavabDaily: number;
}

interface BulletChartProps {
  data: ChartDataShape[];
  lineLabel: string;
  chartLabel: string;
}

function BulletChart(props: BulletChartProps) {
  const { data } = props;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data}>
        <CartesianGrid stroke={grey[300]} strokeDasharray="3 3" />
        <XAxis dataKey="AreaName" />
        <YAxis />
        <Tooltip
          formatter={(value, name) => [
            value,
            name === "Mosavab" ? MosavabLabel : ExpenseLabel,
          ]}
        />
        <Legend
          formatter={(value, entry) =>
            value === "Mosavab" ? MosavabLabel : ExpenseLabel
          }
        />
        <Bar
          dataKey="Mosavab"
          stackId="a"
          width={100}
          shape={<CustomBarWithTarget />}
          fill={grey[400]}
        />

        <Line
          type="monotone"
          dataKey="Expense"
          stroke={blue[800]}
          strokeWidth={4}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default BulletChart;
