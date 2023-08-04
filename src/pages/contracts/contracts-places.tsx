import AdminLayout from "components/layout/admin-layout";
import ProjectMeetingsForm from "components/sections/project/mettings/project-meetings-form";
import ProjectMeetingsEditorCard from "components/sections/project/mettings/project-meetings-editor-card";

import { reactQueryKeys } from "config/react-query-keys-config";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mettingsProjectApi } from "api/project/meetings-project-api";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { globalConfig } from "config/global-config";
import { GetSingleCommiteDetailModalShape } from "types/data/project/commite-project-type";
import {
  contractsTasksConfig,
  contractsTasksFormDefaultValue,
} from "config/features/contracts/conreacts-tasks-config";
import { contractsTasksApi } from "api/contracts/contracts-tasks-api";
import ContractsTasksForm from "components/sections/contracts/contracts-tasks/contracts-tasks-form";
import ContractTaskItemCard from "components/sections/contracts/contracts-tasks/contract-task-item-card";
import TabAreaContract from "components/sections/contracts/contracts-tasks/tabs/areas/tab-area-contract";
import { TableHeadShape } from "types/table-type";
import FixedTable from "components/data/table/fixed-table";
import { GetSingleContractPlacesItemShape } from "types/data/contracts/contracts-places-type";
import { contractsPlacesApi } from "api/contracts/contracts-places-api";

function ContractsPlaces() {
  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "آیدی",
      name: "id",
    },
    {
      title: "نام کاربری",
      name: "userName",
    },
    {
      title: "نام",
      name: "firstName",
    },
    {
      title: "نام خانوادگی",
      name: "lastName",
    },
    {
      title: "مسئولیت",
      name: "bio",
      align: "left",
    },
    {
      title: "ایمیل",
      name: "email",
    },
    {
      title: "موبایل",
      name: "phoneNumber",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // data
  const placesListQuery = useQuery(["all-places"], contractsPlacesApi.getData);

  const formatTableData = (
    unFormatData: GetSingleContractPlacesItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
    }));

    return formatedData;
  };

  const tableData = formatTableData(placesListQuery.data?.data || []);

  return (
    <AdminLayout>
      <FixedTable data={tableData} heads={tableHeads} />
    </AdminLayout>
  );
}

export default ContractsPlaces;
