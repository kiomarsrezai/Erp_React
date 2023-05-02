import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import FixedTable from "components/data/table/fixed-table";
import ProjectMettingsModalForm from "./project-meetings-modal-form";

import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
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
    onSelectItem({
      date: row.dates,
      code: row.code,
      commite: "test",
      id: row.id,
    });
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
