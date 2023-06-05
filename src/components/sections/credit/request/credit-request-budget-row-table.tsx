import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import FixedModal from "components/ui/modal/fixed-modal";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import CreditRequestBudgetInsertRowModal from "./credit-request-budget-insert-row-modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { creditRequestApi } from "api/credit/credit-request-api";
import { creditRequestConfig } from "config/features/credit/credit-request-config";
import { reactQueryKeys } from "config/react-query-keys-config";
import { Box } from "@mui/material";
import { CreditReadRequestBudgetRowInsertedShape } from "types/data/credit/credit-request-type";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";

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
      title: "سال",
      name: "yearName",
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

  // reload data
  const quertClient = useQueryClient();
  const budgetRowMutation = useMutation(
    creditRequestApi.budgetRowReadInserted,
    {
      onSuccess: (data) => {
        quertClient.setQueryData(reactQueryKeys.request.budgetRow.list, {
          data: data.data,
        });
      },
    }
  );

  const handleDoneTask = () => {
    budgetRowMutation.mutate({ requestId: formData.id });
    setIsOpenAddBudgetModal(false);
    setIsOpenConfrimDelete(false);
  };

  // delete
  const [isOpenConfrimDelete, setIsOpenConfrimDelete] = useState(false);
  const [idItemForDelete, setIdItemForDelete] = useState(0);
  const [titleItemForDelete, setTitleItemForDelete] = useState("");

  const handleConfrimDelete = () => {
    budgetRowDeleteMutation.mutate({
      id: idItemForDelete,
    });
  };

  const budgetRowDeleteMutation = useMutation(
    creditRequestApi.budgetRowDelete,
    {
      onSuccess: () => {
        handleDoneTask();
        enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
          variant: "success",
        });
      },
    }
  );
  const handleClickDelete = (row: CreditReadRequestBudgetRowInsertedShape) => {
    setTitleItemForDelete(
      `آیا مایل به حذف ردیف ${row.code} - ${row.description}`
    );
    setIdItemForDelete(row.id);
    setIsOpenConfrimDelete(true);
  };

  // table data

  const actionBtn = (row: CreditReadRequestBudgetRowInsertedShape) => (
    <Box display={"flex"} justifyContent={"center"}>
      <IconButton color="primary">
        <EditIcon />
      </IconButton>

      <IconButton color="error" onClick={() => handleClickDelete(row)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );

  const formatTableData = (
    unFormatData: CreditReadRequestBudgetRowInsertedShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        actions: () => actionBtn(item),
      })
    );

    return formatedData;
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

      <ConfrimProcessModal
        onCancel={() => setIsOpenConfrimDelete(false)}
        onConfrim={handleConfrimDelete}
        text={titleItemForDelete}
        open={isOpenConfrimDelete}
      />
    </>
  );
}

export default CreditRequestBudgetRowTable;
