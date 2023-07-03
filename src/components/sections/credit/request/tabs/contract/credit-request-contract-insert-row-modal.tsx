import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import FixedModal from "components/ui/modal/fixed-modal";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { ChangeEvent, ReactNode, useState } from "react";
import {
  CreditReadRequestBudgetRowShape,
  CreditRequestReadContractModalTableShape,
} from "types/data/credit/credit-request-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creditRequestApi } from "api/credit/credit-request-api";
import { creditRequestConfig } from "config/features/credit/credit-request-config";
import { reactQueryKeys } from "config/react-query-keys-config";
import { Box, Checkbox } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import BudgetMethodInput from "components/sections/inputs/budget-method-input";
import { generalFieldsConfig } from "config/features/general-fields-config";
import AreaInput from "components/sections/inputs/area-input";
import { LoadingButton } from "@mui/lab";

interface TableDataItemShape {
  number: ReactNode;
  year: ReactNode;
  description: ReactNode;
  price: ReactNode;
  code: ReactNode;
  final: ReactNode;
  tadilat: ReactNode;
  actions: (row: any) => ReactNode;
}

interface CreditRequestContractInsertRowModalProps {
  // data: CreditReadRequestBudgetRowShape[];
  formData: any;
  onDoneTask: () => void;
  baseData: any[];
}

function CreditRequestContractInsertRowModal(
  props: CreditRequestContractInsertRowModalProps
) {
  const { formData, onDoneTask, baseData } = props;

  // table data
  const [addItemsList, setAddItemsList] = useState<any>({});

  const insertMutation = useMutation(creditRequestApi.contractInsert, {
    onSuccess: () => {
      onDoneTask();
    },
  });

  const handleSaveClick = async () => {
    let shouldUpdateItems: any = [];

    for (const key in addItemsList) {
      const value = addItemsList?.[key];
      if (value === true) {
        shouldUpdateItems.push(+key);
      }
    }
    try {
      await Promise.all(
        shouldUpdateItems.map((item: any) => {
          return insertMutation.mutate({
            requestId: formData.id,
            contractId: item,
          });
        })
      );
    } catch {
      return onDoneTask();
    }

    enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
      variant: "success",
    });
    onDoneTask();
  };

  const toggleItem = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setAddItemsList((prevState: any) => {
      // let itemValue = prevState[sepratorCreaditorBudgetConfig.creaditorId];
      // itemValue[value] = checked;
      // if (itemValue.find(value)) {
      // } else {
      //   itemValue = [...itemValue, value];
      // }

      const result = {
        ...prevState,
        [value]: checked,
      };

      return result;
    });
  };

  const actionBtn = (row: CreditRequestReadContractModalTableShape) => (
    // <IconButton color="primary" onClick={() => handleInsertClick(row)}>
    //   <AddIcon />
    // </IconButton>
    <Checkbox
      value={row.id}
      checked={!!addItemsList[row.id]}
      onChange={toggleItem}
      size="small"
    />
  );

  // head group
  const [budgetProccedId, setBudgetProccedId] = useState({
    [generalFieldsConfig.AREA]: undefined,
  });

  const getDataClick = () => {
    modalDataMutation.mutate({
      areaId: budgetProccedId[generalFieldsConfig.AREA],
    });
  };

  const tableHeadGroup: TableHeadGroupShape = [
    {
      title: (
        <Box display={"flex"} gap={1}>
          <Box sx={{ width: "200px" }}>
            <AreaInput
              setter={setBudgetProccedId}
              value={budgetProccedId[generalFieldsConfig.AREA]}
            />
          </Box>
          <LoadingButton
            variant="contained"
            size="small"
            onClick={getDataClick}
          >
            جستجو
          </LoadingButton>
        </Box>
      ),
      colspan: 6,
    },
  ];

  // data
  const modalDataMutation = useMutation(creditRequestApi.contractModal);

  const filteredData = modalDataMutation.data?.data || [];
  // const filteredData =
  //  data.filter(
  //   (item) =>
  //     !baseData.find((baseItem) => {
  //       return baseItem.code === item.code;
  //     }) &&
  //     item.budgetProcessId ===
  //       budgetProccedId[generalFieldsConfig.BUDGET_METHOD]
  // );

  const formatTableData = (
    unFormatData: CreditRequestReadContractModalTableShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: (
          <Box>
            {i + 1}
            <Checkbox
              value={item.id}
              checked={!!addItemsList[item.id]}
              onChange={toggleItem}
              size="small"
            />
          </Box>
        ),
        contractNumber: item.number,
        // actions: () => actionBtn(item),
      })
    );

    return formatedData;
  };

  const tableData = formatTableData(filteredData);

  // footer
  const sumShareAmount = sumFieldsInSingleItemData(filteredData, "shareAmount");
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 5,
    contractNumber: null,
    description: null,
    suppliersName: null,
    dateShamsi: null,
    shareAmount: sumShareAmount,
  };

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: (
        <div>
          ردیف
          <IconButton color="primary" onClick={handleSaveClick}>
            <CheckIcon />
          </IconButton>
        </div>
      ),
      name: "number",
    },
    {
      title: "شماره",
      name: "contractNumber",
    },
    {
      title: "تاریخ",
      name: "dateShamsi",
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
    },
    {
      title: "پیمانکار",
      name: "suppliersName",
      align: "left",
    },
    {
      title: "مبلغ",
      name: "shareAmount",
      align: "left",
      split: true,
    },
  ];

  return (
    <FixedTable
      heads={tableHeads}
      headGroups={tableHeadGroup}
      data={tableData}
      footer={tableFooter}
      notFixed
    />
  );
}

export default CreditRequestContractInsertRowModal;
