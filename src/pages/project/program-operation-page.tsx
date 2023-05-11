import { useQuery } from "@tanstack/react-query";
import { programProjectApi } from "api/project/programs-project-api";
import FixedTable from "components/data/table/fixed-table";
import AdminLayout from "components/layout/admin-layout";
import ProgramOprationProjectForm from "components/sections/project/program/program-opration-form";

import { programProjectConfig } from "config/features/project/program-project-config";
import { reactQueryKeys } from "config/react-query-keys-config";
import { useState, ReactNode } from "react";
import { GetSingleProgramDataShape } from "types/data/project/program-project-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  name: ReactNode;
}

function ProgramOperationProjectPage() {
  const [formData, setFormData] = useState({
    [programProjectConfig.area]: undefined,
    [programProjectConfig.program]: 10,
  });

  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <ProgramOprationProjectForm
          formData={formData}
          setFormData={setFormData}
        />
      ),
      colspan: 3,
    },
  ];

  // head
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "کد",
      name: "code",
    },
    {
      title: "نام",
      align: "left",
      name: "name",
    },
  ];

  // data
  const formatTableData = (
    unFormatData: GetSingleProgramDataShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      code: item.projectCode,
      name: item.projectName,
    }));

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
  const tableFooter: TableDataItemShape = {
    number: "جمع",
    code: "",
    name: "",
  };

  return (
    <AdminLayout>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroups}
        data={tableData}
        footer={tableFooter}
      />
    </AdminLayout>
  );
}

export default ProgramOperationProjectPage;
