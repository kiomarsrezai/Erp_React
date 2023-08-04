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
import {
  GetSingleContractPlacesItemShape,
  GetSingleContractPlacesPrivateItemShape,
} from "types/data/contracts/contracts-places-type";
import { contractsPlacesApi } from "api/contracts/contracts-places-api";
import { contractsPlacesConfig } from "config/features/contracts/conreacts-places-config";

interface Props {
  activePlaceItem: GetSingleContractPlacesItemShape;
}

function ContractsPlacesLeftSection(props: Props) {
  const { activePlaceItem } = props;

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "مساحت",
      name: "masahat",
    },
    {
      title: "شماره",
      name: "numberGhorfe",
    },
  ];

  // data
  const placesPrivateListQuery = useQuery(
    ["all-places-places", activePlaceItem.id],
    () =>
      contractsPlacesApi.getLeftData({
        [contractsPlacesConfig.amlak]: activePlaceItem.id,
      })
  );

  const formatTableData = (
    unFormatData: GetSingleContractPlacesPrivateItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
    }));

    return formatedData;
  };

  const tableData = formatTableData(placesPrivateListQuery.data?.data || []);

  return <FixedTable data={tableData} heads={tableHeads} />;
}

export default ContractsPlacesLeftSection;
