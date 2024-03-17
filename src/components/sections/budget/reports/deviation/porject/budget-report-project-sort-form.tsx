import { Unstable_Grid2 as Grid } from "@mui/material";
import Box from "@mui/material/Box";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";
import LoadingButton from "@mui/lab/LoadingButton";
import PrintIcon from "@mui/icons-material/Print";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";

import { FormEvent, ReactNode, useEffect, useState, MouseEvent } from "react";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { accessNamesConfig } from "config/access-names-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";
import {checkHavePermission, filedItemsGuard, joinPermissions} from "helper/auth-utils";
import AreaInput from "components/sections/inputs/area-input";
import { ravandChartConfig } from "config/features/report/chart/ravand-chart-config";
import { ravandChartApi } from "api/report/ravand-chart-api";
import YearInput from "components/sections/inputs/year-input";
import { abstructBudgetConfig } from "config/features/report/budget/abstruct-budget-config";
import BudgetKindDeviationInput from "components/sections/inputs/budget-kind-deviation-input";
import { budgetDeviationConfig } from "config/features/budget/report/budget-deviation-config";
import { budgetDeviationApi } from "api/report/budget-deviation-api";
import { budgetDivationStimul } from "stimul/budget/report/divation/budget-divation-stimul";
import {
  getGeneralFieldItemArea,
  getGeneralFieldItemBudgetKindDeviation,
  getGeneralFieldItemBudgetKindSort,
  getGeneralFieldItemProjectScale,
  getGeneralFieldItemYear,
} from "helper/export-utils";
import ProjectScaleInput from "components/sections/inputs/project-scale-input";
import { budgetProjectOprationConfig } from "config/features/budget/report/budget-project-opration-config";
import { budgetProjectOprationApi } from "api/report/budget-project-opration-api";
import { budgetProjectScaleStimul } from "stimul/budget/report/project-scale/budget-project-scale-stimul";
import BudgetSortKindInput from "components/sections/inputs/budget-sort-kind-input";
import { budgetReportShareStimul } from "stimul/budget/report/share/budget-share-stimul";
import { budgetProjectSortApi } from "api/report/budget-project-sort-api";
import { budgetProjectSortConfig } from "config/features/budget/report/budget-project-sort-config";
import {FormGroup, InputAdornment, Popover, TextField} from "@mui/material";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import NumbersInput from "../../../../inputs/numbers-input";
import {budgetMethodItems, generalFieldsConfig} from "../../../../../../config/features/general-fields-config";
import GetAppIcon from "@mui/icons-material/GetApp";
import {suggestedEditApi} from "../../../../../../api/budget/suggested-edit-api";
import {suggestedEditXlsx} from "../../../../../../stimul/budget/suggestedEdit/suggested-edit-xlsx";
import {projectSortXlsx} from "../../../../../../stimul/budget/report/sort/project-sort-xlsx";
import WindowLoading from "../../../../../ui/loading/window-loading";

interface BudgetReportProjectSortFormProps {
  tabRender?: ReactNode;
  formData: any;
  setFormData: any;
  formatAndBindData: any,
  printData: {
    data: any[];
    footer: any[];
  };
}

