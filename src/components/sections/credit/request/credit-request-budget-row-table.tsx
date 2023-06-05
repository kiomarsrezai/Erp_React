import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import FixedModal from "components/ui/modal/fixed-modal";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import CreditRequestBudgetInsertRowModal from "./credit-request-budget-insert-row-modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { creditRequestApi } from "api/credit/credit-request-api";
import { creditRequestConfig } from "config/features/credit/credit-request-config";
import { reactQueryKeys } from "config/react-query-keys-config";
import { Box } from "@mui/material";

interface TableDataItemShape {
  number: ReactNode;
  year: ReactNode;
  code: ReactNode;
  description: ReactNode;
  price: ReactNode;
}

interface CreditRequestBudgetRowTableProps {
  formData: any;
  data: any[];
}

function CreditRequestBudgetRowTable(props: CreditRequestBudgetRowTableProps) {
  const { formData, data } = props;
  // select user modal
  const [isOpenAddBudgetModal, setIsOpenAddBudgetModal] = useState(false);

  const modalDataMutation = useMutation(creditRequestApi.budgetRowRead);

  const handleClickAdd = () => {
    modalDataMutation.mutate({
      [creditRequestConfig.year]: formData[creditRequestConfig.year],
      [creditRequestConfig.area]: formData[creditRequestConfig.area],
      [creditRequestConfig.execute_departman_id]:
        formData[creditRequestConfig.execute_departman_id],
    });
    setIsOpenAddBudgetModal(true);
  };
  // head group
  const headGroupBtn = (
    <IconButton color="primary" onClick={handleClickAdd}>
      <AddIcon />
    </IconButton>
  );

  const tableHeadGroup = [
    {
      title: headGroupBtn,
      colspan: 8,
    },
  ];

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "کد بودجه",
      name: "code",
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
    },
    {
      title: "سال",
      name: "yearName",
    },
    {
      title: "پروژه",
      name: "project",
    },
    {
      title: "مبلغ",
      name: "mosavabDepartment",
      align: "left",
      split: true,
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // table data
  const actionBtn = (row: any) => (
    <Box display={"flex"} justifyContent={"center"}>
      <IconButton color="primary">
        <EditIcon />
      </IconButton>

      <IconButton color="error">
        <DeleteIcon />
      </IconButton>
    </Box>
  );

  const formatTableData = (unFormatData: any[]): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        actions: () => actionBtn(item),
      })
    );

    return formatedData;
  };

  const handleDoneTask = () => {
    setIsOpenAddBudgetModal(false);
  };

  const tableData: any = formatTableData(data);

  return (
    <>
      <FixedTable
        headGroups={tableHeadGroup}
        heads={tableHeads}
        data={tableData}
        notFixed
      />
      <FixedModal
        open={isOpenAddBudgetModal}
        handleClose={() => setIsOpenAddBudgetModal(false)}
        title="افزودن ردیف بودجه"
        loading={modalDataMutation.isLoading}
      >
        <CreditRequestBudgetInsertRowModal
          data={modalDataMutation.data?.data || []}
          formData={formData}
          onDoneTask={handleDoneTask}
        />
      </FixedModal>
    </>
  );
}

export default CreditRequestBudgetRowTable;
