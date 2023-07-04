import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import SuppliersForm from "components/base/suppliers/suppliers-form";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { SuppliersShape } from "types/data/credit/suppliers-type";
import { suppliersApi } from "api/credit/suppliers-api";
import { departmanAcceptorApi } from "api/departman/departman-acceptor-api";
import { GetSingleDepartmanAcceptorItemShape } from "types/data/departman/departman-acceptor-type";

interface TableDataItemShape {
  number: ReactNode;
  name: ReactNode;
  actions: ((row: any) => ReactNode) | ReactNode;
}

function SomethingPage() {
  // heads
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: <SuppliersForm />,
      colspan: 6,
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "منطقه",
      name: "areaName",
      align: "left",
    },
    {
      title: "کد",
      name: "departmentCode",
      align: "left",
    },
    {
      title: "نام",
      name: "departmentName",
      align: "left",
    },
  ];

  // data
  const actionButtons = (row: TableDataItemShape & SuppliersShape) => (
    <IconButton size="small" color="primary" onClick={() => {}}>
      <CheckIcon />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: GetSingleDepartmanAcceptorItemShape[]
  ): (SuppliersShape & TableDataItemShape)[] | any => {
    const formatedData: (SuppliersShape & TableDataItemShape)[] | any =
      unFormatData.map((item, i) => ({
        ...item,
        number: i + 1,
        actions: actionButtons,
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

  return (
    <AdminLayout>
      <FixedTable data={tableData} heads={tableHeads} />
    </AdminLayout>
  );
}

export default SomethingPage;
