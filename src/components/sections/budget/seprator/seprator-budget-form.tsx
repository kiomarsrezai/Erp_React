import { Unstable_Grid2 as Grid } from "@mui/material";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import YearInput from "components/sections/inputs/year-input";
import AreaInput from "components/sections/inputs/area-input";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import SectionGuard from "components/auth/section-guard";
import PrintIcon from "@mui/icons-material/Print";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";
import { Popover } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ApprovalIcon from "@mui/icons-material/Approval";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { accessNamesConfig } from "config/access-names-config";
import {
  checkHavePermission,
  filedItemsGuard,
  joinPermissions,
} from "helper/auth-utils";
import WindowLoading from "components/ui/loading/window-loading";
import { checkHaveValue } from "helper/form-utils";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import userStore from "hooks/store/user-store";
import {
  getGeneralFieldItemArea,
  getGeneralFieldItemBudgetMethod,
  getGeneralFieldItemMonth,
  getGeneralFieldItemYear,
} from "helper/export-utils";
import { budgetSepratorStimul } from "stimul/budget/seprator/budget-seprator-stimul";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import FixedModal from "components/ui/modal/fixed-modal";
import SepratorFixMosavabModal1 from "./fix/seprator-fix-mosavab-modal-1";
import { InputAdornment, TextField } from "@mui/material";
import { budgetSepratorXlsx } from "stimul/budget/seprator/budget-seprator-xlsx";
import {
  budgetMethodItems,
  generalFieldsConfig,
} from "config/features/general-fields-config";
import MonthInput from "components/sections/inputs/month-input";
import { budgetReportExpenseApi } from "api/report/budget-expense-api";
import SepratorBudgetConfirmationModal1 from "./confirmation/seprator-budget-confirmation-modal1";
import SepratorBudgetAbstructModal1 from "./abstruct/seprator-budget-abstruct-modal1";
import SepratorMonthlyModal from "./mothly/seprator-monthly-modal";
import monthlyIcon from "assets/images/icons/monthy.png";