function BudgetReportProjectSortForm(props: BudgetReportProjectSortFormProps) {
  const { tabRender, formData, setFormData, printData, formatAndBindData } = props;

  const userLicenses = userStore((state) => state.permissions);

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);

  const queryClient = useQueryClient();
  const [submitedData, setSubmitedData] = useState<any[]>([]);
  const submitMutation = useMutation(budgetProjectSortApi.getData, {
    onSuccess: (data) => {
      // queryClient.setQueryData(reactQueryKeys.budget.sort.getData, data);
      setSubmitedData(formatAndBindData(data.data));
    },
  });

  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    const filteredData = submitedData.filter(
      (item) =>
        item.description.includes(filterText) || item.code.includes(filterText)
    );
    queryClient?.setQueryData(reactQueryKeys.budget.sort.getData, {
      data: filteredData,
    });
  }, [submitedData, filterText]);

  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.budget.sort.getData, {
      data: [],
    });
  }, [formData, queryClient]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // permission
    const havePermission = checkHavePermission(
      userLicenses,
      [accessNamesConfig.FIELD_AREA, accessNamesConfig.FIELD_YEAR],
      joinPermissions([
        accessNamesConfig.BUDGET__REPORT_PAGE,
        accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SORT,
      ])
    );

    if (!havePermission) {
      return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
        variant: "error",
      });
    }

    setHaveSubmitedForm(true);

    if (
      checkHaveValue(formData, [
        budgetDeviationConfig.area,
        budgetDeviationConfig.year,
      ])
    ) {
      submitMutation.mutate(formData);
    }
  };

  // print
  const handlePrintForm = () => {
    if (printData.data.length) {
      const filteredData = [...printData.data].splice(0, rowPrintCount);
      const sumMosavab = sumFieldsInSingleItemData(filteredData, "mosavab");
      const sumExpense = sumFieldsInSingleItemData(filteredData, "expense");
      const sumCreditAmount = sumFieldsInSingleItemData(
        filteredData,
        "creditAmount"
      );

      const tableFooter: any = {
        number: "جمع",
        "colspan-number": 3,
        code: null,
        areaName: "",
        percent: getPercent(sumExpense, sumMosavab),
        description: null,
        mosavab: sumMosavab,
        expense: sumExpense,
        creditAmount: sumCreditAmount,
        percentCreditAmount: getPercent(sumCreditAmount, sumMosavab),
      };

      const yearLabel = getGeneralFieldItemYear(formData, 1);
      const areaLabel = getGeneralFieldItemArea(formData, 3);
      const budgetKindLabel = getGeneralFieldItemBudgetKindSort(formData);
      budgetReportShareStimul({
        data: filteredData,
        footer: tableFooter,
        year: yearLabel,
        area: areaLabel,
        kind: budgetKindLabel,
        numberShow: "ریال",
      });
    }
  };

  // archor
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handlePrintClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openAnchorEl = Boolean(anchorEl);
  const [rowPrintCount, setRowPrintCount] = useState(0);
  
  
  useEffect(() => {
    onchangeFormatDFata();
  }, [formData[generalFieldsConfig.numbers]]);
  
  useEffect(() => {
    if(!formData[generalFieldsConfig.numbers]){
      formData[generalFieldsConfig.numbers] = 1;
    }
  }, []);
  
  const onchangeFormatDFata = async () => {
    const data = await submitMutation.mutate(formData);
  }
  
  const [excelLodaing, setExcelLodaing] = useState(false);
  const handleExcelClick = () => {
    setExcelLodaing(true);
    handleExcelForm();
  };
  
  // const budgetMethodAccessItems = filedItemsGuard(
  //     budgetMethodItems,
  //     userLicenses,
  //     joinPermissions([
  //       accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SORT,
  //       accessNamesConfig.FIELD_BUDGET_METHOD,
  //     ])
  // );
  
  const submitMutation2 = useMutation(budgetProjectSortApi.getData);
  const handleExcelForm = async () => {
    let culmnsData: any = {};
    budgetMethodItems.forEach((item) => {
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

            const newData = formatAndBindData(data.data);

            culmnsData = {
              ...culmnsData,
              [item]: newData,
            };
          })
      );
    } catch {}
    

    const yearLabel = getGeneralFieldItemYear(formData, 1);
    const areaLabel = getGeneralFieldItemArea(formData, 1);
  
    projectSortXlsx({
      culmnsData: culmnsData,
      area: areaLabel,
      year: yearLabel,
      setExcelLodaing: setExcelLodaing,
      budgetMethod: formData[accessNamesConfig.FIELD_BUDGET_METHOD],
    });
  };
  
  
  return (
    <Box
      component="form"
      padding={1}
      onSubmit={handleSubmit}
      sx={{ bgcolor: "grey.200" }}
    >
      <Grid container spacing={2}>
        {tabRender && <Grid xs={12}>{tabRender}</Grid>}

        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__REPORT_PAGE,
            accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SORT,
            accessNamesConfig.FIELD_YEAR,
          ])}
        >
          <Grid xs={2}>
            <YearInput
              setter={setFormData}
              value={formData[budgetProjectSortConfig.year] as number}
              permissionForm={joinPermissions([
                accessNamesConfig.BUDGET__REPORT_PAGE,
                accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SORT,
              ])}
              showError={haveSubmitedForm}
            />
          </Grid>
        </SectionGuard>

        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__REPORT_PAGE,
            accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SORT,
            accessNamesConfig.FIELD_AREA,
          ])}
        >
          <Grid lg={2}>
            <AreaInput
              setter={setFormData}
              value={formData[budgetProjectSortConfig.area]}
              permissionForm={joinPermissions([
                accessNamesConfig.BUDGET__REPORT_PAGE,
                accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SORT,
              ])}
              level={3}
              showError={haveSubmitedForm}
            />
          </Grid>
        </SectionGuard>

        {/* <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__REPORT_PAGE,
            accessNamesConfig.BUDGET__REPORT_PAGE_PROJECT_SORT,
            accessNamesConfig.FIELD_AREA,
          ])}
        > */}
        <Grid lg={2}>
          <BudgetMethodInput
            setter={setFormData}
            value={formData[budgetProjectSortConfig.budget]}
            // permissionForm={joinPermissions([
            //   accessNamesConfig.BUDGET__REPORT_PAGE,
            //   accessNamesConfig.BUDGET__REPORT_PAGE_REVENUE,
            // ])}
            showError={haveSubmitedForm}
          />
        </Grid>
        {/* </SectionGuard> */}

        {/* <Grid xs={2}>
          <BudgetSortKindInput
            setter={setFormData}
            value={formData[budgetProjectSortConfig.kind] as any}
          />
        </Grid> */}

        <Grid xs>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={submitMutation.isLoading}
            sx={{ mr: 1 }}
          >
            نمایش
          </LoadingButton>

          <IconButton color="primary" onClick={handlePrintClick}>
            <PrintIcon />
          </IconButton>
  
          <IconButton color="primary" onClick={handleExcelClick}>
            <GetAppIcon />
          </IconButton>
  
          <WindowLoading active={excelLodaing}/>

          <Popover
            open={openAnchorEl}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box sx={{ py: 1, px: 2, width: 150 }}>
              <TextField
                id="code-input"
                label="تعداد چاپ"
                variant="outlined"
                size="small"
                value={rowPrintCount}
                onChange={(e) => setRowPrintCount(+e.target.value)}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handlePrintForm}
                        color="primary"
                        size="small"
                      >
                        <CheckIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
              />
            </Box>
          </Popover>
        </Grid>
        <div>
          <div style={{width: '150px', paddingTop: 8, paddingLeft: 16}}>
            <NumbersInput
                setter={setFormData}
                value={formData[generalFieldsConfig.numbers] as number}
            />
          </div>
        </div>
        <div>
          <div style={{width: '150px', paddingTop: 8}}>
            <TextField
                size="small"
                label="جستجو"
                sx={{ width: "150px" }}
                value={filterText}
                variant="outlined"
                onChange={(e) => setFilterText(e.target.value)}
                fullWidth
            />
          </div>
        </div>
      </Grid>
  
    </Box>
  );
}

export default BudgetReportProjectSortForm;
