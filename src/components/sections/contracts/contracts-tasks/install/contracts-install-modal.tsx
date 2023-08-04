import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import {
  GetSingleSearchContractTaskInstallItemShape,
  GetSingleSearchContractTaskItemShape,
} from "types/data/contracts/contracts-tasks-type";
import { TableHeadShape } from "types/table-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { contractsTasksApi } from "api/contracts/contracts-tasks-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { contractsTasksConfig } from "config/features/contracts/conreacts-tasks-config";
import { convertToCalenderDate } from "helper/date-utils";
import SectionGuard from "components/auth/section-guard";
import { joinPermissions } from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";
import { Unstable_Grid2 as Grid } from "@mui/material";
import AreaInput from "components/sections/inputs/area-input";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useState } from "react";
import FixedModal from "components/ui/modal/fixed-modal";
import ContractsInstallModal2 from "./contracts-install-modal-2";

interface Props {
  formData: any;
}

export default function ContractsInstallModal(props: Props) {
  const { formData } = props;

  const handleClickAddBtn = () => {
    setIsOpenInstallModal2(true);
  };

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
      name: "number",
      width: "100px",
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
      title: "تاریخ",
      name: "dateShamsi",
    },
    {
      title: "مبلغ",
      name: "monthlyAmount",
    },
  ];

  // modal
  const [isOpenInstallModal2, setIsOpenInstallModal2] = useState(false);

  const handleDoneTask = () => {
    setIsOpenInstallModal2(false);
    installQuery.refetch();
  };

  // data
  const installQuery = useQuery(["get-install", formData.id], () =>
    contractsTasksApi.installRead({
      contractId: formData.id,
    })
  );

  const formatTableData = (
    unFormatData: GetSingleSearchContractTaskInstallItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
    }));

    return formatedData;
  };

  const tableData = formatTableData(installQuery.data?.data || []);

  return (
    <>
      <FixedTable heads={tableHeads} data={tableData} notFixed />

      {/* modal */}
      <FixedModal
        open={isOpenInstallModal2}
        handleClose={() => setIsOpenInstallModal2(false)}
        maxWidth="sm"
        maxHeight="50%"
        title={
          "افزودن قسط به قرارداد شماره " + formData[contractsTasksConfig.number]
        }
      >
        <ContractsInstallModal2
          formData={formData}
          onDoneTask={handleDoneTask}
        />
      </FixedModal>
    </>
  );
}
