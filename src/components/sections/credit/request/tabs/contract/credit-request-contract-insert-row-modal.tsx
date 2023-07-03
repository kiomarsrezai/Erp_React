import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import FixedModal from "components/ui/modal/fixed-modal";
import AddIcon from "@mui/icons-material/Add";

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

  const insertMutation = useMutation(creditRequestApi.budgetRowInsert, {
    onSuccess: () => {
      // onDoneTask();
    },
  });
  const handleInsertClick = (row: CreditReadRequestBudgetRowShape) => {
    insertMutation.mutate({
      RequestId: formData.id,
      budgetDetailProjectAreatId: row.id,
    });
  };

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
          return insertMutation.mutateAsync({
            requestId: formData.id,
            budgetDetailProjectAreatId: item,
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
    [generalFieldsConfig.BUDGET_METHOD]: 2,
  });

  const tableHeadGroup: TableHeadGroupShape = [
    {
      title: (
        <Box sx={{ width: "200px" }}>
          {" "}
          <BudgetMethodInput
            setter={setBudgetProccedId}
            value={budgetProccedId[generalFieldsConfig.BUDGET_METHOD]}
            ignoreItems={[1, 8, 9]}
          />
        </Box>
      ),
      colspan: 7,
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
        number: i + 1,
        actions: () => actionBtn(item),
      })
    );

    return formatedData;
  };

  const tableData = formatTableData(filteredData);

  // footer
  const sumMosavab = sumFieldsInSingleItemData(
    filteredData,
    "mosavabDepartment"
  );
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 5,
    code: null,
    description: null,
    project: null,
    yearName: null,
    mosavabDepartment: sumMosavab,
    actions: "",
  };

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: (
        <div>
          ردیف
          <IconButton color="primary" onClick={handleSaveClick}>
            <AddIcon />
          </IconButton>
        </div>
      ),
      name: "number",
    },
    {
      title: "سال",
      name: "yearName",
    },
    {
      title: "کد بودجه",
      name: "code",
    },
    {
      title: "شرح ردیف",
      name: "description",
      align: "left",
    },

    {
      title: "پروژه",
      name: "project",
    },
    {
      title: "مبلغ",
      name: "mosavabDepartment",
      align: "left",
      split: true,
    },
    // {
    //   title: "تعدیلات",
    //   name: "tadilat",
    //   align: "left",
    //   split: true,
    // },
    // {
    //   title: "نهایی",
    //   name: "final",
    //   align: "left",
    //   split: true,
    // },
    {
      title: "عملیات",
      name: "actions",
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
