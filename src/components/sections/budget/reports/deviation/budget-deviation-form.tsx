import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";
import LoadingButton from "@mui/lab/LoadingButton";
import PrintIcon from "@mui/icons-material/Print";
import IconButton from "@mui/material/IconButton";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { accessNamesConfig } from "config/access-names-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";
import { checkHavePermission, joinPermissions } from "helper/auth-utils";
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
  getGeneralFieldItemYear,
} from "helper/export-utils";
import NumbersInput from "../../../inputs/numbers-input";
import {
  budgetKindDeviationItems,
  budgetMethodItems,
  generalFieldsConfig
} from "../../../../../config/features/general-fields-config";
import GetAppIcon from "@mui/icons-material/GetApp";
import WindowLoading from "../../../../ui/loading/window-loading";
import {budgetDivationXlsx} from "../../../../../stimul/budget/report/divation/budget-divation-xlsx";

interface BudgetReportDeviationFormProps {
  formData: any;
  setFormData: (prevState: any) => void;
  inputRender?: ReactNode;
  tabRender?: ReactNode;
  formatAndBindData: any;
  printData: {
    data: any[];
    footer: any[];
  };
}

function BudgetReportDeviationForm(props: BudgetReportDeviationFormProps) {
  const { formData, setFormData, inputRender, tabRender, printData, formatAndBindData } = props;

  const userLicenses = userStore((state) => state.permissions);
  // form
  const queryClient = useQueryClient();
  const submitMutation = useMutation(budgetDeviationApi.getData, {
    onSuccess: (data) => {
      data.data = formatAndBindData(data.data);
      queryClient.setQueryData(reactQueryKeys.budget.deviation, data);
    },
  });

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // permission
    const havePermission = checkHavePermission(
      userLicenses,
      [accessNamesConfig.FIELD_AREA, accessNamesConfig.FIELD_YEAR],
      joinPermissions([
        accessNamesConfig.BUDGET__REPORT_PAGE,
        accessNamesConfig.BUDGET__REPORT_PAGE_DEVIATION,
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

  // reset
  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.budget.deviation, {
      data: [],
    });
  }, [
    formData[budgetDeviationConfig.area],
    formData[budgetDeviationConfig.year],
  ]);

  // print
  const handlePrintForm = () => {
    if (printData.data.length) {
      const yearLabel = getGeneralFieldItemYear(formData, 1);
      const areaLabel = getGeneralFieldItemArea(formData, 3);
      const budgetKindLabel = getGeneralFieldItemBudgetKindDeviation(formData);
      // const numberLabel = getGeneralFieldItemNumber(formData);
      budgetDivationStimul({
        data: printData.data,
        footer: printData.footer,
        year: yearLabel,
        area: areaLabel,
        kind: budgetKindLabel,
        numberShow: "ریال",
      });
    }
  };
  
  
  const [excelLodaing, setExcelLodaing] = useState(false);
  const handleExcelClick = () => {
    setExcelLodaing(true);
    handleExcelForm();
  };
  
  const submitMutation2 = useMutation(budgetDeviationApi.getData);
  const handleExcelForm = async () => {
    let culmnsData: any = {};
    budgetKindDeviationItems.forEach((item) => {
      culmnsData[item.value] = [];
    });

    const culmnKeys = Object.keys(culmnsData);
    
    try {
      const data = await submitMutation2.mutateAsync({
        ...formData,
      });
      const result = formatAndBindData(data.data);
      culmnKeys.map(async (item) => {
        let newResult = [];
        
        if(parseInt(item) == 1){
           newResult = result.filter((row: any) => row.percmosavab <= 110)
        }else if(parseInt(item) == 2){
           newResult = result.filter((row: any) => row.percmosavab > 110)
        }else if(parseInt(item) == 3){
          newResult = result;
        }
        culmnsData = {
          ...culmnsData,
          [item]: newResult,
        };
      })
    } catch {}
    
    const yearLabel = getGeneralFieldItemYear(formData, 1);
    const areaLabel = getGeneralFieldItemArea(formData, 3);

    budgetDivationXlsx({
      culmnsData: culmnsData,
      area: areaLabel,
      year: yearLabel,
      setExcelLodaing: setExcelLodaing,
    });
  };
  
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
  
  return (
    <Box
      component="form"
      padding={1}
      onSubmit={handleSubmit}
      sx={{ bgcolor: "grey.200" }}
    >
      <Grid container spacing={2}>
        {tabRender && <Grid xs={12}>{tabRender}</Grid>}
        {inputRender && <Grid xs={2}>{inputRender}</Grid>}

        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__REPORT_PAGE,
            accessNamesConfig.BUDGET__REPORT_PAGE_DEVIATION,
            accessNamesConfig.FIELD_YEAR,
          ])}
        >
          <Grid xs={2}>
            <YearInput
              setter={setFormData}
              value={formData[budgetDeviationConfig.year] as number}
              permissionForm={joinPermissions([
                accessNamesConfig.BUDGET__REPORT_PAGE,
                accessNamesConfig.BUDGET__REPORT_PAGE_DEVIATION,
              ])}
              showError={haveSubmitedForm}
            />
          </Grid>
        </SectionGuard>

        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__REPORT_PAGE,
            accessNamesConfig.BUDGET__REPORT_PAGE_DEVIATION,
            accessNamesConfig.FIELD_AREA,
          ])}
        >
          <Grid lg={2}>
            <AreaInput
              setter={setFormData}
              value={formData[budgetDeviationConfig.area]}
              permissionForm={joinPermissions([
                accessNamesConfig.BUDGET__REPORT_PAGE,
                accessNamesConfig.BUDGET__REPORT_PAGE_DEVIATION,
              ])}
              level={3}
              showError={haveSubmitedForm}
            />
          </Grid>
        </SectionGuard>

        <Grid xs={2}>
          <BudgetKindDeviationInput
            setter={setFormData}
            value={formData[budgetDeviationConfig.kind] as number}
            showError={haveSubmitedForm}
          />
        </Grid>

        <div style={{height: 44, display: 'flex', alignItems: 'center', paddingTop: 10}}>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={submitMutation.isLoading}
            sx={{ mr: 1 }}
          >
            نمایش
          </LoadingButton>

          <IconButton color="primary" onClick={handlePrintForm}>
            <PrintIcon />
          </IconButton>
  
          <IconButton color="primary" onClick={handleExcelClick}>
            <GetAppIcon />
          </IconButton>
  
          <WindowLoading active={excelLodaing}/>
  
          <div style={{width: 150}}>
            <NumbersInput
                setter={setFormData}
                value={formData[generalFieldsConfig.numbers] as number}
            />
          </div>
        </div>
      </Grid>
    </Box>
  );
}

export default BudgetReportDeviationForm;
