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
    {
      title: "متمرکز",
      colspan: 3,
      align: "center",
    },
    {
      title: "دریافت از خزانه",
      colspan: 3,
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
      align: "left",
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
    // khazane
    {
      title: "مصوب",
      name: "mosavabDar_Khazane",
      split: true,
      topTitle: "دریافت از خزانه",
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expenseDar_Khazane",
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
  const sum_mosavabRevenue = sumFieldsInSingleItemData(
    tableData,
    "mosavabRevenue"
  );
  const sum_expenseRevenue = sumFieldsInSingleItemData(
    tableData,
    "expenseRevenue"
  );
  const sum_percentRevenue = getPercent(sum_expenseRevenue, sum_mosavabRevenue);

  const sum_mosavabCurrent = sumFieldsInSingleItemData(
    tableData,
    "mosavabCurrent"
  );
  const sum_expenseCurrent = sumFieldsInSingleItemData(
    tableData,
    "expenseCurrent"
  );
  const sum_percentCurrent = getPercent(sum_expenseCurrent, sum_mosavabCurrent);

  const sum_mosavabCivil = sumFieldsInSingleItemData(tableData, "mosavabCivil");
  const sum_creditAmountCivil = sumFieldsInSingleItemData(
    tableData,
    "creditAmountCivil"
  );
  const sum_percentCreditAmountCivil = getPercent(
    sum_creditAmountCivil,
    sum_mosavabCivil
  );
  const sum_expenseCivil = sumFieldsInSingleItemData(tableData, "expenseCivil");
  const sum_percentCivil = getPercent(sum_expenseCivil, sum_mosavabCivil);

  const sum_mosavabFinancial = sumFieldsInSingleItemData(
    tableData,
    "mosavabFinancial"
  );
  const sum_expenseFinancial = sumFieldsInSingleItemData(
    tableData,
    "expenseFinancial"
  );
  const sum_percentFinancial = getPercent(
    sum_expenseFinancial,
    sum_mosavabFinancial
  );

  const sum_mosavabSanavati = sumFieldsInSingleItemData(
    tableData,
    "mosavabSanavati"
  );
  const sum_expenseSanavati = sumFieldsInSingleItemData(
    tableData,
    "expenseSanavati"
  );
  const sum_percentSanavati = getPercent(
    sum_expenseSanavati,
    sum_mosavabSanavati
  );

  const sum_mosavabPayMotomarkez = sumFieldsInSingleItemData(
    tableData,
    "mosavabPayMotomarkez"
  );
  const sum_expensePayMotomarkez = sumFieldsInSingleItemData(
    tableData,
    "expensePayMotomarkez"
  );
  const sum_percentPayMotomarkez = getPercent(
    sum_expensePayMotomarkez,
    sum_mosavabPayMotomarkez
  );

  const sum_mosavabDar_Khazane = sumFieldsInSingleItemData(
    tableData,
    "mosavabDar_Khazane"
  );
  const sum_expenseDar_Khazane = sumFieldsInSingleItemData(
    tableData,
    "expenseDar_Khazane"
  );
  const sum_percentDar_Khazane = getPercent(
    sum_expenseDar_Khazane,
    sum_mosavabDar_Khazane
  );

  const sum_balance = sumFieldsInSingleItemData(tableData, "balance");

  const tableFooter: TableDataItemShape | any = {
    areaName: "جمع",

    mosavabRevenue: sum_mosavabRevenue,
    expenseRevenue: sum_expenseRevenue,
    percentRevenue: sum_percentRevenue,

    mosavabCurrent: sum_mosavabCurrent,
    expenseCurrent: sum_expenseCurrent,
    percentCurrent: sum_percentCurrent,

    mosavabCivil: sum_mosavabCivil,
    expenseCivil: sum_expenseCivil,
    percentCivil: sum_percentCivil,
    creditAmountCivil: sum_creditAmountCivil,
    percentCreditCivil: sum_percentCreditAmountCivil,

    mosavabFinancial: sum_mosavabFinancial,
    expenseFinancial: sum_expenseFinancial,
    percentFinancial: sum_percentFinancial,

    mosavabSanavati: sum_mosavabSanavati,
    expenseSanavati: sum_expenseSanavati,
    percentSanavati: sum_percentSanavati,

    mosavabPayMotomarkez: sum_mosavabPayMotomarkez,
    expensePayMotomarkez: sum_expensePayMotomarkez,
    percentPayMotomarkez: sum_percentPayMotomarkez,

    mosavabDar_Khazane: sum_mosavabDar_Khazane,
    expenseDar_Khazane: sum_expenseDar_Khazane,
    percentDar_Khazane: sum_percentDar_Khazane,

    balance: sum_balance,
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
