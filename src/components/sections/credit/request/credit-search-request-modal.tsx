import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";

import { ReactNode } from "react";
import { TableHeadShape } from "types/table-type";
import { SearchCreditRequestShape } from "types/data/credit/credit-request-type";

interface TableDataItemShape {
  number: ReactNode;
  description: ReactNode;
  unit: ReactNode;
  rate: ReactNode;
  price: ReactNode;
  actions: (row: any) => ReactNode;
}

interface ProjectMettingsModalProps {
  data: any[];
}

function ProjectMettingsModal(props: ProjectMettingsModalProps) {
  const { data } = props;

  // table head
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
  const handleClickCheckBtn = () => {};

  const actionButtons = () => (
    <IconButton color="primary" size="small" onClick={handleClickCheckBtn}>
      <CheckIcon />
    </IconButton>
  );
  const formatTableData = (
    unFormatData: SearchCreditRequestShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      rate: "", //item.rate,
      description: "", //item.rate,
      price: "", //item.rate,
      unit: "", //item.rate,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  return <FixedTable heads={tableHeads} data={tableData} notFixed />;
}

export default ProjectMettingsModal;
