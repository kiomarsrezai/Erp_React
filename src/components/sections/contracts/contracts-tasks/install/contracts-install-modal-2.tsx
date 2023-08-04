import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import { GetSingleSearchContractTaskItemShape } from "types/data/contracts/contracts-tasks-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

interface Props {
  onDoneTask: () => void;
  formData: any;
}

export default function ContractsInstallModal2(props: Props) {
  const { onDoneTask, formData } = props;

  return <></>;
}