interface SepratoeBudgetFormProps {
  formData: any;
  setFormData: any;
  printData: {
    data: any[];
    footer: any[];
    bottomFooter: any[];
  };
}
function SepratoeBudgetForm(props: SepratoeBudgetFormProps) {
  const { formData, setFormData, printData } = props;
  const userLicenses = userStore((state) => state.permissions);

  // submit
  const [filterText, setFilterText] = useState("");
  const queryClient = useQueryClient();
  const [submitedData, setSubmitedData] = useState<any[]>([]);

  const submitMutation = useMutation(sepratorBudgetApi.getData, {
    onSuccess: (data) => {
      setSubmitedData(data.data);
    },
  });

  useEffect(() => {
    const filteredData = submitedData.filter(
      (item) =>
        item.description.includes(filterText) || item.code.includes(filterText)
    );
    queryClient?.setQueryData(reactQueryKeys.budget.seprator.getData, {
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
      accessNamesConfig.BUDGET__SEPRATOR_PAGE
    );

    if (!havePermission) {
      return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
        variant: "error",
      });
    }

    setHaveSubmitedForm(true);

    if (
      checkHaveValue(formData, [
        sepratorBudgetConfig.YEAR,
        sepratorBudgetConfig.BUDGET_METHOD,
        sepratorBudgetConfig.AREA,
      ])
    ) {
      submitMutation.mutate(formData);
    }
  };

  // change state
  useEffect(() => {
    queryClient?.setQueryData(reactQueryKeys.budget.seprator.getData, {
      data: [],
    });
  }, [formData, queryClient]);

  // refesh form
  const [isOpenConfrimRefresh, setIsOpenConfrimRefresh] = useState(false);
  const refeshFormMutation = useMutation(sepratorBudgetApi.refeshForm, {
    onSuccess: () => {
      submitMutation.mutate(formData);
    },
  });

  const handleConfrimRefresh = () => {
    setIsOpenConfrimRefresh(false);
    refeshFormMutation.mutate(formData);
  };

  const handleRefeshForm = () => {
    setIsOpenConfrimRefresh(true);
  };

  // print
  const handlePrintForm = () => {
    if (printData.data.length) {
      const yearLabel = getGeneralFieldItemYear(formData, 1);
      const areaLabel = getGeneralFieldItemArea(formData, 2);
      const budgetKindLabel = getGeneralFieldItemBudgetMethod(formData);
      // const numberLabel = getGeneralFieldItemNumber(formData);
      budgetSepratorStimul({
        data: printData.data,
        footer: printData.footer,
        bottomFooter: [], //printData.bottomFooter,
        year: yearLabel,
        area: areaLabel,
        kind: budgetKindLabel,
        numberShow: "ریال",
      });
    }
  };

  // mosavab modal
  const [isOpenMosavabModal, setIsOpenMosavabModal] = useState(false);

  const mosavabMutation = useMutation(sepratorBudgetApi.fixMosavabRead);

  const openMosavabModal = () => {
    // permission
    const havePermission = checkHavePermission(
      userLicenses,
      [
        accessNamesConfig.FIELD_YEAR,
        accessNamesConfig.FIELD_AREA,
        accessNamesConfig.FIELD_BUDGET_METHOD,
      ],
      accessNamesConfig.BUDGET__SEPRATOR_PAGE
    );

    if (!havePermission) {
      return enqueueSnackbar(globalConfig.PERMISSION_ERROR_MESSAGE, {
        variant: "error",
      });
    }

    setHaveSubmitedForm(true);

    if (
      checkHaveValue(formData, [
        sepratorBudgetConfig.YEAR,
        sepratorBudgetConfig.BUDGET_METHOD,
        sepratorBudgetConfig.AREA,
      ])
    ) {
      mosavabMutation.mutate(formData);
      setIsOpenMosavabModal(true);
    }
  };

  const handleCloseModal = () => {
    setIsOpenMosavabModal(false);
    submitMutation.mutate(formData);
  };

  // excel
  const [excelLodaing, setExcelLodaing] = useState(false);

  const [monthData, setMonthData] = useState({
    [generalFieldsConfig.MONTH]: undefined,
  });

  // archor
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleExcelClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleConfrimExcel = () => {
    setExcelLodaing(true);
    handleExcelForm();
    setAnchorEl(null);
  };

  const openAnchorEl = Boolean(anchorEl);

  const budgetMethodAccessItems = filedItemsGuard(
    budgetMethodItems,
    userLicenses,
    joinPermissions([
      accessNamesConfig.BUDGET__SEPRATOR_PAGE,
      accessNamesConfig.FIELD_BUDGET_METHOD,
    ])
  );

  const getExcelManateghMutation = useMutation(
    budgetReportExpenseApi.getExcelManateghData
  );
  const getExcelSazmanMutation = useMutation(
    budgetReportExpenseApi.getExcelSazmanData
  );

  const handleExcelForm = async () => {
    let culmnsData: any = {};
    budgetMethodAccessItems.forEach((item) => {
      culmnsData[item.value] = [];
    });

    const culmnKeys = Object.keys(culmnsData);

    try {
      await Promise.all(
        culmnKeys.map(async (item) => {
          const data = await (formData[sepratorBudgetConfig.AREA] < 10
            ? getExcelManateghMutation
            : getExcelSazmanMutation
          ).mutateAsync({
            ...formData,
            [generalFieldsConfig.MONTH]: monthData[generalFieldsConfig.MONTH],
            [sepratorBudgetConfig.BUDGET_METHOD]: item,
          });

          culmnsData = {
            ...culmnsData,
            [item]: data.data,
          };
        })
      );
    } catch {}

    const yearLabel = getGeneralFieldItemYear(formData, 1);
    const areaLabel = getGeneralFieldItemArea(formData, 2);
    const monthLabel = getGeneralFieldItemMonth(monthData);

    budgetSepratorXlsx({
      culmnsData: culmnsData,
      area: areaLabel,
      month: monthLabel,
      year: yearLabel,
      setExcelLodaing: setExcelLodaing,
    });
  };

  // confirm modal
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [confrimModalTitle, setConfrimModalTitle] = useState("");
  const confrimDataMutation = useMutation(sepratorBudgetApi.confrimDataRead);
  const handleOpenConfrimModal = () => {
    const yearLabel = getGeneralFieldItemYear(formData, 1);
    const areaLabel = getGeneralFieldItemArea(formData, 2);
    const monthLabel = getGeneralFieldItemMonth(monthData);

    setConfrimModalTitle(`تایید کنندگان - ${yearLabel}  - ${monthLabel}`);
    confrimDataMutation.mutate({
      [generalFieldsConfig.MONTH]: monthData[generalFieldsConfig.MONTH],
      [sepratorBudgetConfig.YEAR]: formData[sepratorBudgetConfig.YEAR],
    });
    setIsOpenConfirmModal(true);
  };
  const handleCloseConfirmModal = () => {
    setIsOpenConfirmModal(false);
  };

  // abstruct modal
  const [isOpenAbstructModal, setIsOpenAbstructModal] = useState(false);

  const abstructBudgetMutation = useMutation(
    sepratorBudgetApi.abstructBudgetRead
  );

  const handleOpenAbstructModal = () => {
    abstructBudgetMutation.mutate({
      [sepratorBudgetConfig.YEAR]: formData[sepratorBudgetConfig.YEAR],
      [sepratorBudgetConfig.AREA]: formData[sepratorBudgetConfig.AREA],
    });
    setIsOpenAbstructModal(true);
  };

  const handleCloseAbstructModal = () => {
    setIsOpenAbstructModal(false);
  };

  // monthly modal
  const [isOpenMonthlyModal, setIsOpenMonthlyModal] = useState(false);

  const monthlyMutation = useMutation(
    ["seprator-get-monthly"],
    sepratorBudgetApi.monthlyPerformance
  );

  const handleOpenMonthlyModal = () => {
    monthlyMutation.mutate({
      [sepratorBudgetConfig.YEAR]: formData[sepratorBudgetConfig.YEAR],
      [sepratorBudgetConfig.AREA]: formData[sepratorBudgetConfig.AREA],
      [sepratorBudgetConfig.BUDGET_METHOD]:
        formData[sepratorBudgetConfig.BUDGET_METHOD],
    });
    setIsOpenMonthlyModal(true);
  };

  return (
    <>
      <Box component="form" onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__SEPRATOR_PAGE,
              accessNamesConfig.FIELD_YEAR,
            ])}
          >
            <Grid sm={2}>
              <YearInput
                setter={setFormData}
                value={formData[sepratorBudgetConfig.YEAR]}
                permissionForm={accessNamesConfig.BUDGET__SEPRATOR_PAGE}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>
          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__SEPRATOR_PAGE,
              accessNamesConfig.FIELD_AREA,
            ])}
          >
            <Grid sm={2}>
              <AreaInput
                setter={setFormData}
                value={formData[sepratorBudgetConfig.AREA]}
                permissionForm={accessNamesConfig.BUDGET__SEPRATOR_PAGE}
                showError={haveSubmitedForm}
              />
            </Grid>
          </SectionGuard>

          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__SEPRATOR_PAGE,
              accessNamesConfig.FIELD_BUDGET_METHOD,
            ])}
          >
            <Grid sm={2}>
              <BudgetMethodInput
                setter={setFormData}
                value={formData[sepratorBudgetConfig.BUDGET_METHOD]}
                permissionForm={accessNamesConfig.BUDGET__SEPRATOR_PAGE}
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
              type="button"
              sx={{ marginLeft: 1 }}
              onClick={handleRefeshForm}
            >
              به روز آوری از اخوان
            </Button>

            <SectionGuard
              permission={joinPermissions([
                accessNamesConfig.BUDGET__SEPRATOR_PAGE,
                accessNamesConfig.BUDGET__SEPRATOR_PAGE_FIX_MOSAVAB,
              ])}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={openMosavabModal}
                sx={{ marginLeft: 1 }}
              >
                ویرایش بودجه مصوب
              </Button>
            </SectionGuard>

            <IconButton color="primary" onClick={handlePrintForm}>
              <PrintIcon />
            </IconButton>

            <IconButton color="primary" onClick={handleExcelClick}>
              <GetAppIcon />
            </IconButton>
          </Grid>
          {/* <Grid sm={2}>
            <TextField
              size="small"
              label="جستجو"
              sx={{ width: "250px" }}
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
          </Grid> */}
          <Grid sm={"auto"}>
            <Box display={"flex"} justifyContent={"flex-end"}>
              <LoadingButton
                variant="text"
                onClick={handleOpenMonthlyModal}
                loading={monthlyMutation.isLoading}
              >
                <Box
                  component="img"
                  src={monthlyIcon}
                  sx={{ width: 30, height: 30 }}
                />
              </LoadingButton>
              <Button
                variant="contained"
                onClick={handleOpenAbstructModal}
                sx={{ marginLeft: 1 }}
              >
                خلاصه بودجه
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <FixedModal
        open={isOpenMosavabModal}
        loading={mosavabMutation.isLoading}
        handleClose={handleCloseModal}
      >
        <SepratorFixMosavabModal1
          data={mosavabMutation.data?.data || []}
          formData={formData}
        />
      </FixedModal>

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
          <MonthInput
            setter={setMonthData}
            value={monthData[generalFieldsConfig.MONTH] as any}
            yearlyLabel={true}
          />
          <IconButton onClick={handleConfrimExcel} size="small" color="primary">
            <CheckIcon />
          </IconButton>
          <IconButton
            onClick={handleOpenConfrimModal}
            size="small"
            color="primary"
          >
            <ApprovalIcon />
          </IconButton>
        </Box>
      </Popover>

      <WindowLoading
        active={
          refeshFormMutation.isLoading ||
          getExcelManateghMutation.isLoading ||
          getExcelSazmanMutation.isLoading ||
          excelLodaing
        }
      />

      <ConfrimProcessModal
        onCancel={() => setIsOpenConfrimRefresh(false)}
        onConfrim={handleConfrimRefresh}
        open={isOpenConfrimRefresh}
        text="آیا مایل به به روز آوری اطلاعات هستید؟"
      />

      {/* confirmation modal */}
      <FixedModal
        open={isOpenConfirmModal}
        handleClose={handleCloseConfirmModal}
        title={confrimModalTitle}
      >
        <SepratorBudgetConfirmationModal1
          data={confrimDataMutation.data?.data || []}
          formData={formData}
          monthData={monthData}
        />
      </FixedModal>

      {/* abstruct */}
      <FixedModal
        open={isOpenAbstructModal}
        handleClose={handleCloseAbstructModal}
        title="خلاصه بودجه"
        // maxHeight="90%"
        loading={abstructBudgetMutation.isLoading}
      >
        <SepratorBudgetAbstructModal1
          data={abstructBudgetMutation.data?.data || []}
        />
      </FixedModal>

      {/* monthly */}
      <FixedModal
        open={isOpenMonthlyModal}
        handleClose={() => {
          setIsOpenMonthlyModal(false);
        }}
        title={"عملکرد ماهیانه"}
        maxWidth="90%"
        maxHeight="80%"
      >
        <SepratorMonthlyModal data={monthlyMutation.data?.data || []} />
      </FixedModal>
    </>
  );
}

export default SepratoeBudgetForm;
