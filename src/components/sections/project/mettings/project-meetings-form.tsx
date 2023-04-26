import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ProjectMettingsModa from "components/sections/project/mettings/project-meetings-modal";
import FixedModal from "components/ui/modal/fixed-modal";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { FormEvent, useState } from "react";
import { transferApi } from "api/transfer/transfer-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { mettingsProjectApi } from "api/project/meetings-project-api";

interface ProjectMeetingsFormProps {
  formData: any;
  setFormData: any;
}

function ProjectMeetingsForm(props: ProjectMeetingsFormProps) {
  const { formData, setFormData } = props;

  // submit
  // const queryClient = useQueryClient();
  // const submitMutation = useMutation(mettingsProjectApi.getCommiteModal, {
  //   onSuccess: (data) => {
  //     queryClient.setQueryData(
  //       reactQueryKeys.project.mettings.getCommitesModal,
  //       data
  //     );
  //   },
  // });

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    // submitMutation.mutate(formData);
  };

  // modal
  const [openMeetingsModal, setOpenMeetingsModal] = useState(false);
  const handleCloseMeetingsModal = () => {
    setOpenMeetingsModal(false);
  };
  const handleOpenMeetingsModal = () => {
    setOpenMeetingsModal(true);
  };

  const handleSelectItem = ({ date, code, commite }: any) => {
    setFormData({
      date,
      code,
      commite,
    });
    handleCloseMeetingsModal();
  };

  return (
    <>
      <Box component="form" p={2} onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid lg={2}>
            <TextField
              id="username-input"
              label="کمیته"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={formData.commite}
            />
          </Grid>
          <Grid lg={2}>
            <TextField
              id="username-input"
              label="شماره"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={formData.code}
            />
          </Grid>

          <Grid lg={2}>
            <TextField
              id="username-input"
              label="تاریخ"
              variant="outlined"
              size="small"
              disabled
              fullWidth
              value={formData.date}
            />
          </Grid>
          <Grid lg={4}>
            <Button
              onClick={handleOpenMeetingsModal}
              color="primary"
              variant="contained"
            >
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>

      <FixedModal
        open={openMeetingsModal}
        handleClose={handleCloseMeetingsModal}
        title="انتخاب صورت جلسه"
      >
        <ProjectMettingsModa onSelectItem={handleSelectItem} />
      </FixedModal>
    </>
  );
}

export default ProjectMeetingsForm;
