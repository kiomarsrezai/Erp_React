import Paper from "@mui/material/Paper";
import { grey, blue } from "@mui/material/colors";
import AdminLayout from "components/layout/admin-layout";

import {
  ComposedChart,
  Line,
  Area,
  Label,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";

const MosavabLabel = "مصوب";
const ExpenseLabel = "عملکرد";

const data = [
  {
    YearId: 32,
    AreaId: 1,
    BudgetProcessId: 1,
    AreaName: 1,
    Mosavab: 4352835000000,

    MosavabDaily: 4352835000000,
    Expense: 2352835000000,
    NotGet: 4352835000000,
  },
  {
    YearId: 32,
    AreaId: 2,
    BudgetProcessId: 1,
    AreaName: 2,
    MosavabLabel: "مصوب",
    ExpenseLabel: "عملکرد",
    Mosavab: 8356672000000,
    MosavabDaily: 8356672000000,
    Expense: 6356672000000,
    NotGet: 8356672000000,
  },
  {
    YearId: 32,
    AreaId: 3,
    MosavabLabel: "مصوب",
    ExpenseLabel: "عملکرد",
    BudgetProcessId: 1,
    AreaName: 3,
    Mosavab: 4244004000000,
    MosavabDaily: 4244004000000,
    Expense: 0,
    NotGet: 4244004000000,
  },
  {
    YearId: 32,
    AreaId: 4,
    BudgetProcessId: 1,
    MosavabLabel: "مصوب",
    ExpenseLabel: "عملکرد",
    AreaName: 4,
    Mosavab: 2994950000000,
    MosavabDaily: 2994950000000,
    Expense: 0,
    NotGet: 2994950000000,
  },
  {
    YearId: 32,
    AreaId: 5,
    BudgetProcessId: 1,
    AreaName: 5,
    MosavabLabel: "مصوب",
    ExpenseLabel: "عملکرد",
    Mosavab: 2035920000000,
    MosavabDaily: 2035920000000,
    Expense: 0,
    NotGet: 2035920000000,
  },
  {
    YearId: 32,
    AreaId: 6,
    BudgetProcessId: 1,
    MosavabLabel: "مصوب",
    ExpenseLabel: "عملکرد",
    AreaName: 6,
    Mosavab: 1407649000000,
    MosavabDaily: 1407649000000,
    Expense: 0,
    NotGet: 1407649000000,
  },
  {
    YearId: 32,
    AreaId: 7,
    BudgetProcessId: 1,
    AreaName: 7,
    Mosavab: 1970200000000,
    MosavabLabel: "مصوب",
    ExpenseLabel: "عملکرد",
    MosavabDaily: 1970200000000,
    Expense: 0,
    NotGet: 1970200000000,
  },
  {
    YearId: 32,
    AreaId: 8,
    BudgetProcessId: 1,
    MosavabLabel: "مصوب",
    ExpenseLabel: "عملکرد",
    AreaName: 8,
    Mosavab: 2334984000000,
    MosavabDaily: 2334984000000,
    Expense: 2334984000000,
    NotGet: 2334984000000,
  },
  {
    YearId: 32,
    AreaId: 9,
    BudgetProcessId: 1,
    MosavabLabel: "مصوب",
    ExpenseLabel: "عملکرد",
    AreaName: "مرکز",
    Mosavab: 31765033637000,
    MosavabDaily: 31765033637000,
    Expense: 0,
    NotGet: 31765033637000,
  },
];

function ReportRevenueChartPage() {
  return (
    <AdminLayout>
      <Paper
        sx={{
          width: "100%",
          // direction: "rtl",
          overflow: "hidden",
          height: "calc(100vh - 64px)",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid stroke={grey[200]} />
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
            <Bar dataKey="Mosavab" fill={grey[400]} />
            <Line type="monotone" dataKey="Expense" stroke={blue[800]} />
          </ComposedChart>
        </ResponsiveContainer>
      </Paper>
    </AdminLayout>
  );
}

export default ReportRevenueChartPage;
