import FixedTable from "components/data/table/fixed-table";
import ProjectMettingsModalForm from "./credit-search-request-modal-form";

import { TableHeadGroupShape, TableHeadShape } from "types/table-type";

function ProjectMettingsModal() {
  // table
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: <ProjectMettingsModalForm />,
      colspan: 5,
    },
  ];

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

  // table data
  const data = [
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

  return (
    <FixedTable
      heads={tableHeads}
      headGroups={tableHeadGroups}
      data={data}
      notFixed
    />
  );
}

export default ProjectMettingsModal;
