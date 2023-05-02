import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";

import { FormEvent } from "react";

function ProjectMettingsModalForm() {
  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Grid lg={3}>
          <YearInput setter={() => {}} value={32} />
        </Grid>
        <Grid lg={3}>
          <AreaInput setter={() => {}} value={1} />
        </Grid>

        <Grid lg={4}>
          <LoadingButton variant="contained" type="submit" loading={false}>
            نمایش
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProjectMettingsModalForm;
