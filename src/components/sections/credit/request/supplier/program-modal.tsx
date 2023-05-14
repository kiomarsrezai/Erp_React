import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ProgramForm from "./program-form";

import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { programApi } from "api/credit/program-api";
import { ProgramShape } from "types/data/credit/program-type";

interface TableDataItemShape {
  number: ReactNode;
  projectName: ReactNode;
  projectCode: ReactNode;
  actions: (() => ReactNode) | ReactNode;
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
      name: "projectName",
      align: "left",
    },
    {
      title: "کد",
      name: "projectCode",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // data
  const actionButtons = (row: TableDataItemShape & ProgramShape) => (
    <IconButton size="small" color="primary" onClick={() => onDoneTask(row.id)}>
      <CheckIcon />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: ProgramShape[]
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
    () => programApi.list({}),
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
