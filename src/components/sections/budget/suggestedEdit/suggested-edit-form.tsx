import { Unstable_Grid2 as Grid } from "@mui/material";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useEffect, useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { beforeproposalapi } from "api/budget/pishnahadi-api";
import { accessNamesConfig } from "config/access-names-config";
import {checkHavePermission, filedItemsGuard, joinPermissions} from "helper/auth-utils";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";
import { beforeproposalConfig } from "config/features/budget/beforeproposal-config";
import { InputAdornment, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PrintIcon from "@mui/icons-material/Print";
import GetAppIcon from "@mui/icons-material/GetApp";
import {proposalBudgetXlsx} from "../../../../stimul/budget/proposal/budget-proposal-xlsx";
import WindowLoading from "../../../ui/loading/window-loading";
import {budgetMethodItems, generalFieldsConfig} from "../../../../config/features/general-fields-config";
import {
  getGeneralFieldItemArea,
  getGeneralFieldItemYear
} from "../../../../helper/export-utils";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import {GetSingleSuggestedEditItemShape} from "../../../../types/beforeproposal-type";
import {suggestedEditApi} from "../../../../api/budget/suggested-edit-api";
import {suggestedEditXlsx} from "../../../../stimul/budget/suggestedEdit/suggested-edit-xlsx";
import NumbersInput from "../../inputs/numbers-input";
import ProctorInput from "../../inputs/proctor-input";
import ProjectNatureInput from "../../inputs/project-nature-input";


interface BeforeProposalBudgetFormProps {
  formData: any;
  setFormData: any;
  setCodingId: any;

  isHideLevel5Items: any,
  onlyShowProject: any,
  setIsHideLevel5Items: any,
  setOnlyShowProject: any,
  formatAndBindData: any,
  submitedData: any,
  setSubmitedData: any,


  printData: {
    data: any[],
    footer: any[],
    bottomFooter: any[],
  };
}

function SuggestedEditForm(props: BeforeProposalBudgetFormProps) {
  const { formData, setFormData, printData, isHideLevel5Items, onlyShowProject, setIsHideLevel5Items, setOnlyShowProject, formatAndBindData, setSubmitedData, submitedData} = props;

  const userLicenses = userStore((state) => state.permissions);

  // submit
  const [filterText, setFilterText] = useState("");

  const queryClient = useQueryClient();
  const submitMutation = useMutation(suggestedEditApi.getData, {
    onSuccess: (data) => {
      console.log('form')
      console.log(data)
      let result = filterData(data.data);

      setSubmitedData(result);
    },
  });


  const filterData = (data:GetSingleSuggestedEditItemShape[]) => {
    let result = [];
    result = data.filter(item => !(onlyShowProject && item.levelNumber !== 4));
    
    if(formData[beforeproposalConfig.BUDGET_METHOD] === 1 || formData[beforeproposalConfig.BUDGET_METHOD] === 3){
      result = result.filter(item => !(item.levelNumber === 5 && isHideLevel5Items));
    }else if(formData[beforeproposalConfig.BUDGET_METHOD] === 2){
      result = result.filter(item => !(item.levelNumber === 4 && isHideLevel5Items));
    }

    if(onlyShowProject){
      result.sort((a, b) => b.edit - a.edit);
    }
    return formatAndBindData(result);
  }

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
      accessNamesConfig.SUGGESTED__EDIT_PAGE
    );

    if (!havePermission) {
      return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
        variant: "error",
      });
    }

    setHaveSubmitedForm(true);

    if (
      checkHaveValue(formData, [
        beforeproposalConfig.YEAR,
        beforeproposalConfig.BUDGET_METHOD,
        beforeproposalConfig.AREA,
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
  }, [formData[beforeproposalConfig.YEAR], formData[beforeproposalConfig.AREA], formData[beforeproposalConfig.BUDGET_METHOD], formData[beforeproposalConfig.MOJRI], formData[beforeproposalConfig.MOTAVALLI], queryClient]);

  // base modal
//   const [isOpenBaseModal, setIsOpenBaseModal] = useState(false);

//   const getModalDataMutation = useMutation(beforeproposalapi.getModalBaseData);

//   const handleOpenBaseModal = () => {
//     // permission
//     const havePermission = checkHavePermission(
//       userLicenses,
//       [
//         accessNamesConfig.FIELD_YEAR,
//         accessNamesConfig.FIELD_AREA,
//         accessNamesConfig.FIELD_BUDGET_METHOD,
//       ],
//       accessNamesConfig.BUDGET__PROPOSAL_PAGE
//     );

//     if (!havePermission) {
//       return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
//         variant: "error",
//       });
//     }

//     setHaveSubmitedForm(true);

//     if (
//       checkHaveValue(formData, [
//         beforeproposalConfig.YEAR,
//         beforeproposalConfig.BUDGET_METHOD,
//         beforeproposalConfig.AREA,
//       ])
//     ) {
//       getModalDataMutation.mutate(formData);

//       setIsOpenBaseModal(true);
//     }
//   };

//   const handleDoneTaskBaseModal = (coding: string | number) => {
//     setCodingId(coding);
//     setIsOpenBaseModal(false);
//     submitMutation.mutate(formData);
//     setFilterText(String(coding));

//     // setTimeout(() => {
//     //   afterCloseAnyModal();
//     //   const top =
//     //     (document.querySelector("#table-container") as any)?.scrollTop +
//     //     (document.querySelector(`#c-${coding}`) as any).getBoundingClientRect()
//     //       ?.top -
//     //     500;

//     //   (document.querySelector("#table-container") as any)?.scrollTo?.(0, top);
//     // }, 500);
//   };

  const [excelLodaing, setExcelLodaing] = useState(false);

  const handleExcelClick = () => {
    setExcelLodaing(true);
    handleExcelForm();
  };

  const budgetMethodAccessItems = filedItemsGuard(
      budgetMethodItems,
      userLicenses,
      joinPermissions([
        accessNamesConfig.SUGGESTED__EDIT_PAGE,
        accessNamesConfig.FIELD_BUDGET_METHOD,
      ])
  );

  const submitMutation2 = useMutation(suggestedEditApi.getData);
  const handleExcelForm = async () => {

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
  
    suggestedEditXlsx({
      culmnsData: culmnsData,
      area: areaLabel,
      year: yearLabel,
      setExcelLodaing: setExcelLodaing,
      budgetMethod: formData[accessNamesConfig.FIELD_BUDGET_METHOD],
    });
  };

  const handlePrintForm = async () => {
    // if (printData.data.length) {
    //   const data = await submitMutation2.mutateAsync(formData);
    //
    //   const newData = filterData(data.data);
    //
    //   const areaLabel = getGeneralFieldItemArea(formData, 1);
    //   beforeProposalStimul({
    //     data: newData,
    //     footer: printData.footer,
    //     bottomFooter: [],
    //     area: areaLabel,
    //     kind: budgetMethodAccessItems[formData[beforeproposalConfig.BUDGET_METHOD] - 1].label,
    //     numberShow: "ریال",
    //   });
    // }
  };


  useEffect(() => {
      submitMutation.mutate(formData);
  }, [onlyShowProject, isHideLevel5Items])
  
  useEffect(() => {
    onchangeFormatDFata();
  }, [formData[generalFieldsConfig.numbers]]);
  
  const onchangeFormatDFata = async () => {
    const data = await submitMutation.mutate(formData);
  }
  
  return (
    <>
      <Box component="form" onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.SUGGESTED__EDIT_PAGE,
              accessNamesConfig.FIELD_YEAR,
            ])}
          >
            <Grid sm={2}>
              <YearInput
                setter={setFormData}
                value={formData[beforeproposalConfig.YEAR]}
                permissionForm={accessNamesConfig.SUGGESTED__EDIT_PAGE}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>
          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.SUGGESTED__EDIT_PAGE,
              accessNamesConfig.FIELD_AREA,
            ])}
          >
            <Grid sm={2}>
              <AreaInput
                setter={setFormData}
                value={formData[beforeproposalConfig.AREA]}
                permissionForm={accessNamesConfig.SUGGESTED__EDIT_PAGE}
                level={1}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>

          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.SUGGESTED__EDIT_PAGE,
              accessNamesConfig.FIELD_BUDGET_METHOD,
            ])}
          >
            <Grid sm={2}>
              <BudgetMethodInput
                setter={setFormData}
                value={formData[beforeproposalConfig.BUDGET_METHOD]}
                permissionForm={accessNamesConfig.SUGGESTED__EDIT_PAGE}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>
          
          {/*<Grid sm={2}>*/}
          {/*  <ProctorInput setter={setFormData} value={formData[beforeproposalConfig.MOTAVALLI]} name={beforeproposalConfig.MOTAVALLI}/>*/}
          {/*</Grid>*/}
          {/*<Grid sm={2}>*/}
          {/*  <ProjectNatureInput setter={setFormData} value={formData[beforeproposalConfig.MOJRI]} name={beforeproposalConfig.MOJRI}/>*/}
          {/*</Grid>*/}
          
          <Grid sm>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={submitMutation.isLoading}
            >
              نمایش
            </LoadingButton>
            {/* <Button
              variant="contained"
              onClick={handleOpenBaseModal}
              sx={{ mx: 1 }}
            >
              افزودن
            </Button> */}

            {/*<IconButton color="primary" >*/}
            {/*  <PrintIcon />*/}
            {/*</IconButton>*/}

            {/*<IconButton color="primary" onClick={handlePrintForm}>*/}
            {/*  <PrintIcon />*/}
            {/*</IconButton>*/}

            <IconButton color="primary" onClick={handleExcelClick}>
              <GetAppIcon />
            </IconButton>

            <WindowLoading
                active={
                    excelLodaing
                }
            />
          </Grid>

        </Grid>

        <FormGroup style={{display: 'flex', flexDirection: 'row',  paddingTop: 16}}>
          <div style={{width: '150px', paddingLeft: 16}}>
            <NumbersInput
                setter={setFormData}
                value={formData[generalFieldsConfig.numbers] as number}
            />
          </div>
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
      {/* <FixedModal
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
      </FixedModal> */}
    </>
  );
}

export default SuggestedEditForm;
