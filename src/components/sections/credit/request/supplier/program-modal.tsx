import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ProgramForm from "./program-form";

import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { SuppliersShape } from "types/data/credit/suppliers-type";
import { suppliersApi } from "api/credit/suppliers-api";

interface TableDataItemShape {
  number: ReactNode;
  name: ReactNode;
  actions: ((row: any) => ReactNode) | ReactNode;
}

interface SuppliersModalCreditRequestProps {
  onDoneTask: (value: number) => void;
}

function ProgramModalCreditRequest(props: SuppliersModalCreditRequestProps) {
  const { onDoneTask } = props;

  // heads
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: <ProgramForm />,
      colspan: 4,
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
  const actionButtons = (row: TableDataItemShape & SuppliersShape) => (
    <IconButton size="small" color="primary" onClick={() => onDoneTask(row.id)}>
      <CheckIcon />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: SuppliersShape[]
  ): (SuppliersShape & TableDataItemShape)[] => {
    const formatedData: (SuppliersShape & TableDataItemShape)[] =
      unFormatData.map((item, i) => ({
        ...item,
        number: i + 1,
        actions: actionButtons,
      }));

    return formatedData;
  };

  const suppliersQuery = useQuery(
    reactQueryKeys.request.suppliers.list,
    () => suppliersApi.list(1),
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

export default ProgramModalCreditRequest;
