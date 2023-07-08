import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import SuppliersInput from "components/sections/inputs/suppliers-input";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import { Box, Checkbox, TextField } from "@mui/material";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { suppliersApi } from "api/credit/suppliers-api";
import { suppliersConfig } from "config/features/credit/suppliers-config";
import { checkHaveValue } from "helper/form-utils";
import FixedTable from "components/data/table/fixed-table";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import {
  GetSingleDepartmanAcceptorEmployeItemShape,
  GetSingleDepartmanAcceptorItemShape,
  GetSingleDepartmanAcceptorTable2ItemShape,
} from "types/data/departman/departman-acceptor-type";
import { departmanAcceptorApi } from "api/departman/departman-acceptor-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import AddIcon from "@mui/icons-material/Add";

interface DepartmanEmployeModalProps {
  data: GetSingleDepartmanAcceptorEmployeItemShape[];
  baseData: GetSingleDepartmanAcceptorItemShape;
  onDoneTask: any;
  table2Data: GetSingleDepartmanAcceptorTable2ItemShape[];
}
function DepartmanEmployeModal(props: DepartmanEmployeModalProps) {
  const { data, baseData, onDoneTask, table2Data } = props;

  const [filterText, setFilterText] = useState("");

  const headGroup: TableHeadGroupShape = [
    {
      title: (
        <Box sx={{ width: "50%" }}>
          <TextField
            size="small"
            label="جستجو"
            value={filterText}
            variant="outlined"
            onChange={(e) => setFilterText(e.target.value)}
            fullWidth
          />
        </Box>
      ),
      colspan: 5,
    },
  ];

  // insert

  // const [isOpenInsertModal, setIsOpenInsertModal] = useState(false);

  // const modalDataMutation = useMutation(departmanAcceptorApi.getEmployeData);

  // const addClick = () => {
  //   // modalDataMutation.mutate({
  //   //   id: baseData.id,
  //   // });
  //   // setIsOpenInsertModal(true);
  // };

  // const [addItemsList, setAddItemsList] = useState<any>({});

  const insertMutation = useMutation(departmanAcceptorApi.insertEmploye, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      onDoneTask();
    },
  });

  // const handleSaveClick = async () => {
  //   let shouldUpdateItems: any = [];

  //   for (const key in addItemsList) {
  //     const value = addItemsList?.[key];
  //     if (value === true) {
  //       shouldUpdateItems.push(+key);
  //     }
  //   }
  //   try {
  //     await Promise.all(
  //       shouldUpdateItems.map((item: any) => {
  //         return insertMutation.mutate({
  //           employeeId: item,
  //           departmentAcceptorId: baseData.id,
  //         });
  //       })
  //     );
  //   } catch {
  //     return onDoneTask();
  //   }

  //   enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
  //     variant: "success",
  //   });
  //   onDoneTask();
  // };

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      width: "100px",
    },
    {
      title: "نام",
      name: "firstName",
      align: "left",
      width: "200px",
    },
    {
      title: "نام خانوادگی",
      name: "lastName",
      align: "left",
      width: "200px",
    },
    {
      title: "مسولیت",
      name: "bio",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
      align: "left",
      width: "100px",
    },
  ];

  // const toggleItem = (e: ChangeEvent<HTMLInputElement>) => {
  //   const checked = e.target.checked;
  //   const value = e.target.value;

  //   setAddItemsList((prevState: any) => {
  //     // let itemValue = prevState[sepratorCreaditorBudgetConfig.creaditorId];
  //     // itemValue[value] = checked;
  //     // if (itemValue.find(value)) {
  //     // } else {
  //     //   itemValue = [...itemValue, value];
  //     // }

  //     const result = {
  //       ...prevState,
  //       [value]: checked,
  //     };

  //     return result;
  //   });
  // };
  const handleInsertClick = (
    item: GetSingleDepartmanAcceptorEmployeItemShape
  ) => {
    insertMutation.mutate({
      employeeId: item.id,
      departmentAcceptorId: baseData.id,
    });
  };
  const actionBtn = (row: GetSingleDepartmanAcceptorEmployeItemShape) => (
    <Box display={"flex"} justifyContent={"center"}>
      {!table2Data.find((item) => item.userId === row.id) && (
        <IconButton
          color="primary"
          size="small"
          onClick={() => handleInsertClick(row)}
        >
          <CheckIcon />
        </IconButton>
      )}
    </Box>
    // <>
    //   {/* {!baseData.find((baseItem) => {
    //     return baseItem.number === row.number;
    //   }) && ( */}
    //   <Checkbox
    //     value={row.id}
    //     checked={!!addItemsList[row.id]}
    //     onChange={toggleItem}
    //     size="small"
    //   />
    //   {/* )} */}
    // </>
  );

  // data
  const formatTableData = (
    unFormatData: GetSingleDepartmanAcceptorEmployeItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      actions: () => actionBtn(item),
    }));

    return formatedData;
  };

  const filteredData = data.filter(
    (item) =>
      item.bio.includes(filterText) ||
      item.firstName.includes(filterText) ||
      item.lastName.includes(filterText)
  );

  const tableData = formatTableData(filteredData);

  return (
    <FixedTable
      data={tableData}
      heads={tableHeads}
      headGroups={headGroup}
      notFixed
    />
  );
}

export default DepartmanEmployeModal;
