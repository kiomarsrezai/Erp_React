import { Unstable_Grid2 as Grid } from "@mui/material";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import SectionGuard from "components/auth/section-guard";
import userStore from "hooks/store/user-store";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from "@mui/icons-material/Check";
import ListIcon from "@mui/icons-material/List";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";
import { Button, Popover } from "@mui/material";

import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { revenueChartFormConfig } from "config/features/revenue-chart-config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { accessNamesConfig } from "config/access-names-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { checkHaveValue } from "helper/form-utils";
import {
  checkHavePermission,
  filedItemsGuard,
  joinPermissions,
} from "helper/auth-utils";
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
  getGeneralFieldItemAreaFromId,
  getGeneralFieldItemBudgetKindDeviation,
  getGeneralFieldItemMonth,
  getGeneralFieldItemProjectScale,
  getGeneralFieldItemYear,
} from "helper/export-utils";
import ProjectScaleInput from "components/sections/inputs/project-scale-input";
import { budgetProjectOprationConfig } from "config/features/budget/report/budget-project-opration-config";
import { budgetProjectOprationApi } from "api/report/budget-project-opration-api";
import { budgetProjectScaleStimul } from "stimul/budget/report/project-scale/budget-project-scale-stimul";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import { Checkbox, FormControlLabel, FormGroup, Box } from "@mui/material";
import {
  budgetMethodItems,
  centerItems,
  generalFieldsConfig,
  organItems,
  organItems2,
} from "config/features/general-fields-config";
import { budgetReportExpenseConfig } from "config/features/budget/report/budget-report-expense-config";
import { budgetReportExpenseApi } from "api/report/budget-expense-api";
import NumbersInput from "components/sections/inputs/numbers-input";
import { convertNumbers } from "helper/number-utils";
import MonthInput from "components/sections/inputs/month-input";
import { budgetExpenseStimul } from "stimul/budget/report/expense/budget-expense-stimul";
import WindowLoading from "components/ui/loading/window-loading";
import { budgetExpenseXlsx } from "stimul/budget/report/expense/budget-expense-xlsx";
import FixedModal from "components/ui/modal/fixed-modal";
import { areaGeneralApi } from "api/general/area-general-api";
import { FlotingLabelTextfieldItemsShape } from "types/input-type";
import { budgetExpenseBaseXlsx } from "stimul/budget/report/expense/budget-expense-base-xlsx";

interface BudgetReportExpenseFormProps {
  formData: any;
  setFormData: (prevState: any) => void;
  inputRender?: ReactNode;
  tabRender?: ReactNode;
  printData: {
    data: any[];
    footer: any[];
    bottomFooter: any[];
    moreBottomFooter: any[];
  };
}

