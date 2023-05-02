import FixedTable from "components/data/table/fixed-table";

import { ReactNode } from "react";
import { TableHeadShape } from "types/table-type";

interface TableDataItemShape {
  number: ReactNode;
  description: ReactNode;
  organ: ReactNode;
  rate: ReactNode;
  price: ReactNode;
}

function CreidtRequestFormTableTpye() {
  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "شرح",
      align: "left",
      name: "description",
    },
    {
      title: "واحد",
      name: "organ",
      align: "left",
    },
    {
      title: "نرخ",
      align: "left",
      split: true,
      name: "rate",
    },
    {
      title: "مبلغ",
      name: "price",
      split: true,
      align: "left",
    },
  ];
  //   data
  const data: TableDataItemShape[] = [
    {
      description: "تست",
      number: "1",
      organ: "تست",
      price: 12462314,
      rate: 12462314,
    },
    {
      description: "تست",
      number: "2",
      organ: "تست",
      price: 12462314,
      rate: 12462314,
    },
    {
      description: "تست",
      number: "3",
      organ: "تست",
      price: 12462314,
      rate: 12462314,
    },
    {
      description: "تست",
      number: "4",
      organ: "تست",
      price: 12462314,
      rate: 12462314,
    },
    {
      description: "تست",
      number: "1",
      organ: "تست",
      price: 12462314,
      rate: 12462314,
    },
    {
      description: "تست",
      number: "2",
      organ: "تست",
      price: 12462314,
      rate: 12462314,
    },
    {
      description: "تست",
      number: "3",
      organ: "تست",
      price: 12462314,
      rate: 12462314,
    },
    {
      description: "تست",
      number: "4",
      organ: "تست",
      price: 12462314,
      rate: 12462314,
    },
  ];
  //   footer
  const tableFooter: TableDataItemShape = {
    description: "",
    number: "",
    organ: "",
    price: 12462314,
    rate: 12462314,
  };
  return (
    <FixedTable heads={tableHeads} data={data} footer={tableFooter} notFixed />
  );
}

export default CreidtRequestFormTableTpye;
