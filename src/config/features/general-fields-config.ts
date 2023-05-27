import { FlotingLabelTextfieldItemsShape } from "types/input-type";

export const generalFieldsConfig = {
  YEAR: "yearId",
  AREA: "areaId",
  BUDGET_METHOD: "budgetprocessId",
  CENTER: "center",
  ORGAN: "structureId",
  PROCTOR: "proctorId",
  numbers: "numbers",
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

export const numbersItems: FlotingLabelTextfieldItemsShape = [
  {
    label: "یک",
    value: 1,
  },
  {
    label: "هزار",
    value: 2,
  },
  {
    label: "میلیون",
    value: 3,
  },
  {
    label: "میلیارد",
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
  {
    label: "پرداخت متمرکز",
    value: 8,
  },
  {
    label: "دریافت از خزانه",
    value: 9,
  },
];

export const budgetReportItems: FlotingLabelTextfieldItemsShape = [
  {
    label: "گزارش عملکرد",
    value: 1,
  },
  {
    label: "روند مناطق و سازمان ها",
    value: 2,
  },
  {
    label: "متولی",
    value: 3,
  },
  {
    label: "خلاصه بودجه",
    value: 4,
  },
];

export const budgetKindItems: FlotingLabelTextfieldItemsShape = [
  {
    label: "بودجه مصوب",
    value: 1,
  },
  {
    label: "اصلاح بودجه",
    value: 2,
  },
];

export const trazKindItems: FlotingLabelTextfieldItemsShape = [
  {
    label: "درآمد",
    value: 1,
  },
  {
    label: "هزینه",
    value: 2,
  },
  {
    label: "حساب های دائمی",
    value: 3,
  },
];
