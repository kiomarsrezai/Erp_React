import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CheckboxLabeled from "components/ui/inputs/checkbox-labeled";
import * as yup from "yup";
import SearchIcon from "@mui/icons-material/Search";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { codingBudgetConfig } from "config/features/budget/coding-config";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { codingBudgetApi } from "api/budget/coding-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import AreaInput from "components/sections/inputs/area-input";
import FixedModal from "components/ui/modal/fixed-modal";
import ProposalModal2InsertCode from "./proposal-modal2-insert-code";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { GetSingleProposalItemShape } from "types/data/budget/proposal-type";
import { proposalConfig } from "config/features/budget/proposal-config";
import { checkHaveValue } from "helper/form-utils";
import { changeInputHandler } from "helper/form-utils";

interface ProposalModalInsertCodeProos {
  activeRowData: GetSingleProposalItemShape;
  formData: any;
}

function ProposalModalInsertCode(props: ProposalModalInsertCodeProos) {
  const { activeRowData, formData } = props;

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);

  const [modalFormData, setModalFormData] = useState({
    [proposalConfig.code]: "",
    [proposalConfig.description]: "",
    [proposalConfig.coding]: activeRowData.codingId,
    [proposalConfig.YEAR]: formData[proposalConfig.YEAR],
    [proposalConfig.AREA]: undefined,
    [proposalConfig.mosavab]: 0,
    [proposalConfig.program]: undefined,
  });

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    setHaveSubmitedForm(true);

    if (
      checkHaveValue(modalFormData, [
        proposalConfig.AREA,
        proposalConfig.program,
        proposalConfig.code,
        proposalConfig.description,
      ])
    ) {
      // insertCodingMutation.mutate(modalFormData);
    }
  };

  const insertCodingMutation = useMutation(proposalBudgetApi.codingInsert, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
  });

  // modal
  const [isOpenModal2, setIsOpenModal2] = useState(false);

  const handleCloseModal2 = () => {
    setIsOpenModal2(false);
  };

  const handleOpenModal2 = () => {
    setIsOpenModal2(true);
  };

  const onChange = (e: any) => {
    changeInputHandler(e, setModalFormData);
  };

  return (
    <>
      <Box p={2} component="form" onSubmit={handleFormSubmit}>
        <Grid
          container
          columnSpacing={1}
          rowSpacing={2}
          justifyContent={"center"}
        >
          <Grid item sm={6}>
            <TextField
              id="code-input"
              label="کد"
              variant="outlined"
              size="small"
              value={modalFormData[proposalConfig.code]}
              onChange={onChange}
              error={!!modalFormData[proposalConfig.code]}
              // helperText={
              //   (errors[codingBudgetConfig.code]?.message || "") as any
              // }
              autoComplete="off"
              fullWidth
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="code-input"
              label="مصوب"
              variant="outlined"
              type="number"
              size="small"
              autoComplete="off"
              fullWidth
              value={modalFormData[proposalConfig.mosavab]}
              onChange={onChange}
              error={!!modalFormData[proposalConfig.mosavab]}
              // helperText={
              //   (errors[codingBudgetConfig.code]?.message || "") as any
              // }
            />
          </Grid>
          <Grid item sm={6}>
            <AreaInput
              setter={setModalFormData}
              value={modalFormData[proposalConfig.AREA]}
              // error={!!modalFormData[proposalConfig.AREA]}
              // setter={setFormData}
              // value={formData[proposalConfig.AREA]}
              showError={haveSubmitedForm}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              id="project-input"
              label="پروژه"
              variant="outlined"
              value={undefined}
              size="small"
              // error={
              //   !formData[creditRequestConfig.contractorName] && haveSubmitedForm
              // }
              // helperText={
              //   !formData[creditRequestConfig.contractorName] &&
              //   haveSubmitedForm &&
              //   globalConfig.ERROR_NO_EMPTY
              // }
              // sx={{
              //   "& fieldset": {
              //     ...(!formData[creditRequestConfig.contractorName] &&
              //       haveSubmitedForm && {
              //         borderColor: `${red[600]} !important`,
              //       }),
              //   },
              // }}
              disabled
              // InputLabelProps={{
              //   shrink: !!formData[creditRequestConfig.contractorName],
              // }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleOpenModal2} size="small">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              multiline
              rows={4}
              id="description-input"
              label="شرح"
              variant="outlined"
              autoComplete="off"
              size="small"
              value={modalFormData[proposalConfig.description]}
              onChange={onChange}
              error={!!modalFormData[proposalConfig.description]}
              // helperText={
              //   (errors[codingBudgetConfig.description]?.message || "") as any
              // }
              fullWidth
            />
          </Grid>

          <Grid item lg={12}>
            <Button variant="contained" type="submit">
              افزودن
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* modal insert code */}
      <FixedModal
        open={isOpenModal2}
        handleClose={handleCloseModal2}
        // loading={getInfoDataMutation.isLoading}
        // title={modalTitle}
        maxWidth="md"
      >
        <ProposalModal2InsertCode
          formData={modalFormData}
          onDoneTask={() => {}}
        />
      </FixedModal>
    </>
  );
}

export default ProposalModalInsertCode;
