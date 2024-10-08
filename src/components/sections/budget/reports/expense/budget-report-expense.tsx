import FixedTable from "components/data/table/fixed-table";
import { ReactNode, useState } from "react";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import BudgetReportExpenseForm from "./budget-report-expense-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { budgetDeviationApi } from "api/report/budget-deviation-api";
import { GetSingleBudgetDeviationItemShape } from "types/data/budget/budget-deviation-type";
import { budgetDeviationConfig } from "config/features/budget/report/budget-deviation-config";
import {
  getPercent,
  numberWithCommas,
  sumFieldsInSingleItemData,
} from "helper/calculate-utils";
import { budgetProjectOprationConfig } from "config/features/budget/report/budget-project-opration-config";
import { budgetReportExpenseConfig } from "config/features/budget/report/budget-report-expense-config";
import { budgetReportExpenseApi } from "api/report/budget-expense-api";
import { GetSingleBudgetExpenseReportItemShape } from "types/data/budget/budget-report-expense-type";
import { generalFieldsConfig } from "config/features/general-fields-config";
import FixedModal from "components/ui/modal/fixed-modal";
import BudgetReportExpenseModal from "./budget-report-expense-modal";

interface TableDataItemShape {
  number: ReactNode;
  projectName: ReactNode;
  projectCode: ReactNode;
  mosavab: ReactNode;
  expense: ReactNode;
}

interface BudgetReportExpenseProps {
  tabRender?: ReactNode;
}

