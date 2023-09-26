import AdminLayout from "components/layout/admin-layout";
import ProjectMeetingsForm from "components/sections/project/mettings/project-meetings-form";
import ProjectMeetingsEditorCard from "components/sections/project/mettings/project-meetings-editor-card";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { reactQueryKeys } from "config/react-query-keys-config";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mettingsProjectApi } from "api/project/meetings-project-api";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { globalConfig } from "config/global-config";
import { GetSingleCommiteDetailModalShape } from "types/data/project/commite-project-type";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import {
  contractsTasksConfig,
  contractsTasksFormDefaultValue,
} from "config/features/contracts/conreacts-tasks-config";
import { contractsTasksApi } from "api/contracts/contracts-tasks-api";
import ContractsTasksForm from "components/sections/contracts/contracts-tasks/contracts-tasks-form";
import ContractTaskItemCard from "components/sections/contracts/contracts-tasks/contract-task-item-card";
import TabAreaContract from "components/sections/contracts/contracts-tasks/tabs/areas/tab-area-contract";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import FixedTable from "components/data/table/fixed-table";
import { GetSingleContractPlacesItemShape } from "types/data/contracts/contracts-places-type";
import { contractsPlacesApi } from "api/contracts/contracts-places-api";
import ContractsPlacesLeftSection from "components/sections/contracts/contracts-tasks/contracts-places/contracts-places-left-section";
import ContractPlacesRightModal from "components/sections/contracts/contracts-tasks/contracts-places/contract-places-right-modal";
import FixedModal from "components/ui/modal/fixed-modal";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import { enqueueSnackbar } from "notistack";
import { contractsMotalebApi } from "api/contracts/contracts-motaleb-api";
import {
  GetSingleContractLeftDataItemShape,
  GetSingleContractMotalebItemShape,
} from "types/data/contracts/contracts-motaleb-type";
import ContractsMotalebForm from "components/sections/contracts/contracts-places/contracts-motaleb-form";
import { contractsMotalebConfig } from "config/features/contracts/conreacts-motaleb-config";
import ContractsMotalebLeftSection from "components/sections/contracts/contracts-places/contracts-motaleb-left-section";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

export default function ContractsMotaleb() {
  const [formData, setFormData] = useState({
    [contractsMotalebConfig.date]: new Date(),
  });

  // head group
  const tableHeadGroup = [
    {
      title: (
        <ContractsMotalebForm formData={formData} setFormData={setFormData} />
      ),
      colspan: 5,
    },
  ];

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "row",
    },
    {
      title: "تاریخ",
      name: "dateShamsi",
    },
    {
      title: "شماره",
      name: "number",
    },
    {
      title: "مبلغ",
      name: "amount",
      split: true,
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // actions
  const [activePlaceItem, setActivePlaceItem] =
    useState<GetSingleContractMotalebItemShape>();

  const openLeftSection = (item: GetSingleContractMotalebItemShape) => {
    setActivePlaceItem(item);
  };

  const actionButtons = (item: GetSingleContractMotalebItemShape) => (
    <Stack direction="row" spacing={0.5} justifyContent={"center"}>
      <IconButton
        size="small"
        color="primary"
        onClick={() => openLeftSection(item)}
      >
        <ArrowCircleLeftIcon />
      </IconButton>
    </Stack>
  );

  // data
  const motalebListQuery = useQuery(
    reactQueryKeys.contracts.motaleb.getData,
    contractsMotalebApi.getData,
    {
      enabled: false,
    }
  );

  const formatTableData = (
    unFormatData: GetSingleContractMotalebItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      row: i + 1,
      actions: () => actionButtons(item),
      bgcolor: activePlaceItem?.id === item.id ? "rgba(187,222,251)" : "",
    }));

    return formatedData;
  };

  const tableData = formatTableData(motalebListQuery.data?.data || []);

  // footer
  const sumPrice = sumFieldsInSingleItemData(
    motalebListQuery.data?.data,
    "amount"
  );

  const tableFooter = {
    row: "جمع",
    "colspan-row": 3,
    dateShamsi: null,
    number: null,
    amount: sumPrice,
  };

  return (
    <>
      <AdminLayout>
        <Box display={"flex"}>
          <Box sx={{ width: "50%", borderRight: 1, borderColor: "grey.400" }}>
            <FixedTable
              data={tableData}
              heads={tableHeads}
              headGroups={tableHeadGroup}
              footer={tableFooter}
            />
          </Box>
          {/* modal 2 */}
          <Box sx={{ width: "50%" }}>
            {activePlaceItem && (
              <ContractsMotalebLeftSection activePlaceItem={activePlaceItem} />
            )}
          </Box>
        </Box>
      </AdminLayout>
    </>
  );
}
