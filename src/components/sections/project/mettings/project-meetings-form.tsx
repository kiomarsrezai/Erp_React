import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FixedModal from "components/ui/modal/fixed-modal";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import ProjectMettingsModal from "components/sections/project/mettings/project-meetings-modal";
import WindowLoading from "components/ui/loading/window-loading";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { mettingsProjectApi } from "api/project/meetings-project-api";

interface ProjectMeetingsFormProps {
  formData: any;
  setFormData: any;
}

function ProjectMeetingsForm(props: ProjectMeetingsFormProps) {
  const { formData, setFormData } = props;

  // submit
  const queryClient = useQueryClient();
  const commiteDetailModalMutation = useMutation(
    mettingsProjectApi.getCommiteDetail,
    {
      onSuccess: (data) => {
        queryClient.setQueryData(
          reactQueryKeys.project.mettings.getCommitesDetailModal,
          data
        );
      },
    }
  );

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  // modal
  const [openMeetingsModal, setOpenMeetingsModal] = useState(false);
  const handleCloseMeetingsModal = () => {
    setOpenMeetingsModal(false);
  };
  const handleOpenMeetingsModal = () => {
    setOpenMeetingsModal(true);
  };

  const handleSelectItem = ({ date, code, commite, id }: any) => {
    setFormData({
      date,
      code,
      commite,
    });
    handleCloseMeetingsModal();
    commiteDetailModalMutation.mutate(id);
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

      {/* modal */}
      <FixedModal
        open={openMeetingsModal}
        handleClose={handleCloseMeetingsModal}
        title="انتخاب صورت جلسه"
      >
        <ProjectMettingsModal onSelectItem={handleSelectItem} />
      </FixedModal>

      {/* lodaing */}
      <WindowLoading active={commiteDetailModalMutation.isLoading} />
    </>
  );
}

export default ProjectMeetingsForm;
