import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { programProjectApi } from "api/project/programs-project-api";
import FixedTable from "components/data/table/fixed-table";
import AdminLayout from "components/layout/admin-layout";
import ProgramOprationProjectForm from "components/sections/project/program/program-opration-form";
import ProgramOprationModal from "components/sections/project/program/program-opration-modal";
import FixedModal from "components/ui/modal/fixed-modal";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

import { programProjectConfig } from "config/features/project/program-project-config";
import { reactQueryKeys } from "config/react-query-keys-config";
import { useState, ReactNode } from "react";
import { GetSingleProgramDataShape } from "types/data/project/program-project-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";

interface TableDataItemShape {
  number: ReactNode;
  projectCode: ReactNode;
  projectName: ReactNode;
  projectScaleName: ReactNode;
}

function ProgramOperationProjectPage() {
  const [formData, setFormData] = useState({
    [programProjectConfig.area]: undefined,
    [programProjectConfig.program]: 10,
  });

  // head
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
      align: "left",
      name: "projectName",
    },
    {
      title: "مقیاس پروژه",
      name: "projectScaleName",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // modal
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [activeItem, setActiveItem] =
    useState<GetSingleProgramDataShape | null>(null);
  const openEditModal = (row: GetSingleProgramDataShape) => {
    setActiveItem(row);
    setIsOpenEditModal(true);
  };

  const queryClient = useQueryClient();

  const getDataMutation = useMutation(programProjectApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.project.program.data, data);
    },
  });

  const handleDoneTask = () => {
    setIsOpenEditModal(false);
    getDataMutation.mutate(formData);
  };

  // actions
  const actionButtons = (row: GetSingleProgramDataShape) => (
    <IconButton size="small" color="primary" onClick={() => openEditModal(row)}>
      <EditIcon />
    </IconButton>
  );

  // data
  const formatTableData = (
    unFormatData: GetSingleProgramDataShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        projectScaleName: (
          <span style={{ whiteSpace: "nowrap" }}>{item.projectScaleName}</span>
        ),
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const programQuery = useQuery(
    reactQueryKeys.project.program.data,
    () => programProjectApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = programQuery.data
    ? formatTableData(programQuery.data?.data)
    : [];

  // footer
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 4,
    projectCode: null,
    projectName: null,
    projectScaleName: null,
  };

  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <ProgramOprationProjectForm
          formData={formData}
          setFormData={setFormData}
          printData={{
            data: tableData,
            footer: [tableFooter],
          }}
        />
      ),
      colspan: 5,
    },
  ];

  return (
    <>
      <AdminLayout>
        <FixedTable
          heads={tableHeads}
          headGroups={tableHeadGroups}
          data={tableData}
          footer={tableFooter}
        />
      </AdminLayout>

      {/* modal */}
      <FixedModal
        open={isOpenEditModal}
        handleClose={() => setIsOpenEditModal(false)}
        maxWidth="md"
        maxHeight="30%"
        title={`${activeItem?.projectCode} - ${activeItem?.projectName}`}
      >
        <ProgramOprationModal
          initialData={activeItem}
          onDoneTask={handleDoneTask}
        />
      </FixedModal>
    </>
  );
}

export default ProgramOperationProjectPage;
