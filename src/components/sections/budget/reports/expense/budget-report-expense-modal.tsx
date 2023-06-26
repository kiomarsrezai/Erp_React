import FixedTable from "components/data/table/fixed-table";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import { GetSingleBudgetDetailExpenseReportItemShape } from "types/data/budget/budget-report-expense-type";
import { TableHeadShape } from "types/table-type";

interface BudgetReportExpenseModalProps {
  data: GetSingleBudgetDetailExpenseReportItemShape[];
}

function BudgetReportExpenseModal(props: BudgetReportExpenseModalProps) {
  const { data } = props;

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
      name: "percent",
      percent: true,
    },
  ];

  //   data
  const sumMosavab = sumFieldsInSingleItemData(data, "mosavab");
  const sumExpense = sumFieldsInSingleItemData(data, "expense");
  const percentJazb = getPercent(sumExpense, sumMosavab);

  const formatTableData = (
    unFormatData: GetSingleBudgetDetailExpenseReportItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
    }));

    return formatedData;
  };

  const tableData = formatTableData(data);

  // footer
  const tableFooter = {
    number: "جمع",
    "colspan-number": 3,
    code: null,
    description: null,
    mosavab: sumMosavab,
    expense: sumExpense,
    percent: percentJazb,
  };

  return (
    <FixedTable
      heads={tableHeads}
      data={tableData}
      footer={tableFooter}
      notFixed
    />
  );
}

export default BudgetReportExpenseModal;
