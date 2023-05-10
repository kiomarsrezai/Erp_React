import CreditCardIcon from "@mui/icons-material/CreditCard";
import KeyIcon from "@mui/icons-material/Key";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import GroupsIcon from "@mui/icons-material/Groups";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CodeIcon from "@mui/icons-material/Code";
import AssessmentIcon from "@mui/icons-material/Assessment";
import MoneyIcon from "@mui/icons-material/Money";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CircleIcon from "@mui/icons-material/Circle";
import EditIcon from "@mui/icons-material/Edit";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

import { accessNamesConfig } from "config/access-names-config";
import { SidenavShape } from "types/layout-type";

export const sidenavsLayout: SidenavShape[] = [
  // report
  {
    title: "گزارشات",
    icon: CircleIcon,
    items: [
      {
        title: "گزارش بر اساس درصد",
        icon: CreditCardIcon,
        licenseName: accessNamesConfig.REPORT__PERCENT_PAGE,
        path: "/",
      },
    ],
  },
  // budget
  {
    title: "فرایندهای بودجه",
    icon: CircleIcon,
    items: [
      {
        title: "بودجه پیشنهادی",
        path: "/budget/proposal",
        icon: MoneyIcon,
        licenseName: accessNamesConfig.BUDGET__PROPOSAL_PAGE,
      },
      {
        title: "بودجه تفکیکی",
        path: "/budget/seprator",
        icon: PointOfSaleIcon,
        licenseName: accessNamesConfig.BUDGET__SEPRATOR_PAGE,
      },
      {
        title: "کدینگ بودجه",
        path: "/budget/coding",
        icon: CodeIcon,
        licenseName: accessNamesConfig.BUDGET__CODING_PAGE,
      },
      {
        title: "اصلاح بودجه",
        path: "/",
        icon: EditIcon,
        licenseName: accessNamesConfig.BUDGET__EDIT_PAGE,
      },
      {
        title: "تفریغ بودجه",
        path: "/",
        icon: IndeterminateCheckBoxIcon,
        licenseName: accessNamesConfig.BUDGET__TAFRIGH_PAGE,
      },
      {
        title: "انتصاب",
        path: "/",
        icon: IndeterminateCheckBoxIcon,
        licenseName: accessNamesConfig.BUDGET__TAFRIGH_PAGE,
      },
      {
        title: "گزارشات بودجه",
        icon: SummarizeIcon,
        items: [
          {
            title: "گزارش عملکرد",
            path: "/report/chart/revenue",
            icon: AssessmentIcon,
            licenseName: accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE,
          },
          {
            title: "گزارش متولی",
            path: "/report/proctor/abstract",
            icon: MonitorHeartIcon,
            licenseName: accessNamesConfig.BUDGET__REPORT__ABSTRUCT_PAGE,
          },
        ],
      },
    ],
  },
  // contracts
  {
    title: "امور قراردادها",
    icon: CircleIcon,
    items: [
      {
        title: "مدیریت قرارداد ها",
        icon: ManageSearchIcon,
        path: "/",
        licenseName: accessNamesConfig.CONTRACT__MANAGE_PAGE,
      },
      {
        title: "گزارش قرارداد ها",
        icon: SummarizeIcon,
        path: "/",
        licenseName: accessNamesConfig.CONTRACT__REPORT_PAGE,
      },
    ],
  },
  // financial
  {
    title: "امور مالی",
    icon: CircleIcon,
    items: [
      {
        title: "حساب های انتظامی",
        icon: CreditCardIcon,
        licenseName: accessNamesConfig.FINANCIAL__ACCOUNTS_PAGE,
        path: "/",
      },
      {
        title: "سند حسابداری",
        icon: SummarizeIcon,
        licenseName: accessNamesConfig.FINANCIAL__DOCUMENT_PAGE,
        path: "/",
      },
      {
        title: "ممیزی",
        icon: SummarizeIcon,
        licenseName: accessNamesConfig.FINANCIAL__INSPECTOR_PAGE,
        path: "/",
      },
      {
        title: "درخواست وجه",
        icon: SummarizeIcon,
        licenseName: accessNamesConfig.FINANCIAL__REQUEST_PAGE,
        path: "/",
      },
      {
        title: "حسابرسی",
        icon: SummarizeIcon,
        licenseName: accessNamesConfig.FINANCIAL__AUDIT_PAGE,
        path: "/",
      },
      {
        title: "تراز",
        path: "/traz",
        icon: DesignServicesIcon,
        licenseName: accessNamesConfig.FINANCIAL__TARAZ_PAGE,
      },
      {
        title: "واسط کدینگ",
        path: "/transfer",
        icon: ApartmentIcon,
        licenseName: accessNamesConfig.FINANCIAL__CODING_PAGE,
      },
    ],
  },
  // treasury
  {
    title: "خزانه داری",
    icon: CircleIcon,
    items: [
      {
        title: "درخواست وجه",
        icon: CreditCardIcon,
        licenseName: accessNamesConfig.TREASURY__REQUEST_PAGE,
        path: "/",
      },
    ],
  },
  // store
  {
    title: "انبار",
    icon: CircleIcon,
    items: [
      {
        title: "معرفی کدینگ کالا",
        icon: CircleIcon,
        licenseName: accessNamesConfig.STORE__CODING_PAGE,
        path: "/",
      },

      {
        title: "رسید انبار",
        icon: CircleIcon,
        licenseName: accessNamesConfig.STORE__DOCUMENT_PAGE,
        path: "/",
      },
      {
        title: "خروجی انبار",
        icon: CircleIcon,
        licenseName: accessNamesConfig.STORE__OUTPUT_PAGE,
        path: "/",
      },
    ],
  },
  // property
  {
    title: "اموال و دارایی ها",
    icon: CircleIcon,
    items: [
      {
        title: "وسایل نقلیه موتوری",
        icon: CircleIcon,
        licenseName: accessNamesConfig.PROPERTY__MOTOR_PAGE,
        path: "/",
      },
      {
        title: "تاسیسات و تجهیزات",
        icon: CircleIcon,
        licenseName: accessNamesConfig.PROPERTY__INSTALLATION_PAGE,
        path: "/",
      },
    ],
  },
  // project
  {
    title: "کنترل پروژه",
    icon: CircleIcon,
    items: [
      {
        title: "برنامه عملیاتی",
        icon: CircleIcon,
        licenseName: accessNamesConfig.PROJECT__PLAN_PAGE,
        path: "/",
      },
      {
        title: "پروژه ها",
        path: "/project/org",
        icon: AccountTreeIcon,
        licenseName: accessNamesConfig.PROJECT__ORG_PAGE,
      },
      {
        title: "جلسات",
        path: "/project/meetings",
        icon: GroupsIcon,
        licenseName: accessNamesConfig.PROJECT__MEETINGS_PAGE,
      },
    ],
  },
  // plans
  {
    title: "برنامه ریزی",
    icon: CircleIcon,
    items: [
      {
        title: "شاخص",
        icon: CreditCardIcon,
        licenseName: accessNamesConfig.PLANS__INDICATOR_PAGE,
        path: "/",
      },
    ],
  },
  // estate
  {
    title: "املاک اختصاصی و آزادسازی",
    icon: CircleIcon,
    items: [
      {
        title: "معرفی املاک در مسیر",
        icon: CircleIcon,
        path: "/",
        licenseName: accessNamesConfig.ESTATE__INTRODUCTION_PAGE,
      },
      {
        title: "املاک در اختیار شهرداری",
        icon: CircleIcon,
        path: "/",
        licenseName: accessNamesConfig.ESTATE__POSSESSION_PAGE,
      },
      {
        title: "آزادسازی",
        icon: CircleIcon,
        path: "/",
        licenseName: accessNamesConfig.ESTATE__FREE_PAGE,
      },
      {
        title: "گزارشات",
        icon: CircleIcon,
        path: "/",
        licenseName: accessNamesConfig.ESTATE__REPORTS_PAGE,
      },
    ],
  },
  // stable
  {
    title: "نت دارایی های ثابت",
    icon: CircleIcon,
    items: [
      {
        title: "وسایل نقریه موتوری",
        icon: CircleIcon,
        items: [
          {
            title: "تعمیرات",
            icon: CircleIcon,
            path: "/",
            licenseName: accessNamesConfig.STABLE__MOTOR__EDIT_PAGE,
          },
          {
            title: "سوخت",
            icon: CircleIcon,
            path: "/",
            licenseName: accessNamesConfig.STABLE__MOTOR__FUEL_PAGE,
          },
          {
            title: "بیمه",
            icon: CircleIcon,
            path: "/",
            licenseName: accessNamesConfig.STABLE__MOTOR__INSURANCE_PAGE,
          },
          {
            title: "خلافی",
            icon: CircleIcon,
            path: "/",
            licenseName: accessNamesConfig.STABLE__MOTOR__FOUL_PAGE,
          },
          {
            title: "معاینه فنی",
            icon: CircleIcon,
            path: "/",
            licenseName: accessNamesConfig.STABLE__MOTOR__EXAMINATION_PAGE,
          },
        ],
      },
    ],
  },
  // energy
  {
    title: "انرژی",
    icon: CircleIcon,
    items: [
      {
        title: "آب",
        icon: CircleIcon,
        path: "/",
        licenseName: accessNamesConfig.ENERGY__WATER_PAGE,
      },
      {
        title: "برق",
        icon: CircleIcon,
        path: "/",
        licenseName: accessNamesConfig.ENERGY__ELECTEICITY_PAGE,
      },
      {
        title: "گاز",
        icon: CircleIcon,
        path: "/",
        licenseName: accessNamesConfig.ENERGY__GAS_PAGE,
      },
    ],
  },
  // base
  {
    title: "اطلاعات پایه",
    icon: CircleIcon,
    items: [
      {
        title: "دسترسی ها",
        path: "/access",
        icon: KeyIcon,
        licenseName: accessNamesConfig.BASE__ACCESS_PAGE,
      },
      {
        title: "ساختار",
        path: "/organization/posts",
        icon: AccountBalanceIcon,
        licenseName: accessNamesConfig.BASE__STRUCTURE_PAGE,
      },

      {
        title: "مخاطبین",
        icon: GroupsIcon,
        path: "/",
        licenseName: accessNamesConfig.BASE__USERS_PAGE,
      },
      {
        title: "مناطق و سازمان ها",
        icon: GroupsIcon,
        path: "/",
        licenseName: accessNamesConfig.BASE__ORGAN_PAGE,
      },
    ],
  },

  // others
  {
    title: "سایر",
    icon: CircleIcon,
    items: [
      {
        title: "استیجاری ها",
        path: "/",
        icon: KeyIcon,
        licenseName: accessNamesConfig.OTHERS__RENTAL_PAGE,
      },
    ],
  },

  //
  {
    title: "درخواست اعتبار",
    path: "/credit/request",
    icon: CreditCardIcon,
    licenseName: accessNamesConfig.CREDIT_REQUEST_PAGE,
  },
];
