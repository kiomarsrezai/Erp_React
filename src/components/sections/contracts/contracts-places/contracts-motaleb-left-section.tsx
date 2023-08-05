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
import FixedModal from "components/ui/modal/fixed-modal";
import { enqueueSnackbar } from "notistack";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import {
  GetSingleContractLeftDataItemShape,
  GetSingleContractMotalebItemShape,
} from "types/data/contracts/contracts-motaleb-type";
import { contractsMotalebApi } from "api/contracts/contracts-motaleb-api";
import { contractsMotalebConfig } from "config/features/contracts/conreacts-motaleb-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import ContractMoalebModalAdd from "./contracts-motaleb-modal-add";
import ContractMotalebModalAdd from "./contracts-motaleb-modal-add";

interface Props {
  activePlaceItem: GetSingleContractMotalebItemShape;
}

function ContractsMotalebLeftSection(props: Props) {
  const { activePlaceItem } = props;

  // modal
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const handleClickAddBtn = () => {
    setIsOpenAddModal(true);
  };

  const handleDoneTask = () => {
    setIsOpenAddModal(false);
  };

  // head
  const tableHeads: TableHeadShape = [
    {
      title: (
        <div>
          ردیف
          <IconButton size="small" color="primary" onClick={handleClickAddBtn}>
            <AddIcon />
          </IconButton>
        </div>
      ),
      name: "row",
    },
    {
      title: "نام",
      name: "suppliersName",
    },
    {
      title: "شماره",
      name: "number",
    },
    {
      title: "سال",
      name: "yearName",
    },
    {
      title: "ماه",
      name: "monthId",
    },
    {
      title: "مبلغ دریافتی",
      name: "reciveAmount",
      split: true,
    },
  ];

  // data
  const placesPrivateListQuery = useQuery(
    ["all-motalebat", activePlaceItem.id],
    () =>
      contractsMotalebApi.getLeftData({
        [contractsMotalebConfig.motalebId]: activePlaceItem.id,
      })
  );

  const formatTableData = (
    unFormatData: GetSingleContractLeftDataItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      row: i + 1,
    }));

    return formatedData;
  };

  const tableData = formatTableData(placesPrivateListQuery.data?.data || []);

  // footer
  const sumPrice = sumFieldsInSingleItemData(
    placesPrivateListQuery.data?.data,
    "reciveAmount"
  );

  const tableFooter = {
    row: "جمع",
    "colspan-row": 5,
    suppliersName: null,
    number: null,
    yearName: null,
    monthId: null,
    reciveAmount: sumPrice,
  };

  return (
    <>
      <FixedTable data={tableData} heads={tableHeads} footer={tableFooter} />

      <FixedModal
        open={isOpenAddModal}
        handleClose={() => {
          setIsOpenAddModal(false);
        }}
        title={"افزودن"}
        // maxWidth="sm"
        // maxHeight="30%"
      >
        <ContractMotalebModalAdd
          activeItem={activePlaceItem}
          onDoneTask={handleDoneTask}
        />
      </FixedModal>
    </>
  );
}

export default ContractsMotalebLeftSection;
