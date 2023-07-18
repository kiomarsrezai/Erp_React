import FixedTable from "components/data/table/fixed-table";
import { ReactNode, useState } from "react";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import BudgetReportExpenseForm from "./budget-report-expense-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { budgetDeviationApi } from "api/report/budget-deviation-api";
import { GetSingleBudgetDeviationItemShape } from "types/data/budget/budget-deviation-type";
import { budgetDeviationConfig } from "config/features/budget/report/budget-deviation-config";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
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
      title: "مناطق/سازمانها",
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
    // {
    //   title: "سهم متمرکز",
    //   colspan: 1,
    //   rowspan: 2,
    //   align: "center",
    // },
    // {
    //   title: "دریافت از خزانه",
    //   colspan: 1,
    //   rowspan: 2,
    //   align: "center",
    // },
    // {
    //   title: "منابع",
    //   colspan: 1,
    //   rowspan: 2,
    //   align: "center",
    // },
    {
      title: "هزینه ای",
      colspan: 3,
      align: "center",
    },

    {
      title: "تملک سرمایه ای",
      colspan: 5,
      align: "center",
    },
    {
      title: "تملک مالی",
      colspan: 3,
      align: "center",
    },
    {
      title: "دیون سنواتی",
      colspan: 3,
      align: "center",
    },
    // {
    //   title: "متمرکز",
    //   colspan: 3,
    //   align: "center",
    // },
    // {
    //   title: "دریافت از خزانه",
    //   colspan: 3,
    //   align: "center",
    // },
    // {
    //   title: "مانده",
    //   colspan: 1,
    //   rowspan: 2,
    //   align: "center",
    // },
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
      name: "expenseRevenue",
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
    // {
    //   title: "سهم متمرکز",
    //   name: "mosavabPayMotomarkez",
    //   split: true,
    //   align: "left",
    //   hiddenSelf: true,
    // },
    // {
    //   title: "دریافت از خزانه",
    //   name: "mosavabDar_Khazane",
    //   split: true,
    //   align: "left",
    //   hiddenSelf: true,
    // },
    // {
    //   title: "منابع",
    //   name: "resoures",
    //   align: "left",
    //   split: true,
    //   hiddenSelf: true,
    // },
    // Current
    {
      title: "مصوب",
      name: "mosavabCurrent",
      topTitle: "هزینه ای",
      split: true,
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expenseCurrent",
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
    },
    // motamerkez
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
    // {
    //   title: "مانده",
    //   topTitle: "مانده",
    //   name: "balance",
    //   split: true,
    //   align: "left",
    //   hiddenSelf: true,
    // },
  ];
  // data
  const formatTableData = (
    unFormatData: GetSingleBudgetExpenseReportItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
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
    "expenseRevenue",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumExpenseCurrentShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expenseCurrent",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id <= 10
  );

  const sumMosavabCurrentShahrdari = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabCurrent",
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

  const sumMosavabRevenueSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabRevenue",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumExpenseRevenueSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expenseRevenue",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumExpenseCurrentSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "expenseCurrent",
    (item: GetSingleBudgetExpenseReportItemShape) => item.id > 10
  );

  const sumMosavabCurrentSazman = sumFieldsInSingleItemData(
    deviationQuery.data?.data,
    "mosavabCurrent",
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

  const tableFooter: TableDataItemShape | any = {
    areaName: "جمع شهرداری",

    mosavabRevenue: sumMosavabRevenueShahrdari,
    expenseRevenue: sumExpenseRevenueShahrdari,
    percentRevenue: getPercent(
      sumExpenseRevenueShahrdari,
      sumMosavabRevenueShahrdari
    ),

    mosavabCurrent: sumMosavabCurrentShahrdari,
    expenseCurrent: sumExpenseCurrentShahrdari,
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
    expenseFinancial: sumExpenseFinancialShahrdari,
    percentFinancial: getPercent(
      sumExpenseFinancialShahrdari,
      sumMosavabFinancialShahrdari
    ),

    mosavabSanavati: sumMosavabSanavatiShahrdari,
    expenseSanavati: sumExpenseSanvatiShahrdari,
    percentSanavati: getPercent(
      sumExpenseSanvatiShahrdari,
      sumMosavabSanavatiShahrdari
    ),

    // mosavabPayMotomarkez: sum_mosavabPayMotomarkez,
    // expensePayMotomarkez: sum_expensePayMotomarkez,
    // percentPayMotomarkez: sum_percentPayMotomarkez,

    // mosavabDar_Khazane: sum_mosavabDar_Khazane,
    // expenseDar_Khazane: sum_expenseDar_Khazane,
    // percentDar_Khazane: sum_percentDar_Khazane,

    // balance: sum_balance,
  };

  const tableBottomFooter: TableDataItemShape | any = {
    areaName: "جمع سازمان",

    mosavabRevenue: sumMosavabRevenueSazman,
    expenseRevenue: sumExpenseRevenueSazman,
    percentRevenue: getPercent(
      sumExpenseRevenueSazman,
      sumMosavabRevenueSazman
    ),

    mosavabCurrent: sumMosavabCurrentSazman,
    expenseCurrent: sumExpenseCurrentSazman,
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
    expenseFinancial: sumExpenseFinancialSazman,
    percentFinancial: getPercent(
      sumExpenseFinancialSazman,
      sumMosavabFinancialSazman
    ),

    mosavabSanavati: sumMosavabSanavatiSazman,
    expenseSanavati: sumExpenseSanvatiSazman,
    percentSanavati: getPercent(
      sumExpenseSanvatiSazman,
      sumMosavabSanavatiSazman
    ),

    // mosavabPayMotomarkez: sum_mosavabPayMotomarkez,
    // expensePayMotomarkez: sum_expensePayMotomarkez,
    // percentPayMotomarkez: sum_percentPayMotomarkez,

    // mosavabDar_Khazane: sum_mosavabDar_Khazane,
    // expenseDar_Khazane: sum_expenseDar_Khazane,
    // percentDar_Khazane: sum_percentDar_Khazane,

    // balance: sum_balance,
  };

  const sumMosavabRevenue =
    sumMosavabRevenueShahrdari + sumMosavabRevenueSazman;

  const sumExpenseRevenue =
    sumExpenseRevenueShahrdari + sumExpenseRevenueSazman;

  const sumMosavabCurrent =
    sumMosavabCurrentShahrdari + sumMosavabCurrentSazman;

  const sumExpenseCurrent =
    sumExpenseCurrentShahrdari + sumExpenseCurrentSazman;

  const sumMosavabCivil = sumMosavabCivilShahrdari + sumMosavabCivilSazman;

  const sumExpenseCivil = sumExpenseCivilSazman + sumExpenseCivilShahrdari;

  const sumCreditCivil = sumCreditCivilSazman + sumCreditCivilShahrdari;

  const sumMosavabFinancial =
    sumMosavabFinancialShahrdari + sumMosavabFinancialSazman;

  const sumExpenseFinancial =
    sumExpenseFinancialSazman + sumExpenseFinancialShahrdari;

  const sumMosavabSanavati =
    sumMosavabSanavatiSazman + sumMosavabSanavatiShahrdari;

  const sumExpenseSanvati =
    sumExpenseSanvatiSazman + sumExpenseSanvatiShahrdari;

  const tableMoreBottomFooter: TableDataItemShape | any = {
    areaName: "جمع کل",

    mosavabRevenue: sumMosavabRevenue,
    expenseRevenue: sumExpenseRevenue,
    percentRevenue: getPercent(sumExpenseRevenue, sumMosavabRevenue),

    mosavabCurrent: sumMosavabCurrent,
    expenseCurrent: sumExpenseCurrent,
    percentCurrent: getPercent(sumExpenseCurrent, sumMosavabCurrent),

    mosavabCivil: sumMosavabCivil,
    expenseCivil: sumExpenseCivil,
    percentCivil: getPercent(sumExpenseCivil, sumMosavabCivil),
    creditAmountCivil: sumCreditCivil,
    percentCreditCivil: getPercent(sumCreditCivil, sumMosavabCivil),

    mosavabFinancial: sumMosavabFinancial,
    expenseFinancial: sumExpenseFinancial,
    percentFinancial: getPercent(sumExpenseFinancial, sumMosavabFinancial),

    mosavabSanavati: sumMosavabSanavati,
    expenseSanavati: sumExpenseSanvati,
    percentSanavati: getPercent(sumExpenseSanvati, sumMosavabSanavati),

    // mosavabPayMotomarkez: sum_mosavabPayMotomarkez,
    // expensePayMotomarkez: sum_expensePayMotomarkez,
    // percentPayMotomarkez: sum_percentPayMotomarkez,

    // mosavabDar_Khazane: sum_mosavabDar_Khazane,
    // expenseDar_Khazane: sum_expenseDar_Khazane,
    // percentDar_Khazane: sum_percentDar_Khazane,

    // balance: sum_balance,
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
