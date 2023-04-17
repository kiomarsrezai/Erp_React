import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

import { TableHeadShape } from "types/table-type";
import { ReactNode } from "react";
import { GetSingleTransferModalDataItemShape } from "types/data/transfer/transfer-type";

interface TableDataItemShape {
  markazHazine: ReactNode;
  idTafsily5: ReactNode;
  idMoein: ReactNode;
  idKol: ReactNode;
  name: ReactNode;
  expense: ReactNode;
  actions: (row: any) => ReactNode;
}

interface TransferModalTableProps {
  data: any[];
}

function TransferModalTable(props: TransferModalTableProps) {
  const { data } = props;

  //   heads
  const tableHeads: TableHeadShape = [
    {
      title: "عنوان مرکز هزینه",
      name: "markazHazine",
      align: "left",
    },
    {
      title: "مرکز هزینه",
      name: "idTafsily5",
    },
    {
      title: "تفضیلی",
      name: "idTafsily",
    },
    {
      title: "معین",
      name: "idMoein",
    },
    {
      title: "کل",
      name: "idKol",
    },
    {
      title: "عملکرد",
      name: "expense",
      split: true,
    },
    {
      title: "نام سرفصل",
      name: "name",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // body
  const formatTableData = (
    unFormatData: GetSingleTransferModalDataItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      markazHazine: item.markazHazine,
      idTafsily5: item.idTafsily5,
      idMoein: item.idMoein,
      idKol: item.idKol,
      name: item.name,
      actions: () => (
        <>
          <IconButton color="primary">
            <InsertLinkIcon />
          </IconButton>
        </>
      ),
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  return <FixedTable heads={tableHeads} data={tableData} notFixed />;
}

export default TransferModalTable;
