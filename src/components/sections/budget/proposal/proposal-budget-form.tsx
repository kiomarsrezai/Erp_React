import { Unstable_Grid2 as Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";
import FixedModal from "components/ui/modal/fixed-modal";
import ProposalBudgetBaseModal from "./proposal-budget-base-modal";
import SearchIcon from "@mui/icons-material/Search";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { accessNamesConfig } from "config/access-names-config";
import {checkHavePermission, filedItemsGuard, joinPermissions} from "helper/auth-utils";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";
import { proposalConfig } from "config/features/budget/proposal-config";
import { InputAdornment, TextField } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import {beforeproposalConfig} from "../../../../config/features/budget/beforeproposal-config";
import {GetSingleProposalItemShape} from "../../../../types/data/budget/proposal-type";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";
import WindowLoading from "../../../ui/loading/window-loading";
import {budgetMethodItems, generalFieldsConfig} from "../../../../config/features/general-fields-config";
import {getGeneralFieldItemArea, getGeneralFieldItemYear} from "../../../../helper/export-utils";
import {mosavabBudgetXlsx} from "../../../../stimul/budget/mosavab/budget-mosavab-xlsx";

interface ProposalBudgetFormProps {
  formData: any;
  setFormData: any;
  setCodingId: any;
  afterCloseAnyModal: any;
    
    
    isHideLevel5Items: any,
    onlyShowProject: any,
    setIsHideLevel5Items: any,
    setOnlyShowProject: any,
}

function ProposalBudgetForm(props: ProposalBudgetFormProps) {
  const { formData, setFormData, setCodingId, afterCloseAnyModal, isHideLevel5Items, onlyShowProject, setIsHideLevel5Items, setOnlyShowProject } = props;

  const userLicenses = userStore((state) => state.permissions);

  // submit
  const [filterText, setFilterText] = useState("");

  const queryClient = useQueryClient();
  const [submitedData, setSubmitedData] = useState<any[]>([]);
  const submitMutation = useMutation(proposalBudgetApi.getData, {
    onSuccess: (data) => {
        let result = filterData(data.data);
    
        // queryClient.setQueryData(reactQueryKeys.budget.proposal.getData, data);
      setSubmitedData(result);
    },
  });

  useEffect(() => {
    const filteredData = submitedData.filter(
      (item) =>
        item.description.includes(filterText) || item.code.includes(filterText)
    );
    queryClient?.setQueryData(reactQueryKeys.budget.proposal.getData, {
      data: filteredData,
    });
  }, [submitedData, filterText]);

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    // permission
    const havePermission = checkHavePermission(
      userLicenses,
      [
        accessNamesConfig.FIELD_YEAR,
        accessNamesConfig.FIELD_AREA,
        accessNamesConfig.FIELD_BUDGET_METHOD,
      ],
      accessNamesConfig.BUDGET__PROPOSAL_PAGE
    );

    if (!havePermission) {
      return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
        variant: "error",
      });
    }

    setHaveSubmitedForm(true);

    if (
      checkHaveValue(formData, [
        proposalConfig.YEAR,
        proposalConfig.BUDGET_METHOD,
        proposalConfig.AREA,
      ])
    ) {
      submitMutation.mutate(formData);
    }
  };

  // change state
  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.budget.proposal.getData, {
      data: [],
    });
  }, [formData, queryClient]);

  // base modal
  const [isOpenBaseModal, setIsOpenBaseModal] = useState(false);

  const getModalDataMutation = useMutation(proposalBudgetApi.getModalBaseData);

  const handleOpenBaseModal = () => {
    // permission
    const havePermission = checkHavePermission(
      userLicenses,
      [
        accessNamesConfig.FIELD_YEAR,
        accessNamesConfig.FIELD_AREA,
        accessNamesConfig.FIELD_BUDGET_METHOD,
      ],
      accessNamesConfig.BUDGET__PROPOSAL_PAGE
    );

    if (!havePermission) {
      return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
        variant: "error",
      });
    }

    setHaveSubmitedForm(true);

    if (
      checkHaveValue(formData, [
        proposalConfig.YEAR,
        proposalConfig.BUDGET_METHOD,
        proposalConfig.AREA,
      ])
    ) {
      getModalDataMutation.mutate(formData);

      setIsOpenBaseModal(true);
    }
  };

  const handleDoneTaskBaseModal = (coding: string | number) => {
    setCodingId(coding);
    setIsOpenBaseModal(false);
    submitMutation.mutate(formData);
    setFilterText(String(coding));

    // setTimeout(() => {
    //   afterCloseAnyModal();
    //   const top =
    //     (document.querySelector("#table-container") as any)?.scrollTop +
    //     (document.querySelector(`#c-${coding}`) as any).getBoundingClientRect()
    //       ?.top -
    //     500;

    //   (document.querySelector("#table-container") as any)?.scrollTo?.(0, top);
    // }, 500);
  };
  
  
  useEffect(() => {
      // console.log('fetch data');
    submitMutation.mutate(formData);
  }, [onlyShowProject, isHideLevel5Items])
    
    const filterData = (data:GetSingleProposalItemShape[]) => {
        let result = [];
        result = data.filter(item => !(onlyShowProject && item.levelNumber !== 4));

        if(formData[beforeproposalConfig.BUDGET_METHOD] === 1 || formData[beforeproposalConfig.BUDGET_METHOD] === 3){
            result = result.filter(item => !(item.levelNumber === 5 && isHideLevel5Items));
        }else if(formData[beforeproposalConfig.BUDGET_METHOD] === 2){
            result = result.filter(item => !(item.levelNumber === 4 && isHideLevel5Items));
        }

        if(onlyShowProject){
            result.sort((a, b) => b.mosavab - a.mosavab);
        }

        return result;
    }
    
    const submitMutation2 = useMutation(proposalBudgetApi.getData);
    
    const [excelLodaing, setExcelLodaing] = useState(false);
    const handleExcelClick = () => {
        setExcelLodaing(true);
        handleExcelForm();
    }
    
    const budgetMethodAccessItems = filedItemsGuard(
        budgetMethodItems,
        userLicenses,
        joinPermissions([
            accessNamesConfig.BUDGET__PROPOSAL_PAGE,
            accessNamesConfig.FIELD_BUDGET_METHOD,
        ])
    );
    
    const handleExcelForm = async () => {
        if(!formData[generalFieldsConfig.AREA] && !formData[generalFieldsConfig.YEAR]){
            return
        }
        
        let culmnsData: any = {};
        budgetMethodAccessItems.forEach((item) => {
            culmnsData[item.value] = [];
        });

        const culmnKeys = Object.keys(culmnsData);
    
        
        try {
            await Promise.all(
                culmnKeys.map(async (item) => {
                    const data = await submitMutation2.mutateAsync({
                        ...formData,
                        [generalFieldsConfig.BUDGET_METHOD]: item,
                    });

                    const newData = filterData(data.data);

                    culmnsData = {
                        ...culmnsData,
                        [item]: newData,
                    };
                })
            );
        } catch {}

        const yearLabel = getGeneralFieldItemYear(formData, 1);
        const areaLabel = getGeneralFieldItemArea(formData, 1);
    
        mosavabBudgetXlsx({
            culmnsData: culmnsData,
            area: areaLabel,
            year: yearLabel,
            budgetMethod: formData[generalFieldsConfig.BUDGET_METHOD],
            setExcelLodaing: setExcelLodaing,
        });
    };
  
  return (
    <>
      <Box component="form" onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__PROPOSAL_PAGE,
              accessNamesConfig.FIELD_YEAR,
            ])}
          >
            <Grid sm={2}>
              <YearInput
                setter={setFormData}
                value={formData[proposalConfig.YEAR]}
                permissionForm={accessNamesConfig.BUDGET__PROPOSAL_PAGE}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>
          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__PROPOSAL_PAGE,
              accessNamesConfig.FIELD_AREA,
            ])}
          >
            <Grid sm={2}>
              <AreaInput
                setter={setFormData}
                value={formData[proposalConfig.AREA]}
                permissionForm={accessNamesConfig.BUDGET__PROPOSAL_PAGE}
                level={1}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>

          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__PROPOSAL_PAGE,
              accessNamesConfig.FIELD_BUDGET_METHOD,
            ])}
          >
            <Grid sm={2}>
              <BudgetMethodInput
                setter={setFormData}
                value={formData[proposalConfig.BUDGET_METHOD]}
                permissionForm={accessNamesConfig.BUDGET__PROPOSAL_PAGE}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>
          <Grid sm>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={submitMutation.isLoading}
            >
              نمایش
            </LoadingButton>
            <Button
              variant="contained"
              onClick={handleOpenBaseModal}
              sx={{ mx: 1 }}
            >
              افزودن
            </Button>
              <IconButton color="primary" onClick={handleExcelClick}>
                  <GetAppIcon />
              </IconButton>
    
              <WindowLoading active={excelLodaing}/>
          </Grid>

          <Grid sm={2}>
            <TextField
              size="small"
              label="جستجو"
              value={filterText}
              variant="outlined"
              onChange={(e) => setFilterText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </Grid>
        </Grid>
  
        <FormGroup style={{display: 'flex', flexDirection: 'row'}}>
          <FormControlLabel
              style={{width:'130px'}}
              control={
                <Checkbox
                    checked={isHideLevel5Items}
                    onChange={() => {setIsHideLevel5Items((state: boolean) => !state);setOnlyShowProject(false)}}
                />
              }
              label={
                <Typography variant="body2">بدون ریز پروژه</Typography>
              }
          />
          <FormControlLabel
              style={{width:'130px'}}
              control={
                <Checkbox
                    checked={onlyShowProject}
                    onChange={() =>{ setOnlyShowProject((state: boolean) => !state); setIsHideLevel5Items(false)}}
                />
              }
              label={
                <Typography variant="body2">پروژه</Typography>
              }
          />
        </FormGroup>
      </Box>

      {/* base modal */}
      <FixedModal
        open={isOpenBaseModal}
        handleClose={() => setIsOpenBaseModal(false)}
        loading={getModalDataMutation.isLoading}
        title="افزودن آیتم"
      >
        <ProposalBudgetBaseModal
          data={getModalDataMutation.data?.data || []}
          formData={formData}
          onDoneTask={handleDoneTaskBaseModal}
        />
      </FixedModal>
    </>
  );
}

export default ProposalBudgetForm;
