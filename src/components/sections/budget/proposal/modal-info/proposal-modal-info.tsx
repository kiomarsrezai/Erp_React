import FixedTable from "components/data/table/fixed-table";
import { proposalConfig } from "config/features/budget/proposal-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { GetSingleProposalInfoItemShape } from "types/data/budget/proposal-type";
import { TableHeadShape } from "types/table-type";

interface ProposalModalInfoProps {
  data: GetSingleProposalInfoItemShape[];
  formData: any;
}

function ProposalModalInfo(props: ProposalModalInfoProps) {
  const { data, formData } = props;

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      width: "90px",
    },
    {
      title: "منطقه",
      name: "areaName",
    },
    {
      title: "مصوب",
      name: "mosavab",
      align: "left",
      split: true,
      width: "150px",
    },
    {
      title: "اصلاح",
      name: "editArea",
      align: "left",
      split: true,
      width: "150px",
    },
    {
      title: "ت اعتبار",
      name: "creditAmount",
      split: true,
      align: "left",
      hidden: formData[proposalConfig.BUDGET_METHOD] === 1,
      width: "150px",
    },
    {
      title: "هزینه",
      name: "expense",
      align: "left",
      split: true,
      width: "150px",
    },
  ];

  //   data
  const formatTableData = (
    unFormatData: GetSingleProposalInfoItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
    }));

    return formatedData;
  };

  const tableData = formatTableData(data);

  // footer
  const sumMosavab = sumFieldsInSingleItemData(data, "mosavab");

  const sumEdit = sumFieldsInSingleItemData(data, "editArea");

  const sumExpense = sumFieldsInSingleItemData(data, "expense");

  const sumCreditAmount = sumFieldsInSingleItemData(data, "creditAmount");

  const tableFooter: any = {
    number: "جمع",
    "colspan-number": 2,
    areaName: null,
    creditAmount: sumCreditAmount,
    mosavab: sumMosavab,
    editArea: sumEdit,
    expense: sumExpense,
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

export default ProposalModalInfo;
