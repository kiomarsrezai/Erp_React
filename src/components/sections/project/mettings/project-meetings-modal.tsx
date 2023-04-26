import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import CommiteInput from "components/sections/inputs/commites-input";
import CheckIcon from "@mui/icons-material/Check";
import FixedTable from "components/data/table/fixed-table";
import ProjectMettingsModalForm from "./project-meetings-modal-form";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { transferApi } from "api/transfer/transfer-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { mettingsProjectConfig } from "config/features/project/meetings-project-config";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { GetSingleCommiteModalShape } from "types/data/project/commite-project-type";
import { mettingsProjectApi } from "api/project/meetings-project-api";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  date: ReactNode;
  actions: (row: any) => ReactNode;
}

interface ProjectMettingsModalProps {
  onSelectItem: (data: any) => void;
}
function ProjectMettingsModal(props: ProjectMettingsModalProps) {
  const { onSelectItem } = props;

  // table
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: <ProjectMettingsModalForm />,
      colspan: 4,
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "شماره",
      name: "code",
    },
    {
      title: "تاریخ",
      name: "date",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // table data
  const handleClickCheckIcon = (row: any) => {
    console.log(row);
    onSelectItem({ date: row.dates, code: row.code, commite: "test" });
  };
  const actionButtons = (row: TableDataItemShape) => (
    <IconButton
      color="primary"
      size="small"
      onClick={() => handleClickCheckIcon(row)}
    >
      <CheckIcon />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: GetSingleCommiteModalShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      code: item.number,
      date: item.dates,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const mettingsQuery = useQuery(
    reactQueryKeys.project.mettings.getCommitesModal,
    () => mettingsProjectApi.getCommiteModal({}),
    {
      enabled: false,
    }
  );

  const tableData = mettingsQuery.data
    ? formatTableData(mettingsQuery.data?.data)
    : [];

  return (
    <FixedTable
      heads={tableHeads}
      headGroups={tableHeadGroups}
      data={tableData}
      notFixed
    />
  );
}

export default ProjectMettingsModal;
