import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import SuppliersInput from "components/sections/inputs/suppliers-input";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import { Box, Checkbox } from "@mui/material";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { suppliersApi } from "api/credit/suppliers-api";
import { suppliersConfig } from "config/features/credit/suppliers-config";
import { checkHaveValue } from "helper/form-utils";
import FixedTable from "components/data/table/fixed-table";
import { TableHeadShape } from "types/table-type";
import {
  GetSingleDepartmanAcceptorItemShape,
  GetSingleDepartmanAcceptorTable2ItemShape,
} from "types/data/departman/departman-acceptor-type";
import { departmanAcceptorApi } from "api/departman/departman-acceptor-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import AddIcon from "@mui/icons-material/Add";

interface DepartmanEmployeModalProps {
  data: GetSingleDepartmanAcceptorTable2ItemShape[];
  baseData: GetSingleDepartmanAcceptorItemShape;
  onDoneTask: any;
}
function DepartmanEmployeModal(props: DepartmanEmployeModalProps) {
  const { data, baseData, onDoneTask } = props;

  const [isOpenInsertModal, setIsOpenInsertModal] = useState(false);

  const modalDataMutation = useMutation(departmanAcceptorApi.getEmployeData);

  const addClick = () => {
    modalDataMutation.mutate({
      id: baseData.id,
    });
    setIsOpenInsertModal(true);
  };

  const [addItemsList, setAddItemsList] = useState<any>({});

  const insertMutation = useMutation(departmanAcceptorApi.insertEmploye, {
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
            employeeId: item,
            departmentAcceptorId: baseData.id,
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
      width: "100px",
    },
    {
      title: "نام",
      name: "firstName",
      align: "left",
      width: "300px",
    },
    {
      title: "نام خانوادگی",
      name: "lastName",
      align: "left",
    },
    {
      title: "مسولیت",
      name: "resposibility",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
      align: "left",
      width: "100px",
    },
  ];

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
  const actionBtn = (row: GetSingleDepartmanAcceptorTable2ItemShape) => (
    // <IconButton color="primary" onClick={() => handleInsertClick(row)}>
    //   <AddIcon />
    // </IconButton>
    <>
      {/* {!baseData.find((baseItem) => {
        return baseItem.number === row.number;
      }) && ( */}
      <Checkbox
        value={row.id}
        checked={!!addItemsList[row.id]}
        onChange={toggleItem}
        size="small"
      />
      {/* )} */}
    </>
  );

  // data

  const formatTableData = (
    unFormatData: GetSingleDepartmanAcceptorTable2ItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      actions: () => actionBtn(item),
    }));

    return formatedData;
  };

  const tableData = formatTableData(data);

  return <FixedTable data={tableData} heads={tableHeads} notFixed />;
}

export default DepartmanEmployeModal;
