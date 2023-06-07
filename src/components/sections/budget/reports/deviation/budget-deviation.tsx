import FixedTable from "components/data/table/fixed-table";
import { ReactNode, useState } from "react";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import BudgetReportDeviationForm from "./budget-deviation-form";
import { useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { budgetDeviationApi } from "api/report/budget-deviation-api";
import { GetSingleBudgetDeviationItemShape } from "types/data/budget/budget-deviation-type";
import { budgetDeviationConfig } from "config/features/budget/report/budget-deviation-config";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  areaname: ReactNode;
  mosavab: ReactNode;
  expense: ReactNode;
  percmosavab: ReactNode;
}

interface BudgetReportDeviationProps {
  tabRender?: ReactNode;
}

function BudgetReportDeviation(props: BudgetReportDeviationProps) {
  const { tabRender } = props;
  const [formData, setFormData] = useState({
    [budgetDeviationConfig.area]: undefined,
    [budgetDeviationConfig.year]: undefined,
    [budgetDeviationConfig.kind]: 1,
  });

  // head
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "کد",
      name: "code",
    },
    {
      title: "منطقه",
      name: "areaName",
      align: "left",
    },
    {
      title: "شرح",
      name: "description",
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
    {
      title: "% جذب",
      name: "percmosavab",
      percent: true,
    },
  ];

  // data
  const formatTableData = (
    unFormatData: GetSingleBudgetDeviationItemShape[]
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
    reactQueryKeys.budget.deviation,
    () => budgetDeviationApi.getData({}),
    {
      enabled: false,
    }
  );

  const data = deviationQuery.data
    ? deviationQuery.data.data.filter((item) => {
        if (formData[budgetDeviationConfig.kind] === 1) {
          return item.percmosavab <= 110;
        } else if (formData[budgetDeviationConfig.kind] === 2) {
          return item.percmosavab > 110;
        } else if (formData[budgetDeviationConfig.kind] === 3) {
          return true;
        }
      })
    : [];
  const tableData = formatTableData(data);

  // footer
  const sumMosavab = sumFieldsInSingleItemData(tableData, "mosavab");
  const sumExpense = sumFieldsInSingleItemData(tableData, "expense");
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 4,
    code: null,
    areaName: null,
    description: null,
    mosavab: sumMosavab,
    expense: sumExpense,
    percmosavab: getPercent(sumExpense, sumMosavab),
  };

  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <BudgetReportDeviationForm
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
      footer={tableFooter}
      data={tableData}
    />
  );
}

export default BudgetReportDeviation;
