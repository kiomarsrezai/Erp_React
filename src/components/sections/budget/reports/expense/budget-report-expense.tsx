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
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "کد پروژه",
      name: "projectCode",
    },
    {
      title: "نام پروژه",
      name: "projectName",
      align: "left",
    },

    {
      title: "مصوب",
      name: "mosavab",
      split: true,
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expense",
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
  const tableHeadGroups: TableHeadGroupShape = [
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
      colspan: 5,
    },
  ];

  return (
    <FixedTable
      heads={tableHeads}
      headGroups={tableHeadGroups}
      footer={tableFooter}
      data={tableData}
    />
  );
}

export default BudgetReportExpense;
