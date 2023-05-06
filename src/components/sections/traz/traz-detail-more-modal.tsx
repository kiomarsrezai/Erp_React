import FixedTable from "components/data/table/fixed-table";

import { ReactNode } from "react";
import { TableHeadShape } from "types/table-type";
import { TrazItemShape } from "types/data/traz/traz-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

interface TableDataItemShape {
  number: ReactNode;
  id: ReactNode;
  date: ReactNode;
  description: ReactNode;
  bedehkar: ReactNode;
  bestankar: ReactNode;
  balanceBedehkar: ReactNode;
  balanceBestankar: ReactNode;
}

interface TrazDetailMoreModalProps {
  data: any[];
}

function TrazDetailMoreModal(props: TrazDetailMoreModalProps) {
  const { data } = props;

  //   table heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "شماره سند",
      name: "id",
    },
    {
      title: "تاریخ سند",
      name: "date",
    },
    {
      title: "شرح",
      align: "left",
      name: "description",
    },
    {
      title: " بدهکار",
      name: "bedehkar",
      align: "left",
      split: true,
    },
    {
      title: " بستانکار",
      name: "bestankar",
      align: "left",
      split: true,
    },
    {
      title: "مانده بدهکار",
      name: "balanceBedehkar",
      align: "left",
      split: true,
    },
    {
      title: "مانده بستانکار",
      name: "balanceBestankar",
      align: "left",
      split: true,
    },
  ];

  //   table data
  const formatTableData = (
    unFormatData: TrazItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        id: item.sanadNumber,
        date: item.sanadDate,
        description: item.description,
        "textAlign-description":
          item.bedehkar >= item.bestankar ? "left" : "right",
        bedehkar: item.bedehkar,
        bestankar: item.bestankar,
        balanceBedehkar: item.balanceBedehkar,
        balanceBestankar: item.balanceBestankar,
      })
    );

    return formatedData;
  };

  // footer
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 4,
    date: null,
    id: null,
    description: null,
    balanceBedehkar: sumFieldsInSingleItemData(data, "balanceBedehkar"),
    bedehkar: sumFieldsInSingleItemData(data, "bedehkar"),
    balanceBestankar: sumFieldsInSingleItemData(data, "balanceBestankar"),
    bestankar: sumFieldsInSingleItemData(data, "bestankar"),
    actions: "",
  };

  const tableData = data ? formatTableData(data) : [];

  return (
    <FixedTable
      heads={tableHeads}
      data={tableData}
      footer={tableFooter}
      notFixed
    />
  );
}

export default TrazDetailMoreModal;
