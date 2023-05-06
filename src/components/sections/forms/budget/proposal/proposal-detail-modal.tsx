import FixedTable from "components/data/table/fixed-table";

import { TableHeadShape } from "types/table-type";
import { ReactNode } from "react";
import { GetSingleDetailSepratorItemShape } from "types/data/budget/seprator-type";

interface TableDataItemShape {
  number: ReactNode;
  area: ReactNode;
  code: ReactNode;
  description: ReactNode;
  mosavab: ReactNode;
  expense: ReactNode;
}

interface ProposalDetailModalProps {
  data: any[];
}
function ProposalDetailModal(props: ProposalDetailModalProps) {
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
      align: "left",
      split: true,
    },

    {
      title: "عملکرد",
      name: "expense",
      align: "left",
      split: true,
    },
  ];

  // data

  const formatTableData = (
    unFormatData: GetSingleDetailSepratorItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      area: "",
      code: item.number,
      description: item.description,
      mosavab: 0,
      expense: 0,
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // footer
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 4,
    code: null,
    description: null,
    area: null,
    mosavab: 0,
    expense: 0,
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

export default ProposalDetailModal;
