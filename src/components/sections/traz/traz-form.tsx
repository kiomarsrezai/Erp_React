import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import SectionGuard from "components/auth/section-guard";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import userStore from "hooks/store/user-store";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { trazApi } from "api/traz/traz-api";
import { trazConfig } from "config/features/traz/traz-config";
import { filedItemsGuard, joinPermissions } from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";
import { trazKindItems } from "config/features/general-fields-config";

interface TrazFormProps {
  formData: any;
  setFormData: any;
}

function TrazForm(props: TrazFormProps) {
  const { formData, setFormData } = props;

  const userLicenses = userStore((state) => state.permissions);

  // submit
  const queryClient = useQueryClient();
  const submitMutation = useMutation(trazApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.traz.getData, data);
    },
  });

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    submitMutation.mutate(formData);
  };

  // change state
  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.traz.getData, {
      data: [],
    });
  }, [formData, queryClient]);

  return (
    <Box component="form" onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.FINANCIAL__TARAZ_PAGE,
            accessNamesConfig.FIELD_YEAR,
          ])}
        >
          <Grid lg={2}>
            <YearInput
              setter={setFormData}
              value={formData[trazConfig.YEAR]}
              level={2}
              permissionForm={accessNamesConfig.FINANCIAL__TARAZ_PAGE}
            />
          </Grid>
        </SectionGuard>

        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.FINANCIAL__TARAZ_PAGE,
            accessNamesConfig.FIELD_AREA,
          ])}
        >
          <Grid lg={2}>
            <AreaInput
              setter={setFormData}
              value={formData[trazConfig.AREA]}
              permissionForm={accessNamesConfig.FINANCIAL__TARAZ_PAGE}
            />
          </Grid>
        </SectionGuard>

        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.FINANCIAL__TARAZ_PAGE,
            accessNamesConfig.FINANCIAL__TARAZ_PAGE_KIND,
          ])}
        >
          <Grid lg={2}>
            <FlotingLabelSelect
              label="نوع تراز"
              name={trazConfig.kind}
              items={filedItemsGuard(
                trazKindItems,
                userLicenses,
                joinPermissions([
                  accessNamesConfig.FINANCIAL__TARAZ_PAGE,
                  accessNamesConfig.FINANCIAL__TARAZ_PAGE_KIND,
                ])
              )}
              value={formData[trazConfig.kind]}
              setter={setFormData}
            />
          </Grid>
        </SectionGuard>

        <Grid lg={4}>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={submitMutation.isLoading}
          >
            نمایش
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TrazForm;