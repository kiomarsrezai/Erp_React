import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import SuppliersForm from "./suppliers-form";

import { useQuery } from "@tanstack/react-query";
import { creditRequestApi } from "api/credit/credit-request-api";
import { SuppliersCreditRequestShape } from "config/features/credit/credit-request-type";
import { ReactNode } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";

interface TableDataItemShape {
  number: ReactNode;
  name: ReactNode;
  actions: (() => ReactNode) | ReactNode;
}

interface SuppliersModalCreditRequestProps {
  onDoneTask: (value: number) => void;
}

function SuppliersModalCreditRequest(props: SuppliersModalCreditRequestProps) {
  const { onDoneTask } = props;

  // heads
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: <SuppliersForm />,
      colspan: 3,
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "نام",
      name: "name",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // data
  const actionButtons = (
    row: TableDataItemShape & SuppliersCreditRequestShape
  ) => (
    <IconButton size="small" color="primary" onClick={() => onDoneTask(row.id)}>
      <CheckIcon />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: SuppliersCreditRequestShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const suppliersQuery = useQuery(
    reactQueryKeys.request.suppliers.list,
    () => creditRequestApi.suppliersList(0),
    {
      enabled: false,
    }
  );

  const tableData = suppliersQuery.data
    ? formatTableData(suppliersQuery.data.data)
    : [];

  return (
    <FixedTable
      data={tableData}
      headGroups={tableHeadGroups}
      heads={tableHeads}
      notFixed
    />
  );
}

export default SuppliersModalCreditRequest;
