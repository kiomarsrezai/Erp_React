import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import { GetSingleSearchContractTaskItemShape } from "types/data/contracts/contracts-tasks-type";
import { TableHeadShape } from "types/table-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contractsTasksApi } from "api/contracts/contracts-tasks-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { contractsTasksConfig } from "config/features/contracts/conreacts-tasks-config";
import { convertToCalenderDate } from "helper/date-utils";

interface ContractsSearchModalProps {
  data: GetSingleSearchContractTaskItemShape[];
  onClose: () => void;
  setFormData: (state: any) => void;
  formData: any;
}

function ContractsSearchModal(props: ContractsSearchModalProps) {
  const { data, onClose, setFormData, formData } = props;

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

  // table data
  const baseDataMutation = useMutation(contractsTasksApi.getData, {
    onSuccess(data) {
      const value = data.data[0];
      setFormData({
        id: value.id,
        [contractsTasksConfig.area]: formData[contractsTasksConfig.area],
        [contractsTasksConfig.date]: convertToCalenderDate(value.date),
        [contractsTasksConfig.description]: value.description,
        [contractsTasksConfig.suppliers_id]: value.suppliersId,
        [contractsTasksConfig.suppliers_name]: value.suppliersName,
        [contractsTasksConfig.date_from]: convertToCalenderDate(value.dateFrom),
        [contractsTasksConfig.date_end]: convertToCalenderDate(value.dateEnd),
        [contractsTasksConfig.amount]: value.amount,
        [contractsTasksConfig.number]: value.number,
      });
      onClose();
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

  const tableData = formatTableData(data);

  return <FixedTable heads={tableHeads} data={tableData} notFixed />;
}

export default ContractsSearchModal;
