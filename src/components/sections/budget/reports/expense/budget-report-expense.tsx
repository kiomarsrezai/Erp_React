import FixedTable from "components/data/table/fixed-table";
import { ReactNode, useState } from "react";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import BudgetReportExpenseForm from "./budget-report-expense-form";
import { useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { budgetDeviationApi } from "api/report/budget-deviation-api";
import { GetSingleBudgetDeviationItemShape } from "types/data/budget/budget-deviation-type";
import { budgetDeviationConfig } from "config/features/budget/report/budget-deviation-config";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import { budgetProjectOprationConfig } from "config/features/budget/report/budget-project-opration-config";
import { budgetReportExpenseConfig } from "config/features/budget/report/budget-report-expense-config";
import { budgetReportExpenseApi } from "api/report/budget-expense-api";
import { GetSingleBudgetExpenseReportItemShape } from "types/data/budget/budget-report-expense-type";

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
  });

  // head
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: "مناطق/سازمانها",
      colspan: 1,
      rowspan: 2,
      align: "center",
    },
    {
      title: "درآمد",
      colspan: 1,
      rowspan: 2,
      align: "center",
    },
    {
      title: "سهم متمرکز",
      colspan: 1,
      rowspan: 2,
      align: "center",
    },
    {
      title: "دریافت از خزانه",
      colspan: 1,
      rowspan: 2,
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
      colspan: 2,
      align: "center",
    },
    {
      title: "تملک مالی",
      colspan: 2,
      align: "center",
    },
    {
      title: "سرمایه ای",
      colspan: 2,
      align: "center",
    },
    {
      title: "سنواتی",
      colspan: 2,
      align: "center",
    },
    {
      title: "عملکرد",
      colspan: 3,
      align: "center",
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "عنوان",
      name: "areaName",
      align: "left",
      hiddenSelf: true,
    },

    {
      title: "درآمد",
      name: "mosavabRevenue",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "سهم متمرکز",
      name: "mosavabPayMotomarkez",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "دریافت از خزانه",
      name: "mosavabDar_Khazane",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
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
      split: true,
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expenseCurrent",
      split: true,
      align: "left",
    },

    // Financial
    {
      title: "مصوب",
      name: "mosavabFinancial",
      split: true,
      align: "left",
    },

    {
      title: "عملکرد",
      name: "expenseFinancial",
      split: true,
      align: "left",
    },

    // Civil
    {
      title: "مصوب",
      name: "mosavabCivil",
      split: true,
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expenseCivil",
      split: true,
      align: "left",
    },
    // Current
    {
      title: "مصوب",
      name: "mosavabSanavati",
      split: true,
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expenseSanavati",
      split: true,
      align: "left",
    },

    // expense
    {
      title: "درآمد",
      name: "expenseRevenue",
      split: true,
      align: "left",
    },
    {
      title: "سهم متمرکز",
      name: "expensePayMotomarkez",
      split: true,
      align: "left",
    },
    {
      title: "دریافت از خزانه",
      name: "expenseDar_Khazane",
      split: true,
      align: "left",
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
  const sumMosavab = sumFieldsInSingleItemData(tableData, "mosavab");
  const sumExpense = sumFieldsInSingleItemData(tableData, "expense");
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 3,
    projectCode: null,
    projectName: null,
    mosavab: sumMosavab,
    expense: sumExpense,
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
      colspan: 16,
    },
  ];

  return (
    <FixedTable
      heads={tableHeads}
      headGroups={tableHeadGroups}
      topHeadGroups={tableTopHeadGroups}
      // footer={tableFooter}
      data={tableData}
    />
  );
}

export default BudgetReportExpense;
