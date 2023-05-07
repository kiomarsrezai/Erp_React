import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FixedTable from "components/data/table/fixed-table";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";

import { TableHeadShape } from "types/table-type";
import { ReactNode } from "react";
import { GetSingleCodingItemShape } from "types/data/budget/coding-type";

interface TableDataItemShape {
  rowNumber: ReactNode;
  code: ReactNode;
  description: ReactNode;
  level: ReactNode;
  crud: ReactNode;
  show: ReactNode;
  revenueType: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

interface CodingBudgetDetailModalProps {
  data: any[];
  loading: boolean;
}
function CodingBudgetDetailModal(props: CodingBudgetDetailModalProps) {
  const { data, loading } = props;

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "rowNumber",
    },
    {
      title: "کد",
      name: "code",
    },
    {
      title: "شرح",
      align: "left",
      name: "description",
    },
    {
      title: "سطح",
      name: "level",
    },
    {
      title: "crud",
      name: "crud",
    },
    {
      title: "نمایش",
      name: "show",
    },
    {
      title: "نوع درامد",
      name: "revenueType",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // data
  const actionButtons = (
    row: TableDataItemShape & GetSingleCodingItemShape
  ) => (
    <IconButton size="small" color="primary">
      <FormatListBulletedIcon />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: GetSingleCodingItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        rowNumber: i + 1,
        code: item.code,
        description: item.description,
        crud: <Checkbox defaultChecked={item.crud} onChange={() => {}} />,
        level: item.levelNumber,
        revenueType: item.codingRevenueKind,
        show: <Checkbox defaultChecked={item.show} />,
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  if (loading) {
    return (
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  return <FixedTable data={tableData} heads={tableHeads} />;
}

export default CodingBudgetDetailModal;
