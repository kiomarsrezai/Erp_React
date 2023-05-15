import FixedTable from "components/data/table/fixed-table";

import { TableHeadShape } from "types/table-type";
import { ReactNode } from "react";
import { GetSingleLevel5DetailProposalItemShape } from "types/data/budget/proposal-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { proposalConfig } from "config/features/budget/proposal-config";

interface TableDataItemShape {
  number: ReactNode;
  area: ReactNode;
  creditAmount: ReactNode;
  mosavab: ReactNode;
  expense: ReactNode;
  edit: ReactNode;
  percent: ReactNode;
}

interface ProposalLevel5DetailModalProps {
  data: any[];
  formData: any;
}
function ProposalLevel5DetailModal(props: ProposalLevel5DetailModalProps) {
  const { data, formData } = props;

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "منطقه",
      name: "area",
    },
    {
      title: "مصوب",
      name: "mosavab",
      align: "left",
      split: true,
    },
    {
      title: "اصلاح",
      name: "edit",
      align: "left",
      split: true,
    },
    {
      title: "ت اعتبار",
      name: "creditAmount",
      split: true,
      align: "left",
      hidden: formData[proposalConfig.BUDGET_METHOD] === 1,
    },
    {
      title: "هزینه",
      name: "expense",
      align: "left",
      split: true,
    },
    {
      title: "% جذب",
      name: "percent",
      percent: true,
    },
  ];

  // data
  const formatTableData = (
    unFormatData: GetSingleLevel5DetailProposalItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      area: item.areaNameShort,
      creditAmount: 0,
      mosavab: item.mosavab,
      expense: item.expense,
      "textcolor-expense": item.expense < 0 ? "red" : "",
      percent: item.percentBud,
      edit: item.edit,
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // footer
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 2,
    area: null,
    creditAmount: 0,
    mosavab: sumFieldsInSingleItemData(data, "mosavab"),
    edit: sumFieldsInSingleItemData(data, "edit"),
    percent: "",
    expense: sumFieldsInSingleItemData(data, "expense"),
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

export default ProposalLevel5DetailModal;
