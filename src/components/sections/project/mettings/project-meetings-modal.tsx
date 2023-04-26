import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import CommiteInput from "components/sections/inputs/commites-input";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { FormEvent, useEffect, useState } from "react";
import { transferApi } from "api/transfer/transfer-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { mettingsProjectConfig } from "config/features/project/meetings-project-config";

function ProjectMettingsModal() {
  const [formData, setFormData] = useState({
    [mettingsProjectConfig.commiteType]: 0,
    [mettingsProjectConfig.year]: 0,
  });

  const handleFormSubmit = () => {};

  return (
    <Box component="form" p={2} onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Grid lg={3}>
          <YearInput
            setter={setFormData}
            value={formData[mettingsProjectConfig.year]}
          />
        </Grid>
        <Grid lg={3}>
          <CommiteInput
            setter={setFormData}
            value={formData[mettingsProjectConfig.commiteType]}
          />
        </Grid>

        <Grid lg={4}>
          <LoadingButton
            variant="contained"
            type="submit"
            // loading={submitMutation.isLoading}
          >
            نمایش
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProjectMettingsModal;
