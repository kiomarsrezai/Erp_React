import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import { GetSingleSearchContractTaskItemShape } from "types/data/contracts/contracts-tasks-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contractsTasksApi } from "api/contracts/contracts-tasks-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { contractsTasksConfig } from "config/features/contracts/conreacts-tasks-config";
import { convertToCalenderDate } from "helper/date-utils";
import SectionGuard from "components/auth/section-guard";
import { joinPermissions } from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";
import { Unstable_Grid2 as Grid } from "@mui/material";
import AreaInput from "components/sections/inputs/area-input";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

interface ContractsSearchModalProps {
  data: GetSingleSearchContractTaskItemShape[];
  onClose: () => void;
  setFormData: (state: any) => void;
  formData: any;
}

function ContractsSearchModal(props: ContractsSearchModalProps) {
  const { onClose, setFormData, formData } = props;

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "شماره",
      name: "number",
    },
    {
      title: "شرح",
      name: "description",
    },
    {
      title: "تاریخ",
      name: "dateShamsi",
    },
    {
      title: "پیمانکار",
      name: "suppliersName",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // top heads
  const submitMutation = useMutation(contractsTasksApi.search, {});

  const handleClickSearchBtn = () => {
    submitMutation.mutate(formData);
  };

  const tableHeadGroup: TableHeadGroupShape = [
    {
      title: (
        <Grid container spacing={2}>
          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.CONTRACT__REPORT_PAGE,
              accessNamesConfig.FIELD_AREA,
            ])}
          >
            <Grid sm={3}>
              <AreaInput
                setter={setFormData}
                value={formData[contractsTasksConfig.area]}
                permissionForm={accessNamesConfig.CONTRACT__REPORT_PAGE}
                level={3}
                // showError={haveSubmitedForm}
              />
            </Grid>

            <Grid sm>
              <LoadingButton
                onClick={handleClickSearchBtn}
                loading={submitMutation.isLoading}
                variant="contained"
              >
                جستجو
              </LoadingButton>
            </Grid>
          </SectionGuard>
        </Grid>
      ),
      colspan: 9,
    },
  ];

  // table data
  const queryClient = useQueryClient();
  const readAreaMutation = useMutation(contractsTasksApi.areaRead, {
    onSuccess(data) {
      queryClient.setQueryData(reactQueryKeys.contracts.tasks.getArea, data);
      onClose();
    },
  });

  const baseDataMutation = useMutation(contractsTasksApi.getData, {
    onSuccess(data) {
      const value = data.data[0];
      setFormData({
        id: value.id,
        [contractsTasksConfig.area]: formData[contractsTasksConfig.area],
        [contractsTasksConfig.date]: convertToCalenderDate(value.date),
        [contractsTasksConfig.description]: value.description,
        [contractsTasksConfig.doing_method]: value.doingMethodId,
        [contractsTasksConfig.suppliers_id]: value.suppliersId,
        [contractsTasksConfig.suppliers_name]: value.suppliersName,
        [contractsTasksConfig.date_from]: convertToCalenderDate(value.dateFrom),
        [contractsTasksConfig.date_end]: convertToCalenderDate(value.dateEnd),
        [contractsTasksConfig.amount]: value.amount,
        [contractsTasksConfig.number]: value.number,
      });

      readAreaMutation.mutate({
        id: value.id,
      });
    },
  });
  const handleClickCheckIcon = (item: GetSingleSearchContractTaskItemShape) => {
    baseDataMutation.mutate({
      id: item.id,
    });
  };

  const actionButtons = (row: GetSingleSearchContractTaskItemShape) => (
    <IconButton
      color="primary"
      size="small"
      onClick={() => handleClickCheckIcon(row)}
    >
      <CheckIcon />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: GetSingleSearchContractTaskItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      //   code: item.number,
      //   date: item.dates,
      actions: () => actionButtons(item),
    }));

    return formatedData;
  };

  const tableData = formatTableData(submitMutation.data?.data || []);

  return (
    <FixedTable
      heads={tableHeads}
      data={tableData}
      headGroups={tableHeadGroup}
      notFixed
    />
  );
}

export default ContractsSearchModal;
