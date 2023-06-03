import { FlotingLabelTextfieldItemsShape } from "types/input-type";

export const generalFieldsConfig = {
  YEAR: "yearId",
  AREA: "areaId",
  BUDGET_METHOD: "budgetprocessId",
  CENTER: "center",
  ORGAN: "structureId",
  PROCTOR: "proctorId",
  numbers: "numbers",
  kind: "kindId",
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
    label: "ریال",
    value: 1,
  },
  {
    label: "هزار ریال",
    value: 2,
  },
  {
    label: "میلیون ریال",
    value: 3,
  },
  {
    label: "میلیارد ریال",
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

export const budgetSortKindItems: FlotingLabelTextfieldItemsShape = [
  {
    label: "تفضیلی کد بودجه",
    value: 1,
  },
  {
    label: "تجمیعی کد بودجه",
    value: 2,
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
  {
    label: "انحراف بودجه",
    value: 5,
  },
  {
    label: "سهم ردیف های بودجه",
    value: 7,
  },
  {
    label: "مقیاس پروژه",
    value: 6,
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

export const budgetKindDeviationItems: FlotingLabelTextfieldItemsShape = [
  {
    label: "تا سقف 10 %",
    value: 1,
  },
  {
    label: "بیش از 10 %",
    value: 2,
  },
  {
    label: "هر دو",
    value: 3,
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
