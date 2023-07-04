import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import SuppliersInput from "components/sections/inputs/suppliers-input";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { FormEvent, useEffect, useState } from "react";
import { suppliersApi } from "api/credit/suppliers-api";
import { suppliersConfig } from "config/features/credit/suppliers-config";
import { checkHaveValue } from "helper/form-utils";
import FixedTable from "components/data/table/fixed-table";
import { TableHeadShape } from "types/table-type";
import { GetSingleDepartmanAcceptorItemShape } from "types/data/departman/departman-acceptor-type";

interface DepartmanAcceptorTable2Props {
  data: GetSingleDepartmanAcceptorItemShape[];
}
function DepartmanAcceptorTable2(props: DepartmanAcceptorTable2Props) {
  const { data } = props;

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

  const formatTableData = (
    unFormatData: GetSingleDepartmanAcceptorItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      actions: "",
    }));

    return formatedData;
  };

  const tableData = formatTableData(data);

  return <FixedTable data={tableData} heads={tableHeads} />;
}

export default DepartmanAcceptorTable2;
