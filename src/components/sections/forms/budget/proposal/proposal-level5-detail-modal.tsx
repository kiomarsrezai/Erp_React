import FixedTable from "components/data/table/fixed-table";

import { TableHeadShape } from "types/table-type";
import { ReactNode } from "react";
import { GetSingleLevel5DetailProposalItemShape } from "types/data/budget/proposal-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

interface TableDataItemShape {
  number: ReactNode;
  area: ReactNode;
  mosavab: ReactNode;
  expense: ReactNode;
  edit: ReactNode;
  percent: ReactNode;
}

interface ProposalLevel5DetailModalProps {
  data: any[];
}
function ProposalLevel5DetailModal(props: ProposalLevel5DetailModalProps) {
  const { data } = props;

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
      title: "عملکرد",
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
      area: item.areaName,
      mosavab: item.mosavab,
      expense: item.expense,
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
