import Grid from "@mui/material/Unstable_Grid2";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import SuppliersInput from "components/sections/inputs/suppliers-input";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { FormEvent, useEffect, useState } from "react";
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
import FixedModal from "components/ui/modal/fixed-modal";
import DepartmanEmployeModal from "./departman-employe-modal";

interface DepartmanAcceptorTable2Props {
  data: GetSingleDepartmanAcceptorTable2ItemShape[];
  baseData: GetSingleDepartmanAcceptorItemShape;
}
function DepartmanAcceptorTable2(props: DepartmanAcceptorTable2Props) {
  const { data, baseData } = props;

  const [isOpenInsertModal, setIsOpenInsertModal] = useState(false);

  const modalDataMutation = useMutation(departmanAcceptorApi.getEmployeData);

  const addClick = () => {
    modalDataMutation.mutate({
      id: baseData.id,
    });
    setIsOpenInsertModal(true);
  };

  const quertClient = useQueryClient();
  const contractReadMutation = useMutation(departmanAcceptorApi.table2GetData, {
    onSuccess: (data) => {
      quertClient.setQueryData(reactQueryKeys.departman.aceptor.getEmploye, {
        data: data.data,
      });
    },
  });

  const handleDoneTask = () => {
    contractReadMutation.mutate({ id: baseData.id });
    setIsOpenInsertModal(false);
  };

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
    unFormatData: GetSingleDepartmanAcceptorTable2ItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      actions: "",
    }));

    return formatedData;
  };

  const tableData = formatTableData(data);

  return (
    <>
      <FixedTable data={tableData} heads={tableHeads} notFixed />

      <FixedModal
        open={isOpenInsertModal}
        handleClose={() => setIsOpenInsertModal(false)}
        title="افزودن شخص"
      >
        <DepartmanEmployeModal
          data={modalDataMutation.data?.data || []}
          baseData={baseData}
          onDoneTask={handleDoneTask}
        />
      </FixedModal>
    </>
  );
}

export default DepartmanAcceptorTable2;
