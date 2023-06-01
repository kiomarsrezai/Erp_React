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
  projectCode: ReactNode;
  projectName: ReactNode;
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
  ];

  // data
  const formatTableData = (
    unFormatData: GetSingleProgramDataShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
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
    "colspan-number": 3,
    projectCode: null,
    projectName: null,
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
      colspan: 3,
    },
  ];

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
