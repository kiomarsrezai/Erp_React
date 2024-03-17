import AdminLayout from "components/layout/admin-layout";
import ProjectMeetingsForm from "components/sections/project/mettings/project-meetings-form";
import ProjectMeetingsEditorCard from "components/sections/project/mettings/project-meetings-editor-card";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { reactQueryKeys } from "config/react-query-keys-config";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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
import { Unstable_Grid2 as Grid } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers";
import { contractsMotalebApi } from "api/contracts/contracts-motaleb-api";

interface Props {
  formData: any;
  setFormData: any;
}

function ContractsMotalebForm(props: Props) {
  const { formData, setFormData } = props;

  const queryClient = useQueryClient();
  const getDataMutation = useMutation(contractsMotalebApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.contracts.motaleb.getData, data);
    },
  });

  useEffect(() => {
    queryClient.setQueryData(reactQueryKeys.contracts.motaleb.getData, {
      data: [],
    });
  }, [formData]);

  // submit
  // const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // setHaveSubmitedForm(true);
    // if (checkHaveValue(formData, [formData.date])) {
    const date = new Date(formData.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    getDataMutation.mutate({
      date: `${year}-${month}-${day}`,
    });
    // }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <DatePicker
            value={formData.date}
            label="تاریخ"
            onChange={(newValue: any) =>
              setFormData((state: any) => ({
                ...state,
                date: newValue,
              }))
            }
            slotProps={{
              textField: { size: "small", fullWidth: true },
            }}
          />
        </Grid>
        <Grid xs>
          <LoadingButton
            variant="contained"
            loading={getDataMutation.isLoading}
            type="submit"
          >
            نمایش
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContractsMotalebForm;
