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
import BudgetReportsPage from "pages/budget/report/budget-report-page";
import BudgetConnectPage from "pages/budget/budget-connect-page";
import BudgetSepratorCreaditorPage from "pages/budget/seprator-creaditor-page";
import OrgProjectTablePage from "pages/project/table/org-table-page";
import BudgetEditPage from "pages/budget/budget-edit-page";
import ContractsTasks from "pages/contracts/contracts-tasks";
import PropertyMotor from "pages/property/property-motor";
import SomethingPage from "pages/base/something-page";
import UserPage from "pages/base/users-page";
import ContractsPlaces from "pages/contracts/contracts-places";
import ContractsMotaleb from "pages/contracts/contracts-motaleb";
import BudgetBeforeProposalPage from "pages/budget/beforeproposal-page";

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
        path: "/budget/BudgetProposal",
        icon: MoneyIcon,
        licenseName: accessNamesConfig.BUDGET__BeforePROPOSAL_PAGE,
        element: BudgetBeforeProposalPage,
        permissionItems: [
          getPermissionWithLevel(accessNamesConfig.FIELD_YEAR, 1),
          getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 1),
          accessNamesConfig.FIELD_BUDGET_METHOD,
        ],
      },
   
      
      
      
      {
        title: "بودجه مصوب",
        path: "/budget/mosavab",
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
          // accessNamesConfig.BUDGET__SEPRATOR_PAGE_INNER_TAMIN_BTN,
          accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_BTN,
          accessNamesConfig.BUDGET__SEPRATOR_PAGE_ACC_BTN,
          // accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_USER_BTN,
          // accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_SEARCH_BTN,
          // accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_USER_ADD_BTN,
          // accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_USER_EDIT_BTN,
          // accessNamesConfig.BUDGET__SEPRATOR_PAGE_EDIT_CODING_BTN,
          accessNamesConfig.BUDGET__SEPRATOR_PAGE_FIX_CODE,
          accessNamesConfig.BUDGET__SEPRATOR_PAGE_FIX_MOSAVAB,
        ],
      },
      // {
      //   title: "تفکیک اعتبار دهنده",
      //   path: "/budget/seprator-creaditor",
      //   icon: PointOfSaleIcon,
      //   licenseName: accessNamesConfig.BUDGET__SEPRATOR_CREADITOR_PAGE,
      //   element: BudgetSepratorCreaditorPage,
      //   permissionItems: [
      //     getPermissionWithLevel(accessNamesConfig.FIELD_YEAR, 1),
      //     getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 2),
      //     accessNamesConfig.FIELD_BUDGET_METHOD,
      //   ],
      // },
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
        path: "/budget-edit",
        icon: EditIcon,
        licenseName: accessNamesConfig.BUDGET__EDIT_PAGE,
        element: BudgetEditPage,
        permissionItems: [
          getPermissionWithLevel(accessNamesConfig.FIELD_YEAR, 1),
          getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 1),
          accessNamesConfig.FIELD_BUDGET_METHOD,
        ],
      },
      {
        title: "تفریغ بودجه",
        path: "/",
        icon: IndeterminateCheckBoxIcon,
        licenseName: accessNamesConfig.BUDGET__TAFRIGH_PAGE,
      },
      {
        title: "انتصاب",
        path: "/budget/connect",
        icon: IndeterminateCheckBoxIcon,
        licenseName: accessNamesConfig.BUDGET__ENTESAB_PAGE,
        element: BudgetConnectPage,
        permissionItems: [
          getPermissionWithLevel(accessNamesConfig.FIELD_YEAR, 1),
          getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 3),
          accessNamesConfig.FIELD_BUDGET_METHOD,
        ],
      },
    ],
  },
  {
    title: "گزارشات بودجه",
    path: "/budget/report",
    icon: AssessmentIcon,
    licenseName: accessNamesConfig.BUDGET__REPORT_PAGE,
    element: BudgetReportsPage,
    permissionItems: [
      accessNamesConfig.BUDGET__REPORT_PAGE_RAVAND,
      accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN,
      accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE,
      accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT,
      accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY,
      accessNamesConfig.BUDGET__REPORT_PAGE_DEVIATION,
      accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SORT,
      accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SCALE,
      accessNamesConfig.BUDGET__REPORT_PAGE_REQUEST_ANALYZE,
    ],
    // items: [
    // {
    //   title: "گزارشات",
    //   path: "/budget/report",
    //   icon: AssessmentIcon,
    //   licenseName: accessNamesConfig.BUDGET__REPORT_PAGE,
    //   element: BudgetReportsPage,
    //   permissionItems: [
    //     accessNamesConfig.BUDGET__REPORT_PAGE_RAVAND,
    //     accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE,
    //     accessNamesConfig.BUDGET__REPORT_PAGE_ABSTRUCT,
    //     accessNamesConfig.BUDGET__REPORT_PAGE_SUMMARY,
    //     accessNamesConfig.BUDGET__REPORT_PAGE_DEVIATION,
    //     accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SORT,
    //     accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SCALE,
    //   ],
    // },

    // {
    //   title: "گزارش متولی",
    //   path: "/report/abstract-proctor",
    //   icon: MonitorHeartIcon,
    //   licenseName: accessNamesConfig.BUDGET__REPORT__ABSTRUCT_PAGE,
    //   element: ReportProctorAbstructPage,
    //   permissionItems: [
    //     getPermissionWithLevel(accessNamesConfig.FIELD_YEAR, 1),
    //   ],
    // },
    // {
    //   title: "گزارش خلاصه بودجه",
    //   path: "/report/abstract-budget",
    //   icon: MonitorHeartIcon,
    //   licenseName: accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE,
    //   element: AbstructBudgetPage,
    //   permissionItems: [
    //     getPermissionWithLevel(accessNamesConfig.FIELD_YEAR, 1),
    //     accessNamesConfig.FIELD_ORGAN,
    //     accessNamesConfig.BUDGET__REPORT__ABSTRUCT_BUDGET_PAGE_KIND,
    //   ],
    // },
    // ],
  },
  // contracts
  {
    title: "قراردادها",
    icon: CircleIcon,
    items: [
      // {
      //   title: "مدیریت قرارداد ها",
      //   icon: ManageSearchIcon,
      //   path: "/",
      //   licenseName: accessNamesConfig.CONTRACT__MANAGE_PAGE,
      // },
      {
        title: "امور قرارداد ها",
        icon: SummarizeIcon,
        path: "/contracts/tasks",
        licenseName: accessNamesConfig.CONTRACT__REPORT_PAGE,
        element: ContractsTasks,
        permissionItems: [
          getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 3),
        ],
      },

      {
        title: "وصول مطالبات",
        icon: SummarizeIcon,
        path: "/contracts/get-motalbat",
        licenseName: accessNamesConfig.CONTRACT__GET_MOTALEB_PAGE,
        element: ContractsMotaleb,
        // permissionItems: [
        // getPermissionWithLevel(accessNamesConfig.FIELD_AREA, 3),
        // ],
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
          accessNamesConfig.FINANCIAL__CODING_PAGE_DELETE_CODE,
          accessNamesConfig.FINANCIAL__CODING_PAGE_DELETE_ROW,
          accessNamesConfig.FINANCIAL__CODING_PAGE_ADD,
          accessNamesConfig.FINANCIAL__CODING_PAGE_BALANCE,
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
        element: PropertyMotor,
        path: "/property/motor",
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
        title: "پروژه ها",
        path: "/project/org-table",
        icon: AccountTreeIcon,
        licenseName: accessNamesConfig.PROJECT__ORG_PAGE,
        element: OrgProjectTablePage,
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
        path: "/",
        icon: CircleIcon,
        licenseName: accessNamesConfig.ESTATE__INTRODUCTION_PAGE,
      },
      {
        title: "املاک اختصاصی شهرداری",
        icon: CircleIcon,
        path: "/places/private",
        licenseName: accessNamesConfig.ESTATE__POSSESSION_PAGE,
        element: ContractsPlaces,
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
        title: "کاربران",
        icon: GroupsIcon,
        path: "/base/users",
        licenseName: accessNamesConfig.BASE__USERS_LIST_PAGE,
        element: UserPage,
      },
      {
        title: "تاییدکنندگان درخواست ها",
        icon: GroupsIcon,
        path: "/base/departman-accepter",
        licenseName: accessNamesConfig.BASE__DEPARTMAN_ACCEPTER_PAGE,
        element: SomethingPage,
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
