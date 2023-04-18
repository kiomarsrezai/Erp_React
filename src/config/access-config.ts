import { AccessItemShape } from "types/access-type";

const organField: AccessItemShape = {
  label: "سازمان",
  name: "organ",
  value: [
    {
      label: "شهرداری",
      name: 3,
    },
    {
      label: "سازمانها",
      name: 4,
    },
  ],
};

const yearField: AccessItemShape = {
  label: "سال",
  name: "year",
  value: [
    {
      label: "1401",
      name: 32,
    },
    {
      label: "1402",
      name: 33,
    },
  ],
};

const centerField: AccessItemShape = {
  label: "مرکز",
  name: "center",
  value: [
    {
      label: "با مرکز",
      name: 1,
    },
    {
      label: "بدون مرکز",
      name: 2,
    },
  ],
};

const budgetMethodField: AccessItemShape = {
  label: "نوع بودجه",
  name: "bodgetMethod",
  value: [
    {
      label: "درآمد/منابع",
      name: 1,
    },
    {
      label: "جاری / هزینه ای",
      name: 2,
    },
    {
      label: "عمرانی / سرمایه ای",
      name: 3,
    },
    {
      label: "مالی",
      name: 4,
    },
    {
      label: "دیون قطعی سنواتی",
      name: 5,
    },
  ],
};

const areaField: AccessItemShape = {
  label: "منطقه",
  name: "area",
  value: [
    {
      label: "درآمد/منابع",
      name: 1,
    },
    {
      label: "جاری / هزینه ای",
      name: 2,
    },
    {
      label: "عمرانی / سرمایه ای",
      name: 3,
    },
    {
      label: "مالی",
      name: 4,
    },
    {
      label: "دیون قطعی سنواتی",
      name: 5,
    },
  ],
};

export const ACCESS_CONFIG: AccessItemShape[] = [
  {
    label: "گزارش",
    name: "reportChartRevenue",
    value: [
      yearField,
      organField,
      centerField,
      budgetMethodField,
      { label: "درآمد", name: "revenue" },
      { label: "فروش اموال", name: "sale" },
      { label: "وام و اوراق", name: "loan" },
      { label: "نیابتی", name: "niabati" },
    ],
  },
  {
    label: "بودجه",
    name: "reportChartRevenue",
    value: [yearField, areaField, budgetMethodField],
  },
  {
    label: "بودجه",
    name: "reportChartRevenue",
    value: [yearField, areaField, budgetMethodField],
  },
  {
    label: "بودجه تفکیکی",
    name: "budgetSeprator",
    value: [yearField, areaField, budgetMethodField],
  },
  {
    label: "متولی ها",
    name: "reportProctorAbstruct",
    value: [yearField, areaField],
  },
  {
    label: "واسط سازمان ها",
    name: "transfer",
    value: [yearField, areaField, budgetMethodField],
  },
];
