import AdminLayout from "components/layout/admin-layout";
import Box from "@mui/material/Box";
import ProjectOrgCard from "components/sections/project/project-org-card";
import Draggable from "react-draggable";
import ProjectOrgTools from "components/sections/project/project-org-tools";

import { grey } from "@mui/material/colors";
import { Tree, TreeNode } from "react-organizational-chart";
import { globalConfig } from "config/global-config";
import { orgProjectApi } from "api/project/org-project-api";
import { orgProjectConfig } from "config/features/project/org-project-config";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import FixedTable from "components/data/table/fixed-table";
import OrgProjectTableForm from "./org-table-form";
import { GetSingleOrgProjectTableItemShape } from "types/data/project/org-project-type";

function OrgProjectTablePage() {
  const [formData, setFormData] = useState({
    [orgProjectConfig.area]: undefined,
  });

  //   heads
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
      title: "از تاریخ",
      align: "left",
      name: "dateFrom",
    },
    {
      title: "تا تاریخ",
      align: "left",
      name: "dateEnd",
      split: true,
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <OrgProjectTableForm formData={formData} setFormData={setFormData} />
      ),
      colspan: tableHeads.length,
    },
  ];

  //   data
  const formatTableData = (
    unFormatData: GetSingleOrgProjectTableItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      // proctorName: (
      //   <span style={{ whiteSpace: "nowrap" }}>{item.proctorName}</span>
      // ),
      actions: "actionButtons",
    }));

    return formatedData;
  };

  const orgTableQuery = useQuery(
    reactQueryKeys.project.org.getTable,
    () => orgProjectApi.getProjectTable({}),
    {
      enabled: false,
    }
  );

  const tableData = orgTableQuery.data
    ? formatTableData(orgTableQuery.data?.data)
    : [];

  return (
    <AdminLayout>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroups}
        data={tableData}
        // footer={tableFooter}
      />
    </AdminLayout>
  );
}

export default OrgProjectTablePage;
