import { FlotingLabelTextfieldItemsShape } from "types/input-type";

export const generalFieldsConfig = {
  YEAR: "yearId",
  AREA: "areaId",
  BUDGET_METHOD: "budgetprocessId",
  CENTER: "center",
};

export const centerItems: FlotingLabelTextfieldItemsShape = [
  {
    label: "با مرکز",
    value: 1,
  },
  {
    label: "بدون مرکز",
    value: 2,
  },
];

export const organItems: FlotingLabelTextfieldItemsShape = [
  {
    label: "شهرداری",
    value: 3,
  },
  {
    label: "سازمانها",
    value: 4,
  },
];

export const budgetMethodItems: FlotingLabelTextfieldItemsShape = [
  {
    label: "درآمد/منابع",
    value: 1,
  },
  {
    label: "جاری / هزینه ای",
    value: 2,
  },
  {
    label: "عمرانی / سرمایه ای",
    value: 3,
  },
  {
    label: "مالی",
    value: 4,
  },
  {
    label: "دیون قطعی سنواتی",
    value: 5,
  },
];