function BudgetReportExpense(props: BudgetReportExpenseProps) {
  const { tabRender } = props;
  const [formData, setFormData] = useState({
    [budgetReportExpenseConfig.year]: undefined,
    [budgetReportExpenseConfig.organ]: undefined,
    [budgetReportExpenseConfig.month]: undefined,
    [generalFieldsConfig.numbers]: 1,
  });

  // head
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: <span style={{ whiteSpace: "nowrap" }}>مناطق/سازمانها</span>,
      colspan: 1,
      rowspan: 2,
      align: "center",
      sticky: true,
    },
    {
      title: "درآمد",
      colspan: 3,
      align: "center",
    },
    {
      title: "متمرکز",
      colspan: 3,
      align: "center",
    },
    {
      title: "دریافت از خزانه -  از محل متمرکز",
      colspan: 3,
      align: "center",
    },
    {
      title: "دریافت از خزانه -  از محل نیابتی",
      colspan: 3,
      align: "center",
    },
    {
      title: "منابع",
      colspan: 1,
      rowspan: 2,
      align: "center",
    },
    {
      title: "هزینه ای",
      colspan: 5,
      align: "center",
    },

    {
      title: "تملک سرمایه ای",
      colspan: 5,
      align: "center",
    },
    {
      title: "تملک مالی",
      colspan: 5,
      align: "center",
    },
    {
      title: "دیون سنواتی",
      colspan: 5,
      align: "center",
    },
    {
      title: "مانده",
      colspan: 1,
      rowspan: 2,
      align: "center",
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "عنوان",
      topTitle: "مناطق/سازمانها",
      name: "areaName",
      // align: "left",
      hiddenSelf: true,
      sticky: true,
    },

    // revenue
    {
      title: "مصوب",
      topTitle: "درآمد",
      name: "mosavabRevenue",
      split: true,
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expenseMonthRevenue",
      topTitle: "درآمد",
      split: true,
      align: "left",
    },
    {
      title: "%",
      name: "percentRevenue",
      topTitle: "درآمد",
      percent: true,
    },
    // motamerkez
    {
      title: "مصوب",
      name: "mosavabPayMotomarkez",
      topTitle: "متمرکز",
      split: true,
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expensePayMotomarkez",
      topTitle: "متمرکز",
      split: true,
      align: "left",
    },
    {
      title: "%",
      name: "percentPayMotomarkez",
      topTitle: "متمرکز",
      percent: true,
    },
    // khazane - 1
    {
      title: "مصوب",
      name: "mosavabDar_Khazane",
      split: true,
      topTitle: "دریافت از خزانه",
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expenseMonthDarAzKhazane",
      topTitle: "دریافت از خزانه",
      split: true,
      align: "left",
    },
    {
      title: "%",
      name: "percentDar_Khazane",
      topTitle: "دریافت از خزانه",
      percent: true,
      forceHaveBorder: true,
    },
    // khazane - 2
    {
      title: "مصوب",
      name: "mosavabNeyabati",
      split: true,
      topTitle: "دریافت از خزانه",
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expenseMonthNeyabati",
      topTitle: "دریافت از خزانه",
      split: true,
      align: "left",
    },
    {
      title: "%",
      name: "percentNeyabati",
      topTitle: "دریافت از خزانه",
      percent: true,
      forceHaveBorder: true,
    },
    // resources
    {
      title: "منابع",
      name: "resoures",
      align: "left",
      split: true,
      hiddenSelf: true,
    },
    // Current
    {
      title: "مصوب",
      name: "mosavabCurrent",
      topTitle: "هزینه ای",
      split: true,
      align: "left",
    },
    {
      title: "ت اعتبار",
      name: "creditCurrent",
      topTitle: "هزینه ای",
      split: true,
      align: "left",
    },
    {
      title: "%",
      name: "percentCreditCurrent",
      topTitle: "هزینه ای",
      percent: true,
    },
    {
      title: "عملکرد",
      name: "expenseMonthCurrent",
      topTitle: "هزینه ای",
      split: true,
      align: "left",
    },
    {
      title: "%",
      name: "percentCurrent",
      topTitle: "هزینه ای",
      percent: true,
    },

    // Civil
    {
      title: "مصوب",
      name: "mosavabCivil",
      topTitle: "تملک سرمایه ای",
      split: true,
      align: "left",
    },
    {
      title: "تامین اعتبار",
      name: "creditAmountCivil",
      topTitle: "تملک سرمایه ای",
      split: true,
      align: "left",
    },
    {
      title: "%",
      name: "percentCreditCivil",
      topTitle: "تملک سرمایه ای",
      percent: true,
      align: "left",
    },

    {
      title: "عملکرد",
      name: "expenseCivil",
      topTitle: "تملک سرمایه ای",
      split: true,
      align: "left",
    },
    {
      title: "%",
      name: "percentCivil",
      topTitle: "تملک سرمایه ای",
      percent: true,
    },
    // Financial
    {
      title: "مصوب",
      name: "mosavabFinancial",
      topTitle: "تملک مالی",
      split: true,
      align: "left",
    },

    {
      title: "ت اعتبار",
      name: "creditFinancial",
      topTitle: "تملک مالی",
      split: true,
      align: "left",
    },
    {
      title: "%",
      name: "percentCreditFinancial",
      topTitle: "تملک مالی",
      percent: true,
    },

    {
      title: "عملکرد",
      name: "expenseFinancial",
      topTitle: "تملک مالی",
      split: true,
      align: "left",
    },
    {
      title: "%",
      name: "percentFinancial",
      topTitle: "تملک مالی",
      percent: true,
    },
    // Sanavati
    {
      title: "مصوب",
      name: "mosavabSanavati",
      topTitle: "دیون سنواتی",
      split: true,
      align: "left",
    },
    {
      title: "ت اعتبار",
      name: "creditDoyonSanavati",
      topTitle: "تملک مالی",
      split: true,
      align: "left",
    },
    {
      title: "%",
      name: "percentDoyonSanavati",
      topTitle: "تملک مالی",
      percent: true,
    },
    {
      title: "عملکرد",
      name: "expenseSanavati",
      topTitle: "دیون سنواتی",
      split: true,
      align: "left",
    },
    {
      title: "%",
      topTitle: "دیون سنواتی",
      name: "percentSanavati",
      percent: true,
      forceHaveBorder: true,
    },
    // // motamerkez
    // {
    //   title: "مصوب",
    //   name: "mosavabPayMotomarkez",
    //   topTitle: "متمرکز",
    //   split: true,
    //   align: "left",
    // },
    // {
    //   title: "عملکرد",
    //   name: "expensePayMotomarkez",
    //   topTitle: "متمرکز",
    //   split: true,
    //   align: "left",
    // },
    // {
    //   title: "%",
    //   name: "percentPayMotomarkez",
    //   topTitle: "متمرکز",
    //   percent: true,
    // },
    // // khazane
    // {
    //   title: "مصوب",
    //   name: "mosavabDar_Khazane",
    //   split: true,
    //   topTitle: "دریافت از خزانه",
    //   align: "left",
    // },
    // {
    //   title: "عملکرد",
    //   name: "expenseDar_Khazane",
    //   topTitle: "دریافت از خزانه",
    //   split: true,
    //   align: "left",
    // },
    // {
    //   title: "%",
    //   name: "percentDar_Khazane",
    //   topTitle: "دریافت از خزانه",
    //   percent: true,
    //   forceHaveBorder: true,
    // },
    {
      title: "مانده",
      topTitle: "مانده",
      name: "balance",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
  ];
  // data
  const formatTableData = (
    unFormatData: GetSingleBudgetExpenseReportItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        "bgcolor-areaName": item.balance !== 0 && "#fcc2c2",
        number: i + 1,
      })
    );

    return formatedData;
  };

  const deviationQuery = useQuery(
    reactQueryKeys.budget.expense,
    () => budgetReportExpenseApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = formatTableData(deviationQuery.data?.data || []);

  // footer
  const sumMosavabRevenueShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabRevenue",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumExpenseRevenueShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expenseMonthRevenue",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumMosavabPayMotomarkezShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabPayMotomarkez",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumExpensePayMotomarkezShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expensePayMotomarkez",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumMosavabDar_KhazaneShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabDar_Khazane",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumExpenseDar_KhazaneShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expenseMonthDarAzKhazane",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumMosavabNeyabatiShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabNeyabati",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumExpenseNeyabatiShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expenseMonthNeyabati",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumResouresShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "resoures",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumExpenseCurrentShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expenseMonthCurrent",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumMosavabCurrentShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabCurrent",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumCreditCurrentShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "creditCurrent",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumMosavabCivilShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabCivil",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumCreditCivilShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "creditAmountCivil",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumExpenseCivilShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expenseCivil",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumMosavabFinancialShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabFinancial",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumExpenseFinancialShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expenseFinancial",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumCreditFinancialShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "creditFinancial",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumMosavabSanavatiShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabSanavati",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumExpenseSanvatiShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expenseSanavati",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumCreditSanvatiShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "creditDoyonSanavati",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumBalanceShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "balance",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const tableFooter: TableDataItemShape | any = {
    areaName: "جمع شهرداری",

    mosavabRevenue: sumMosavabRevenueShahrdari,
    expenseMonthRevenue: sumExpenseRevenueShahrdari,
    percentRevenue: getPercent(
      sumExpenseRevenueShahrdari,
      sumMosavabRevenueShahrdari
    ),

    mosavabPayMotomarkez: sumMosavabPayMotomarkezShahrdari,
    expensePayMotomarkez: sumExpensePayMotomarkezShahrdari,
    percentPayMotomarkez: getPercent(
      sumExpensePayMotomarkezShahrdari,
      sumMosavabPayMotomarkezShahrdari
    ),

    mosavabNeyabati: sumMosavabNeyabatiShahrdari,
    expenseMonthNeyabati: sumExpenseNeyabatiShahrdari,
    percentNeyabati: getPercent(
      sumExpenseNeyabatiShahrdari,
      sumMosavabNeyabatiShahrdari
    ),

    mosavabDar_Khazane: sumMosavabDar_KhazaneShahrdari,
    expenseMonthDarAzKhazane: sumExpenseDar_KhazaneShahrdari,
    percentDar_Khazane: getPercent(
      sumExpenseDar_KhazaneShahrdari,
      sumMosavabDar_KhazaneShahrdari
    ),

    resoures: sumResouresShahrdari,

    mosavabCurrent: sumMosavabCurrentShahrdari,
    expenseMonthCurrent: sumExpenseCurrentShahrdari,
    creditCurrent: sumCreditCurrentShahrdari,
    percentCreditCurrent: getPercent(
      sumCreditCurrentShahrdari,
      sumMosavabCurrentShahrdari
    ),
    percentCurrent: getPercent(
      sumExpenseCurrentShahrdari,
      sumMosavabCurrentShahrdari
    ),

    mosavabCivil: sumMosavabCivilShahrdari,
    expenseCivil: sumExpenseCivilShahrdari,
    percentCivil: getPercent(
      sumExpenseCivilShahrdari,
      sumMosavabCivilShahrdari
    ),
    creditAmountCivil: sumCreditCivilShahrdari,
    percentCreditCivil: getPercent(
      sumCreditCivilShahrdari,
      sumMosavabCivilShahrdari
    ),

    mosavabFinancial: sumMosavabFinancialShahrdari,
    creditFinancial: sumCreditFinancialShahrdari,
    percentCreditFinancial: getPercent(
      sumCreditFinancialShahrdari,
      sumMosavabFinancialShahrdari
    ),
    expenseFinancial: sumExpenseFinancialShahrdari,
    percentFinancial: getPercent(
      sumExpenseFinancialShahrdari,
      sumMosavabFinancialShahrdari
    ),

    mosavabSanavati: sumMosavabSanavatiShahrdari,
    creditDoyonSanavati: sumCreditSanvatiShahrdari,
    percentDoyonSanavati: getPercent(
      sumCreditSanvatiShahrdari,
      sumMosavabSanavatiShahrdari
    ),
    expenseSanavati: sumExpenseSanvatiShahrdari,
    percentSanavati: getPercent(
      sumExpenseSanvatiShahrdari,
      sumMosavabSanavatiShahrdari
    ),

    balance: sumBalanceShahrdari,
  };

  // sazman
  const sumMosavabRevenueSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabRevenue",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumExpenseRevenueSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expenseMonthRevenue",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumMosavabPayMotomarkezSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabPayMotomarkez",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumExpensePayMotomarkezSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expensePayMotomarkez",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumMosavabNeyabatiSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabNeyabati",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumExpenseNeyabatiSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expenseMonthNeyabati",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumMosavabDar_KhazaneSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabDar_Khazane",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumExpenseDar_KhazaneSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expenseMonthDarAzKhazane",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumResouresSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "resoures",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumExpenseCurrentSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expenseMonthCurrent",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumMosavabCurrentSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabCurrent",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumCreditCurrentSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "creditCurrent",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumMosavabCivilSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabCivil",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumCreditCivilSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "creditAmountCivil",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumExpenseCivilSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expenseCivil",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumMosavabFinancialSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabFinancial",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumExpenseFinancialSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expenseFinancial",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumCreditFinancialSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "creditFinancial",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumMosavabSanavatiSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabSanavati",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumExpenseSanvatiSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expenseSanavati",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumCreditSanvatiSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "creditDoyonSanavati",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumBalanceSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "balance",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const tableBottomFooter: TableDataItemShape | any = {
    areaName: "جمع سازمان",

    mosavabRevenue: sumMosavabRevenueSazman,
    expenseMonthRevenue: sumExpenseRevenueSazman,
    percentRevenue: getPercent(
      sumExpenseRevenueSazman,
      sumMosavabRevenueSazman
    ),

    mosavabNeyabati: sumMosavabNeyabatiSazman,
    expenseMonthNeyabati: sumExpenseNeyabatiSazman,
    percentNeyabati: getPercent(
      sumExpenseNeyabatiSazman,
      sumMosavabNeyabatiSazman
    ),

    mosavabPayMotomarkez: sumMosavabPayMotomarkezSazman,
    expensePayMotomarkez: sumExpensePayMotomarkezSazman,
    percentPayMotomarkez: getPercent(
      sumExpensePayMotomarkezSazman,
      sumMosavabPayMotomarkezSazman
    ),

    mosavabDar_Khazane: sumMosavabDar_KhazaneSazman,
    expenseMonthDarAzKhazane: sumExpenseDar_KhazaneSazman,
    percentDar_Khazane: getPercent(
      sumExpenseDar_KhazaneSazman,
      sumMosavabDar_KhazaneSazman
    ),

    resoures: sumResouresSazman,

    mosavabCurrent: sumMosavabCurrentSazman,
    expenseMonthCurrent: sumExpenseCurrentSazman,
    creditCurrent: sumCreditCurrentSazman,
    percentCreditCurrent: getPercent(
      sumCreditCurrentSazman,
      sumMosavabCurrentSazman
    ),
    percentCurrent: getPercent(
      sumExpenseCurrentSazman,
      sumMosavabCurrentSazman
    ),

    mosavabCivil: sumMosavabCivilSazman,
    expenseCivil: sumExpenseCivilSazman,
    percentCivil: getPercent(sumExpenseCivilSazman, sumMosavabCivilSazman),
    creditAmountCivil: sumCreditCivilSazman,
    percentCreditCivil: getPercent(sumCreditCivilSazman, sumMosavabCivilSazman),

    mosavabFinancial: sumMosavabFinancialSazman,
    creditFinancial: sumCreditFinancialSazman,
    percentCreditFinancial: getPercent(
      sumCreditFinancialSazman,
      sumMosavabFinancialSazman
    ),
    expenseFinancial: sumExpenseFinancialSazman,
    percentFinancial: getPercent(
      sumExpenseFinancialSazman,
      sumMosavabFinancialSazman
    ),

    mosavabSanavati: sumMosavabSanavatiSazman,
    creditDoyonSanavati: sumCreditSanvatiSazman,
    percentDoyonSanavati: getPercent(
      sumCreditSanvatiSazman,
      sumMosavabSanavatiSazman
    ),
    expenseSanavati: sumExpenseSanvatiSazman,
    percentSanavati: getPercent(
      sumExpenseSanvatiSazman,
      sumMosavabSanavatiSazman
    ),

    balance: sumBalanceSazman,
  };

  const sumMosavabRevenue =
    sumMosavabRevenueShahrdari + sumMosavabRevenueSazman;

  const sumExpenseRevenue =
    sumExpenseRevenueShahrdari + sumExpenseRevenueSazman;

  const sumMosavabNeyabati =
    sumMosavabNeyabatiShahrdari + sumMosavabNeyabatiSazman;
  const sumExpenseNeyabati =
    sumExpenseNeyabatiShahrdari + sumExpenseNeyabatiSazman;

  const sumMosavabPayMotomarkez =
    sumMosavabPayMotomarkezShahrdari + sumMosavabPayMotomarkezSazman;
  const sumExpensePayMotomarkez =
    sumExpensePayMotomarkezShahrdari + sumExpensePayMotomarkezSazman;

  const sumMosavabDar_Khazane =
    sumMosavabDar_KhazaneShahrdari + sumMosavabDar_KhazaneSazman;
  const sumExpenseDar_Khazane =
    sumExpenseDar_KhazaneShahrdari + sumExpenseDar_KhazaneSazman;

  const sumResoures = sumResouresShahrdari + sumResouresSazman;

  const sumMosavabCurrent =
    sumMosavabCurrentShahrdari + sumMosavabCurrentSazman;

  const sumExpenseCurrent =
    sumExpenseCurrentShahrdari + sumExpenseCurrentSazman;

  const sumCreditCurrent = sumCreditCurrentSazman + sumCreditCurrentShahrdari;

  const sumMosavabCivil = sumMosavabCivilShahrdari + sumMosavabCivilSazman;

  const sumExpenseCivil = sumExpenseCivilSazman + sumExpenseCivilShahrdari;

  const sumCreditCivil = sumCreditCivilSazman + sumCreditCivilShahrdari;

  const sumMosavabFinancial =
    sumMosavabFinancialShahrdari + sumMosavabFinancialSazman;

  const sumExpenseFinancial =
    sumExpenseFinancialSazman + sumExpenseFinancialShahrdari;

  const sumCreditFinancial =
    sumCreditFinancialShahrdari + sumCreditFinancialSazman;

  const sumMosavabSanavati =
    sumMosavabSanavatiSazman + sumMosavabSanavatiShahrdari;

  const sumExpenseSanvati =
    sumExpenseSanvatiSazman + sumExpenseSanvatiShahrdari;

  const sumCreditSanvati = sumCreditSanvatiShahrdari + sumCreditSanvatiSazman;

  const sumBalance = sumBalanceShahrdari + sumBalanceSazman;

  const tableMoreBottomFooter: TableDataItemShape | any = {
    areaName: "جمع کل",

    "bgcolor-areaName": sumBalance !== 0 && "#fcc2c2",

    "cellTitle-mosavabPayMotomarkez": numberWithCommas(
      sumMosavabPayMotomarkez - sumMosavabDar_Khazane
    ),
    "bgcolor-mosavabPayMotomarkez":
      sumMosavabPayMotomarkez !== sumMosavabDar_Khazane && "#d7a2a2",
    "bgcolor-mosavabDar_Khazane":
      sumMosavabPayMotomarkez !== sumMosavabDar_Khazane && "#d7a2a2",

    mosavabRevenue: sumMosavabRevenue,
    expenseMonthRevenue: sumExpenseRevenue,
    percentRevenue: getPercent(sumExpenseRevenue, sumMosavabRevenue),

    mosavabPayMotomarkez: sumMosavabPayMotomarkez,
    expensePayMotomarkez: sumExpensePayMotomarkez,
    percentPayMotomarkez: getPercent(
      sumExpensePayMotomarkez,
      sumMosavabPayMotomarkez
    ),

    mosavabNeyabati: sumMosavabNeyabati,
    expenseMonthNeyabati: sumExpenseNeyabati,
    percentNeyabati: getPercent(sumExpenseNeyabati, sumMosavabNeyabati),

    mosavabDar_Khazane: sumMosavabDar_Khazane,
    expenseMonthDarAzKhazane: sumExpenseDar_Khazane,
    percentDar_Khazane: getPercent(
      sumExpenseDar_Khazane,
      sumMosavabDar_Khazane
    ),

    resoures: sumResoures,

    mosavabCurrent: sumMosavabCurrent,
    expenseMonthCurrent: sumExpenseCurrent,
    creditCurrent: sumCreditCurrent,
    percentCreditCurrent: getPercent(sumCreditCurrent, sumMosavabCurrent),
    percentCurrent: getPercent(sumExpenseCurrent, sumMosavabCurrent),

    mosavabCivil: sumMosavabCivil,
    expenseCivil: sumExpenseCivil,
    percentCivil: getPercent(sumExpenseCivil, sumMosavabCivil),
    creditAmountCivil: sumCreditCivil,
    percentCreditCivil: getPercent(sumCreditCivil, sumMosavabCivil),

    mosavabFinancial: sumMosavabFinancial,
    creditFinancial: sumCreditFinancial,
    percentCreditFinancial: getPercent(sumCreditFinancial, sumMosavabFinancial),
    expenseFinancial: sumExpenseFinancial,
    percentFinancial: getPercent(sumExpenseFinancial, sumMosavabFinancial),

    mosavabSanavati: sumMosavabSanavati,
    creditDoyonSanavati: sumCreditSanvati,
    percentDoyonSanavati: getPercent(sumCreditSanvati, sumMosavabSanavati),
    expenseSanavati: sumExpenseSanvati,
    percentSanavati: getPercent(sumExpenseSanvati, sumMosavabSanavati),

    balance: sumBalance,
  };

  // head group
  const tableTopHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <BudgetReportExpenseForm
          formData={formData}
          setFormData={setFormData}
          tabRender={tabRender}
          printData={{
            data: tableData,
            footer: [tableFooter],
            bottomFooter: [tableBottomFooter],
            moreBottomFooter: [tableMoreBottomFooter],
          }}
        />
      ),
      colspan: tableHeads.length,
    },
  ];

  // detail modal
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [modalDetailTitle, setModalDetailTitle] = useState("");

  const detailMutation = useMutation(budgetReportExpenseApi.getDetailData);

  const handleClickCell = (whichColumn: string, row: any) => {
    setIsOpenDetailModal(true);

    const titleHead = tableHeads.find(
      (item) => item.name === whichColumn
    )?.topTitle;
    const title = `${row.areaName} - ${titleHead}`;
    setModalDetailTitle(title);

    detailMutation.mutate({
      columnName: whichColumn,
      areaId: row.id,
      yearId: formData[budgetReportExpenseConfig.year],
    });
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroups}
        topHeadGroups={tableTopHeadGroups}
        footer={tableFooter}
        bottomFooter={tableBottomFooter}
        moreBottomFooter={tableMoreBottomFooter}
        data={tableData}
        clickCell={handleClickCell}
      />

      <FixedModal
        open={isOpenDetailModal}
        handleClose={() => setIsOpenDetailModal(false)}
        loading={detailMutation.isLoading}
        title={modalDetailTitle}
        maxWidth="md"
      >
        <BudgetReportExpenseModal
          data={detailMutation.data?.data || []}
          formData={formData}
        />
      </FixedModal>
    </>
  );
}

export default BudgetReportExpense;
