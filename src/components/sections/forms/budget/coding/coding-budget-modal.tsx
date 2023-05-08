import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FixedTable from "components/data/table/fixed-table";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import { TableHeadShape } from "types/table-type";
import { ReactNode } from "react";
import { GetSingleCodingItemShape } from "types/data/budget/coding-type";
import { Checkbox } from "@mui/material";
import { codingBudgetApi } from "api/budget/coding-api";
import { useMutation } from "@tanstack/react-query";
import { codingBudgetConfig } from "config/features/budget/coding-config";
import CodingBudgetDetailModal from "./coding-budget-detail-modal";

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

interface CodingBudgetModalProps {
  data: any[];
  formData: any;
}
function CodingBudgetModal(props: CodingBudgetModalProps) {
  const { data, formData } = props;

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

  // more detail
  const detailCodingMutation = useMutation(codingBudgetApi.getData);

  const openMoreDetail = (
    row: TableDataItemShape & GetSingleCodingItemShape
  ) => {
    detailCodingMutation.mutate({
      ...formData,
      [codingBudgetConfig.mother_id]: row.id,
    });
  };

  // data
  const actionButtons = (
    row: TableDataItemShape & GetSingleCodingItemShape
  ) => (
    <IconButton
      size="small"
      color="primary"
      onClick={() => openMoreDetail(row)}
    >
      <ArrowCircleLeftIcon />
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

  return (
    <Box display={"flex"}>
      <Box sx={{ width: "50%", borderRight: 1, borderColor: "grey.400" }}>
        <FixedTable data={tableData} heads={tableHeads} notFixed />
      </Box>
      <Box sx={{ width: "50%" }}>
        <CodingBudgetDetailModal
          data={detailCodingMutation.data?.data || []}
          loading={detailCodingMutation.isLoading}
        />
      </Box>
    </Box>
  );
}

export default CodingBudgetModal;
