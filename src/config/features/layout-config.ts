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
import ReportRevenueChartPage from "pages/report/chart/revenue-chart-page";
import ReportProctorAbstructPage from "pages/report/proctor/abstract-page";
import BudgetProposalPage from "pages/budget/proposal-page";
import BudgetSepratorPage from "pages/budget/seprator-page";
import BudgetCodingPage from "pages/budget/coding-page ";
import TransferPage from "pages/transfer/transfer-page";
import RequestCreditPage from "pages/credit/request-page";
import AccessPage from "pages/access-page";
import OrgProjectPage from "pages/project/org-page";
import MeetingsProjectPage from "pages/project/meetings-page";
import PostsOrganzationPage from "pages/organization/posts-page";
import TrazPage from "pages/traz/traz-page";
import { getPermissionWithLevel } from "helper/auth-utils";
import ProgramOperationProjectPage from "pages/project/program-operation-page";
import AbstructBudgetPage from "pages/report/budget/abstruct-budget-page";
import SuppliersPage from "pages/base/suppliers-page";

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
        element: BudgetProposalPage,
        permissionItems: [
          getPermissionWithLevel(accessNamesConfig.FIELD_YEAR, 1),
          getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 1),
          accessNamesConfig.FIELD_BUDGET_METHOD,
        ],
      },
      {
        title: "بودجه تفکیکی",
        path: "/budget/seprator",
        icon: PointOfSaleIcon,
        licenseName: accessNamesConfig.BUDGET__SEPRATOR_PAGE,
        element: BudgetSepratorPage,
        permissionItems: [
          getPermissionWithLevel(accessNamesConfig.FIELD_YEAR, 1),
          getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 2),
          accessNamesConfig.FIELD_BUDGET_METHOD,
          accessNamesConfig.BUDGET__SEPRATOR_PAGE_TAMIN_BTN,
        ],
      },
      {
        title: "کدینگ بودجه",
        path: "/budget/coding",
        icon: CodeIcon,
        licenseName: accessNamesConfig.BUDGET__CODING_PAGE,
        element: BudgetCodingPage,
        permissionItems: [accessNamesConfig.FIELD_BUDGET_METHOD],
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
        licenseName: accessNamesConfig.BUDGET__ENTESAB_PAGE,
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
            element: ReportRevenueChartPage,
            permissionItems: [
              getPermissionWithLevel(accessNamesConfig.FIELD_YEAR, 1),
              accessNamesConfig.FIELD_BUDGET_METHOD,
              accessNamesConfig.BUDGET__REPORT__EXPENSE_PAGE_CENTER,
              accessNamesConfig.FIELD_ORGAN,
            ],
          },
          {
            title: "گزارش متولی",
            path: "/report/abstract-proctor",
            icon: MonitorHeartIcon,
            licenseName: accessNamesConfig.BUDGET__REPORT__ABSTRUCT_PAGE,
            element: ReportProctorAbstructPage,
            permissionItems: [
              getPermissionWithLevel(accessNamesConfig.FIELD_YEAR, 1),
            ],
          },
          {
            title: "گزارش خلاصه بودجه",
            path: "/report/abstract-budget",
            icon: MonitorHeartIcon,
            licenseName: accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE,
            element: AbstructBudgetPage,
            permissionItems: [
              getPermissionWithLevel(accessNamesConfig.FIELD_YEAR, 1),
              accessNamesConfig.FIELD_ORGAN,
              accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE_KIND,
            ],
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
        element: TrazPage,
        permissionItems: [
          getPermissionWithLevel(accessNamesConfig.FIELD_YEAR, 2),
          getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 2),
          accessNamesConfig.FINANCIAL__TARAZ_PAGE_KIND,
        ],
      },
      {
        title: "واسط کدینگ",
        path: "/transfer",
        icon: ApartmentIcon,
        licenseName: accessNamesConfig.FINANCIAL__CODING_PAGE,
        element: TransferPage,
        permissionItems: [
          getPermissionWithLevel(accessNamesConfig.FIELD_YEAR, 1),
          getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 2),
          accessNamesConfig.FIELD_BUDGET_METHOD,
        ],
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
        path: "/project/program",
        element: ProgramOperationProjectPage,
        permissionItems: [
          accessNamesConfig.PROJECT__PLAN_PAGE_PROGRAM,
          getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 3),
        ],
      },
      {
        title: "پروژه ها",
        path: "/project/org",
        icon: AccountTreeIcon,
        licenseName: accessNamesConfig.PROJECT__ORG_PAGE,
        element: OrgProjectPage,
      },
      {
        title: "جلسات",
        path: "/project/meetings",
        icon: GroupsIcon,
        licenseName: accessNamesConfig.PROJECT__MEETINGS_PAGE,
        element: MeetingsProjectPage,
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
        element: AccessPage,
      },
      {
        title: "ساختار",
        path: "/organization/posts",
        icon: AccountBalanceIcon,
        licenseName: accessNamesConfig.BASE__STRUCTURE_PAGE,
        element: PostsOrganzationPage,
        permissionItems: [
          getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 2),
        ],
      },

      {
        title: "مخاطبین",
        icon: GroupsIcon,
        path: "/base/suppliers",
        licenseName: accessNamesConfig.BASE__USERS_PAGE,
        element: SuppliersPage,
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
    element: RequestCreditPage,
  },
];
