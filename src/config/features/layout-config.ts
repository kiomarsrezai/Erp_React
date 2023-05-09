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
  {
    title: "گزارشات",
    icon: CircleIcon,
    items: [],
  },
  {
    title: "فرایندهای بودجه",
    icon: CircleIcon,
    items: [
      {
        title: "بودجه پیشنهادی",
        path: "/budget/proposal",
        icon: MoneyIcon,
        licenseName: accessNamesConfig.BUDGET_PROPOSAL_PAGE,
      },
      {
        title: "بودجه تفکیکی",
        path: "/budget/seprator",
        icon: PointOfSaleIcon,
        licenseName: accessNamesConfig.SEPRATOR_BUDGET_PAGE,
      },
      {
        title: "کدینگ بودجه",
        path: "/budget/coding",
        icon: CodeIcon,
        licenseName: accessNamesConfig.BUDGET_CODING_PAGE,
      },
      {
        title: "اصلاح بودجه",
        path: "/",
        icon: EditIcon,
        licenseName: accessNamesConfig.BUDGET_CODING_PAGE,
      },
      {
        title: "تفریغ بودجه",
        path: "/",
        icon: IndeterminateCheckBoxIcon,
        licenseName: accessNamesConfig.BUDGET_CODING_PAGE,
      },
      {
        title: "انتصاب",
        path: "/",
        icon: IndeterminateCheckBoxIcon,
        licenseName: accessNamesConfig.BUDGET_CODING_PAGE,
      },
      {
        title: "گزارشات بودجه",
        icon: SummarizeIcon,
        licenseName: accessNamesConfig.BUDGET_CODING_PAGE,
        items: [
          {
            title: "گزارش عملکرد",
            path: "/report/chart/revenue",
            icon: AssessmentIcon,
            licenseName: accessNamesConfig.REVENUE_CHART_PAGE,
          },
          {
            title: "گزارش متولی",
            path: "/report/proctor/abstract",
            icon: MonitorHeartIcon,
            licenseName: accessNamesConfig.ABSTRUCT_PROCTOR_PAGE,
          },
        ],
      },
    ],
  },
  {
    title: "امور قراردادها",
    icon: CircleIcon,
    items: [
      {
        title: "مدیریت قرارداد ها",
        icon: ManageSearchIcon,
        path: "/",
        licenseName: accessNamesConfig.ACCESS_PAGE,
      },
      {
        title: "گزارش قرارداد ها",
        icon: SummarizeIcon,
        path: "/",
        licenseName: accessNamesConfig.ACCESS_PAGE,
      },
    ],
  },
  {
    title: "امور مالی",
    icon: CircleIcon,
    items: [
      {
        title: "حساب های انتظامی",
        icon: CreditCardIcon,
        licenseName: accessNamesConfig.ACCESS_PAGE,
        path: "/",
      },
      {
        title: "سند حسابداری",
        icon: SummarizeIcon,
        licenseName: accessNamesConfig.ACCESS_PAGE,
        path: "/",
      },
      {
        title: "ممیزی",
        icon: SummarizeIcon,
        licenseName: accessNamesConfig.ACCESS_PAGE,
        path: "/",
      },
      {
        title: "درخواست وجه",
        icon: SummarizeIcon,
        licenseName: accessNamesConfig.ACCESS_PAGE,
        path: "/",
      },
      {
        title: "حسابرسی",
        icon: SummarizeIcon,
        licenseName: accessNamesConfig.ACCESS_PAGE,
        path: "/",
      },
      {
        title: "تراز",
        path: "/traz",
        icon: DesignServicesIcon,
        licenseName: accessNamesConfig.TRAZ_PAGE,
      },
      {
        title: "واسط کدینگ",
        path: "/transfer",
        icon: ApartmentIcon,
        licenseName: accessNamesConfig.TRANSFER_PAGE,
      },
    ],
  },
  //
  {
    title: "خزانه داری",
    icon: CircleIcon,
    items: [],
  },
  //
  {
    title: "انبار",
    icon: CircleIcon,
    items: [
      {
        title: "معرفی کدینگ کالا",
        icon: CircleIcon,
        licenseName: accessNamesConfig.ACCESS_PAGE,
        path: "/",
      },

      {
        title: "رسید انبار",
        icon: CircleIcon,
        licenseName: accessNamesConfig.ACCESS_PAGE,
        path: "/",
      },
      {
        title: "خروجی انبار",
        icon: CircleIcon,
        licenseName: accessNamesConfig.ACCESS_PAGE,
        path: "/",
      },
    ],
  },
  //
  {
    title: "اموال و دارایی ها",
    icon: CircleIcon,
    items: [
      {
        title: "وسایل نقلیه موتوری",
        icon: CircleIcon,
        licenseName: accessNamesConfig.ACCESS_PAGE,
        path: "/",
      },
      {
        title: "تاسیسات و تجهیزات",
        icon: CircleIcon,
        licenseName: accessNamesConfig.ACCESS_PAGE,
        path: "/",
      },
    ],
  },
  //
  {
    title: "کنترل پروژه",
    icon: CircleIcon,
    items: [
      {
        title: "برنامه عملیاتی",
        icon: CircleIcon,
        licenseName: accessNamesConfig.ACCESS_PAGE,
        path: "/",
      },
      {
        title: "پروژه ها",
        path: "/project/org",
        icon: AccountTreeIcon,
        licenseName: accessNamesConfig.PROJECT_ORG_PAGE,
      },
      {
        title: "جلسات",
        path: "/project/meetings",
        icon: GroupsIcon,
        licenseName: accessNamesConfig.PROJECT_MEETINGS_PAGE,
      },
    ],
  },
  //
  {
    title: "برنامه ریزی",
    icon: CircleIcon,
    items: [],
  },
  //
  {
    title: "املاک اختصاصی و آزادسازی",
    icon: CircleIcon,
    items: [
      {
        title: "معرفی املاک در مسیر",
        icon: CircleIcon,
        path: "/",
        licenseName: accessNamesConfig.ACCESS_PAGE,
      },
      {
        title: "املاک در اختیار شهرداری",
        icon: CircleIcon,
        path: "/",
        licenseName: accessNamesConfig.ACCESS_PAGE,
      },
      {
        title: "آزادسازی",
        icon: CircleIcon,
        path: "/",
        licenseName: accessNamesConfig.ACCESS_PAGE,
      },
      {
        title: "گزارشات",
        icon: CircleIcon,
        path: "/",
        licenseName: accessNamesConfig.ACCESS_PAGE,
      },
    ],
  },
  //
  {
    title: "نت دارایی های ثابت",
    icon: CircleIcon,
    items: [
      {
        title: "وسایل نقریه موتوری",
        icon: CircleIcon,
        licenseName: accessNamesConfig.ACCESS_PAGE,
        items: [
          {
            title: "تعمیرات",
            icon: CircleIcon,
            path: "/",
            licenseName: accessNamesConfig.ACCESS_PAGE,
          },
          {
            title: "سوخت",
            icon: CircleIcon,
            path: "/",
            licenseName: accessNamesConfig.ACCESS_PAGE,
          },
          {
            title: "بیمه",
            icon: CircleIcon,
            path: "/",
            licenseName: accessNamesConfig.ACCESS_PAGE,
          },
          {
            title: "خلافی",
            icon: CircleIcon,
            path: "/",
            licenseName: accessNamesConfig.ACCESS_PAGE,
          },
          {
            title: "معاینه فنی",
            icon: CircleIcon,
            path: "/",
            licenseName: accessNamesConfig.ACCESS_PAGE,
          },
        ],
      },
    ],
  },
  //
  {
    title: "انرژی",
    icon: CircleIcon,
    items: [
      {
        title: "آب",
        icon: CircleIcon,
        path: "/",
        licenseName: accessNamesConfig.ACCESS_PAGE,
      },
      {
        title: "برق",
        icon: CircleIcon,
        path: "/",
        licenseName: accessNamesConfig.ACCESS_PAGE,
      },
      {
        title: "گاز",
        icon: CircleIcon,
        path: "/",
        licenseName: accessNamesConfig.ACCESS_PAGE,
      },
    ],
  },
  // base info
  {
    title: "اطلاعات پایه",
    icon: CircleIcon,
    items: [
      {
        title: "دسترسی ها",
        path: "/access",
        icon: KeyIcon,
        licenseName: accessNamesConfig.ACCESS_PAGE,
      },
      {
        title: "ساختار",
        path: "/organization/posts",
        icon: AccountBalanceIcon,
        licenseName: accessNamesConfig.ORGANIZATION_POSTS_PAGE,
      },

      {
        title: "مخاطبین",
        icon: GroupsIcon,
        path: "/transfer",
        licenseName: accessNamesConfig.ACCESS_PAGE,
      },
      {
        title: "مناطق و سازمان ها",
        icon: GroupsIcon,
        path: "/",
        licenseName: accessNamesConfig.ACCESS_PAGE,
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
        path: "",
        icon: KeyIcon,
        licenseName: accessNamesConfig.ACCESS_PAGE,
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
