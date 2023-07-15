import FixedTable from "components/data/table/fixed-table";
import CheckIocn from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { ReactNode, useEffect, useState } from "react";
import {
  GetSearchPropsalModal1Data,
  GetSearchPropsalModal2Data,
  GetSingleProposalProjectInsertCodeItemShape,
} from "types/data/budget/proposal-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { proposalConfig } from "config/features/budget/proposal-config";
import AreaInput from "components/sections/inputs/area-input";

interface ProposalModal2InsertCodeProps {
  formData: any;
  onDoneTask: () => void;
}

function ProposalModal2InsertCode(props: ProposalModal2InsertCodeProps) {
  const { formData, onDoneTask } = props;

  const headGroup: TableHeadGroupShape = [
    {
      title: (
        <Box sx={{ width: "80%", mx: "auto" }}>
          {/* <AreaInput
            setter={setModalFormData}
            value={modalFormData[proposalConfig.AREA]}
            level={3}
          /> */}
        </Box>
      ),
      colspan: 4,
    },
  ];

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "کد پروژه",
      name: "projectCode",
    },
    {
      title: "نام پروژه",
      name: "projectName",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // insert
  const handleAddClick = (row: GetSingleProposalProjectInsertCodeItemShape) => {
    // insertMutation.mutate({
    //   [proposalConfig.AREA]: modalFormData[proposalConfig.AREA],
    //   [proposalConfig.detailId]: codingId,
    //   [proposalConfig.YEAR]: formData[proposalConfig.YEAR],
    //   [proposalConfig.program]: row.id,
    // });
  };

  //   data
  const getDataQuery = useQuery(["proposal-insert-code-data"], () => {
    return proposalBudgetApi.getProjectsModalData({
      [proposalConfig.AREA]: formData[proposalConfig.AREA],
      [proposalConfig.YEAR]: formData[proposalConfig.YEAR],
    });
  });

  const actionButtons = (row: any) => (
    <IconButton
      color="primary"
      size="small"
      onClick={() => handleAddClick(row)}
    >
      <CheckIocn />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: GetSingleProposalProjectInsertCodeItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      actions: () => actionButtons(item),
    }));

    return formatedData;
  };

  const tableData = getDataQuery.data?.data
    ? formatTableData(getDataQuery.data.data)
    : [];

  return (
    <FixedTable
      data={tableData}
      heads={tableHeads}
      headGroups={headGroup}
      enableVirtual
      notFixed
    />
  );
}

export default ProposalModal2InsertCode;
