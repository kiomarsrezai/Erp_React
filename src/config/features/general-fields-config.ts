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
  MONTH: "monthId",
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

export const organItems2: FlotingLabelTextfieldItemsShape = [
  {
    label: "شهرداری",
    value: 1,
  },
  {
    label: "سازمانها",
    value: 2,
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
    label: "درآمد",
    value: 1,
  },
  {
    label: "هزینه ای",
    value: 2,
  },
  {
    label: "تملک سرمایه ای",
    value: 3,
  },
  {
    label: "تملک مالی",
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
    label: "دریافت از خزانه / نیابتی",
    value: 9,
  },
  {
    label: "دریافت از خزانه / متمرکز",
    value: 10,
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
    label: "نمودار عملکرد",
    value: 1,
  },
  {
    label: "عملکرد ماهیانه",
    value: 8,
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
    label: "ابعاد اجرای پروژه",
    value: 6,
  },
  {
    label: "تامین اعتبار",
    value: 9,
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

export const budgetAnalyzeKindItems: FlotingLabelTextfieldItemsShape = [
  {label: 'راکد', value: 1},
  {label: 'بدون ثبت هزینه', value: 2},
  {label: 'در جریان', value: 3},
  {label: 'بیشتر از تامین اعتبار', value: 4},
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

export const monthItems: FlotingLabelTextfieldItemsShape = [
  {
    label: "فروردین",
    value: 1,
  },
  {
    label: "اردیبهشت",
    value: 2,
  },
  {
    label: "خرداد",
    value: 3,
  },
  {
    label: "تیر",
    value: 4,
  },
  {
    label: "مرداد",
    value: 5,
  },
  {
    label: "شهریور",
    value: 6,
  },
  {
    label: "مهر",
    value: 7,
  },
  {
    label: "آبان",
    value: 8,
  },
  {
    label: "آذر",
    value: 9,
  },
  {
    label: "دی",
    value: 10,
  },
  {
    label: "بهمن",
    value: 11,
  },
  {
    label: "اسفند",
    value: 12,
  },
];

export const ganderItems: FlotingLabelTextfieldItemsShape = [
  {
    label: "مرد",
    value: 1,
  },
  {
    label: "زن",
    value: 2,
  },
];
