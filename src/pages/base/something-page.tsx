import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import SuppliersForm from "components/base/suppliers/suppliers-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { SuppliersShape } from "types/data/credit/suppliers-type";
import { suppliersApi } from "api/credit/suppliers-api";
import { departmanAcceptorApi } from "api/departman/departman-acceptor-api";
import { GetSingleDepartmanAcceptorItemShape } from "types/data/departman/departman-acceptor-type";
import AreaInput from "components/sections/inputs/area-input";
import { globalConfig } from "config/global-config";
import { generalFieldsConfig } from "config/features/general-fields-config";
import DepartmanAcceotorInput from "components/sections/inputs/departman/departman-acceptor-input";
import { departmanAcceptorConfig } from "config/features/departman/departman-acceptor-config";
import { Box } from "@mui/material";
import DepartmanAcceptorTable2 from "components/base/departman/departman-acceptor-table2";

interface TableDataItemShape {
  number: ReactNode;
  name: ReactNode;
  actions: ((row: any) => ReactNode) | ReactNode;
}

function SomethingPage() {
  // add
  const [isInsertMode, setIsInsertMode] = useState(false);

  const [actionFormData, setActionFormData] = useState<any>({
    [generalFieldsConfig.AREA]: undefined,
  });

  const addClick = () => {
    setActionFormData({});
    setIsInsertMode((state) => !state);
  };

  const clickActionDone = () => {
    // const newAreaId =
    //   formData[orgProjectConfig.area] === 10
    //     ? actionFormData.areaArray
    //     : `-${formData[orgProjectConfig.area]}-`;
    // insertMutation.mutate({
    //   ...actionFormData,
    //   areaArray: newAreaId,
    // });
  };

  const closeEditFunctionality = () => {
    setIsInsertMode(false);
  };

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: (
        <div>
          ردیف
          <IconButton onClick={addClick} color="primary" size="small">
            <AddIcon />
          </IconButton>
        </div>
      ),
      name: "number",
      width: "100px",
    },
    {
      title: "منطقه",
      name: "areaName",
      align: "left",
      width: "300px",
    },
    {
      title: "نام",
      name: "departmentName",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
      align: "left",
      width: "100px",
    },
  ];

  // action

  const actionItem = {
    number: "افزودن",
    departmentCode: actionFormData.departmentCode,
    departmentName: (
      <DepartmanAcceotorInput
        value={actionFormData[departmanAcceptorConfig.departman] as any}
        setter={setActionFormData}
      />
    ),
    areaName: (
      <AreaInput
        value={actionFormData[generalFieldsConfig.AREA] as any}
        setter={setActionFormData}
      />
    ),

    actions: (
      <>
        <IconButton onClick={clickActionDone} color="primary" size="small">
          <CheckIcon />
        </IconButton>

        <IconButton onClick={closeEditFunctionality} color="error" size="small">
          <ClearIcon />
        </IconButton>
      </>
    ),
  };

  // table 2
  const table2Data = useMutation(departmanAcceptorApi.table2GetData);
  const openTable2 = (item: GetSingleDepartmanAcceptorItemShape) => {
    table2Data.mutate({
      id: item.id,
    });
  };

  // data
  const actionButtons = (row: TableDataItemShape & SuppliersShape) => (
    <>
      <IconButton onClick={closeEditFunctionality} color="error" size="small">
        <DeleteIcon />
      </IconButton>

      <IconButton
        size="small"
        color="primary"
        onClick={() => openTable2(row as any)}
      >
        <ArrowCircleLeftIcon />
      </IconButton>
    </>
  );

  const formatTableData = (
    unFormatData: GetSingleDepartmanAcceptorItemShape[]
  ): (SuppliersShape & TableDataItemShape)[] | any => {
    const formatedData: (SuppliersShape & TableDataItemShape)[] | any =
      unFormatData.map((item, i) => ({
        ...item,
        number: i + 1,
        actions: (
          <Box justifyContent={"center"} display={"flex"}>
            {actionButtons(item as any)}
          </Box>
        ),
      }));

    return formatedData;
  };

  const departmanAcceptorQuery = useQuery(
    reactQueryKeys.departman.aceptor.getData,
    departmanAcceptorApi.getData
  );

  const tableData = departmanAcceptorQuery.data
    ? formatTableData(departmanAcceptorQuery.data.data)
    : [];

  const filteredData = [...(isInsertMode ? [actionItem] : []), ...tableData];

  return (
    <AdminLayout>
      <Box display={"flex"}>
        <Box sx={{ width: "50%" }}>
          <FixedTable data={filteredData} heads={tableHeads} notFixed />
        </Box>

        <Box sx={{ width: "50%" }}>
          <DepartmanAcceptorTable2 data={table2Data.data?.data || []} />
        </Box>
      </Box>
    </AdminLayout>
  );
}

export default SomethingPage;