function BudgetReportExpenseForm(props: BudgetReportExpenseFormProps) {
  const { formData, setFormData, inputRender, tabRender, printData } = props;

  const userLicenses = userStore((state) => state.permissions);

  const formatAndBindData = (data?: any[]) => {
    const formatedData = convertNumbers(
      data || submitMutation.data?.data || [],
      [
        "mosavabRevenue",
        "expenseRevenue",

        "mosavabCurrent",
        "expenseCurrent",

        "mosavabCivil",
        "expenseCivil",
        "creditAmountCivil",

        "mosavabFinancial",
        "expenseFinancial",

        "mosavabSanavati",
        "expenseSanavati",

        "mosavabPayMotomarkez",
        "expensePayMotomarkez",

        "mosavabDar_Khazane",
        "expenseDar_Khazane",
        
        "mosavabNeyabati",
        "expenseMonthNeyabati",
        
        "resoures",

        "balance",
        
        "creditCurrent",
        "expenseMonthRevenue",
        "expenseMonthDarAzKhazane",
        "expenseMonthCurrent",
      ],
      formData[generalFieldsConfig.numbers]
    );

    queryClient.setQueryData(reactQueryKeys.budget.expense, {
      data: formatedData,
    });
  };

  useEffect(() => {
    formatAndBindData();
  }, [formData[generalFieldsConfig.numbers]]);

  // form
  const queryClient = useQueryClient();
  const submitMutation = useMutation(budgetReportExpenseApi.getData, {
    onSuccess: (data) => {
      // queryClient.setQueryData(reactQueryKeys.budget.expense, data);
      // formatAndBindData(data.data);
    },
  });

  const [haveSubmitedForm, setHaveSubmitedForm] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // permission
    const havePermission = checkHavePermission(
      userLicenses,
      [accessNamesConfig.FIELD_ORGAN, accessNamesConfig.FIELD_YEAR],
      joinPermissions([
        accessNamesConfig.BUDGET__REPORT_PAGE,
        accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN,
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
        // budgetReportExpenseConfig.organ,
        budgetReportExpenseConfig.year,
        budgetReportExpenseConfig.month,
      ])
    ) {
      const data1 = await submitMutation.mutateAsync({
        ...formData,
        [budgetReportExpenseConfig.organ]: 1,
      });
      const data2 = await submitMutation.mutateAsync({
        ...formData,
        [budgetReportExpenseConfig.organ]: 2,
      });

      formatAndBindData([...data1?.data, ...data2?.data]);
    }
  };

  // reset
  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.budget.expense, {
      data: [],
    });
  }, [
    // formData[budgetReportExpenseConfig.organ],
    formData[budgetReportExpenseConfig.year],
    formData[budgetReportExpenseConfig.month],
  ]);

  // print
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  // const [isCancel, setIsCancel] = useState(false);

  const handleCancelClick = () => {
    // setIsCancel(true)
    window.location.reload();
  };

  const handleExcelClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openAnchorEl = Boolean(anchorEl);

  const getExcelManateghMutation = useMutation(
    budgetReportExpenseApi.getExcelManateghData
  );
  const getExcelSazmanMutation = useMutation(
    budgetReportExpenseApi.getExcelSazmanData
  );

  const areaQuery = useQuery(["general-area", 3], () =>
    areaGeneralApi.getData(3)
  );

  const inputItems: FlotingLabelTextfieldItemsShape = (
    areaQuery.data
      ? areaQuery.data.data.map((item) => ({
          label: item.areaName,
          value: item.id,
        }))
      : []
  ).filter((item) => item.value !== 10);

  const areaItems = filedItemsGuard(
    inputItems,
    userLicenses,
    joinPermissions([
      accessNamesConfig.BUDGET__REPORT_PAGE,
      accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN,
      accessNamesConfig.FIELD_AREA,
    ])
  );

  const [selectedAreas, setSelectedAreas] = useState<any>({});
  const toggleItem = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedAreas((prevState: any) => {
      prevState[value] = checked;

      return { ...prevState, [value]: checked };
    });
  };

  const toggleAllItem = () => {
    setSelectedAreas(() => {
      let newValue: any = {};

      areaItems.forEach((areaItem) => {
        newValue[areaItem.value] = !isAllClicked;
      });

      return newValue;
    });
  };

  const isAllClicked = areaItems.reduce((preveius: any, curent: any) => {
    if (preveius === false) return false;

    return selectedAreas?.[curent.value] === true;
  }, true);

  const [excelLodaing, setExcelLodaing] = useState(false);
  const handlePrintClick = async () => {
    setExcelLodaing(true);

    let areas: any = [];

    for (const key in selectedAreas) {
      const value = selectedAreas?.[key];
      if (value === true) {
        areas.push(+key);
      }
    }

    areas.forEach((item: any) => {
      handlePrintForm(item);
    });
    setAnchorEl(null);
  };

  const handlePrintForm = async (areaId: number) => {
    // setIsCancel(false);
    let culmnsData: any = {};
    budgetMethodItems.forEach((item) => {
      culmnsData[item.value] = [];
    });

    const culmnKeys = Object.keys(culmnsData);

    try {
      await Promise.all(
        culmnKeys.map(async (item) => {
          const data = await (areaId < 10
            ? getExcelManateghMutation
            : getExcelSazmanMutation
          ).mutateAsync({
            budgetProcessId: item,
            areaId: areaId,
            [generalFieldsConfig.MONTH]:
              formData[budgetReportExpenseConfig.month],
            yearId: formData[budgetReportExpenseConfig.year],
          });

          culmnsData = {
            ...culmnsData,
            [item]: data.data,
          };
        })
      );
    } catch {}

    // if (printData.data.length) {
    const yearLabel = getGeneralFieldItemYear(formData, 1);
    const areaLabel = getGeneralFieldItemAreaFromId(3, areaId);
    const monthLabel = getGeneralFieldItemMonth(formData);

    setExcelLodaing(true);
    budgetExpenseXlsx({
      culmnsData: culmnsData,
      year: yearLabel,
      area: areaLabel,
      numberShow: "ریال",
      month: monthLabel,
      setExcelLodaing: setExcelLodaing,
    });
    // }
  };

  // excel
  const handleExcelBaseClick = () => {
    const yearLabel = getGeneralFieldItemYear(formData, 1);
    const monthLabel = getGeneralFieldItemMonth(formData);
    if (printData.data.length) {
      budgetExpenseBaseXlsx({
        data: printData.data,
        footer: [
          printData.footer[0],
          printData.bottomFooter[0],
          printData.moreBottomFooter[0],
        ],
        month: monthLabel,
        year: yearLabel,
      });
    }

    handleCloseAnchor2();
  };

  const [anchor2El, setAnchor2El] = useState<HTMLButtonElement | null>(null);

  const handleExcel2Click = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchor2El(event.currentTarget);
  };

  const handleCloseAnchor2 = () => {
    setAnchor2El(null);
  };

  const openAnchor2El = Boolean(anchor2El);

  return (
    <>
      <Box
        component="form"
        padding={1}
        onSubmit={handleSubmit}
        sx={{ bgcolor: "grey.200" }}
      >
        <Box display={"none"}>
          <AreaInput setter={() => {}} value={undefined} level={3} />
        </Box>
        {/* <Grid container spacing={2}> */}
        {tabRender && <Grid xs={12}>{tabRender}</Grid>}
        {inputRender && <Grid xs={2}>{inputRender}</Grid>}

        <Box display={"flex"} gap={0.5} pt={2}>
          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__REPORT_PAGE,
              accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN,
              accessNamesConfig.FIELD_YEAR,
            ])}
          >
            <Box width={200}>
              {/* <Grid xs={2}> */}
              <YearInput
                setter={setFormData}
                value={formData[budgetReportExpenseConfig.year] as number}
                permissionForm={joinPermissions([
                  accessNamesConfig.BUDGET__REPORT_PAGE,
                  accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN,
                ])}
                showError={haveSubmitedForm}
              />
            </Box>
            {/* </Grid> */}
          </SectionGuard>

          {/* <Grid xs={2}> */}
          <Box width={200}>
            <MonthInput
              setter={setFormData}
              value={formData[budgetReportExpenseConfig.month] as number}
              showError={haveSubmitedForm}
            />
          </Box>
          {/* </Grid> */}

          {/* <Grid xs={2}> */}
          <Box width={200}>
            <NumbersInput
              setter={setFormData}
              value={formData[generalFieldsConfig.numbers] as number}
            />
          </Box>
          {/* </Grid> */}

          {/* <Grid xs> */}
          <LoadingButton
            variant="contained"
            type="submit"
            loading={submitMutation.isLoading}
            sx={{ mr: 1 }}
          >
            نمایش
          </LoadingButton>

          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__REPORT_PAGE,
              accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN,
              accessNamesConfig.FIELD_YEAR,
            ])}
          >
            <IconButton color="primary" onClick={handleExcelClick}>
              <ListIcon sx={{ mr: -1 }} />
              <GetAppIcon />
            </IconButton>
          </SectionGuard>

          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__REPORT_PAGE,
              accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN,
              accessNamesConfig.BUDGET__REPORT_PAGE_EXPENSE_ORGAN_BASE_EXCEL,
            ])}
          >
            <IconButton color="primary" onClick={handleExcel2Click}>
              <GetAppIcon />
            </IconButton>
          </SectionGuard>
        </Box>
        {/* </Grid> */}
        {/* </Grid> */}
      </Box>

      {/* excel confrim */}
      <Popover
        open={openAnchor2El}
        anchorEl={anchor2El}
        onClose={handleCloseAnchor2}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            py: 1,
            px: 2,
            width: 250,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          آیا مایل به دریافت خروجی اکسل هستید؟
          <IconButton
            onClick={handleExcelBaseClick}
            size="small"
            color="primary"
          >
            <CheckIcon />
          </IconButton>
        </Box>
      </Popover>

      {/* excel */}
      <Popover
        open={openAnchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box minWidth={"200px"} p={2} pt={0}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  value={"isAllClicked"}
                  checked={isAllClicked}
                  onChange={toggleAllItem}
                />
              }
              label={"همه"}
            />
            {areaItems.map((item) => (
              <FormControlLabel
                control={
                  <Checkbox
                    value={item.value}
                    checked={selectedAreas?.[item.value] === true}
                    onChange={toggleItem}
                  />
                }
                label={item.label}
              />
            ))}
          </FormGroup>

          <Button variant="contained" onClick={handlePrintClick} fullWidth>
            تایید
          </Button>
        </Box>
      </Popover>
      <WindowLoading
        active={
          getExcelManateghMutation.isLoading ||
          getExcelSazmanMutation.isLoading ||
          excelLodaing
        }
        canCancel={
          getExcelManateghMutation.isLoading ||
          getExcelSazmanMutation.isLoading ||
          excelLodaing
        }
        onCancel={handleCancelClick}
      />
    </>
  );
}

export default BudgetReportExpenseForm;
