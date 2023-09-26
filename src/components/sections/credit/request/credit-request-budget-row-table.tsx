import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import FixedModal from "components/ui/modal/fixed-modal";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import CreditRequestBudgetInsertRowModal from "./credit-request-budget-insert-row-modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { creditRequestApi } from "api/credit/credit-request-api";
import { creditRequestConfig } from "config/features/credit/credit-request-config";
import { reactQueryKeys } from "config/react-query-keys-config";
import { Box, TextField } from "@mui/material";
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
    <IconButton color="primary" onClick={handleClickAdd} size="small">
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
      title: (
        <div>
          ردیف
          {headGroupBtn}
        </div>
      ),
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
      name: "requestBudgetAmount",
      align: "left",
      split: true,
      width: "150px",
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
    setActiveIdUpdate(null);
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
      `آیا مایل به حذف ردیف ${row.code} - ${row.description} هستید؟`
    );
    setIdItemForDelete(row.id);
    setIsOpenConfrimDelete(true);
  };

  //   update
  const [activeIdUpdate, setActiveIdUpdate] = useState<null | number>(null);
  const [editMosavab, setEditMosavab] = useState<number>(0);

  const openEditFunctionality = (row: any) => {
    setEditMosavab(row.requestBudgetAmount);
    setActiveIdUpdate(row.id);
  };

  const closeEditFunctionality = () => {
    setActiveIdUpdate(null);
  };

  const editMutation = useMutation(creditRequestApi.budgetRowUpdate, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      handleDoneTask();
    },
  });

  const onSubmitEditFunctionality = () => {
    editMutation.mutate({
      id: activeIdUpdate,
      requestBudgetAmount: editMosavab,
    });
  };

  const renderMosavabDepartman = (row: any) => {
    if (row.id === activeIdUpdate) {
      return (
        <TextField
          id="code-input"
          label=""
          variant="outlined"
          type="number"
          size="small"
          value={editMosavab}
          onChange={(e) => setEditMosavab(+e.target.value)}
          autoComplete="off"
          fullWidth
        />
      );
    } else {
      return row.requestBudgetAmount;
    }
  };

  // table data
  const actionBtn = (row: CreditReadRequestBudgetRowInsertedShape) => (
    <Box display={"flex"} justifyContent={"center"}>
      {activeIdUpdate === row.id ? (
        <>
          <IconButton
            color="success"
            size="small"
            onClick={onSubmitEditFunctionality}
          >
            <CheckIcon />
          </IconButton>

          <IconButton
            color="error"
            size="small"
            onClick={closeEditFunctionality}
          >
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            color="primary"
            size="small"
            onClick={() => openEditFunctionality(row)}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => handleClickDelete(row)}
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </Box>
  );

  const formatTableData = (
    unFormatData: CreditReadRequestBudgetRowInsertedShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        requestBudgetAmount: () => renderMosavabDepartman(item),
        actions: () => actionBtn(item),
      })
    );

    return formatedData;
  };

  const tableData: any = formatTableData(data);

  return (
    <>
      <FixedTable
        // headGroups={tableHeadGroup}
        heads={tableHeads}
        data={tableData}
        notFixed
      />

      <FixedModal
        open={isOpenAddBudgetModal}
        handleClose={() => setIsOpenAddBudgetModal(false)}
        title="افزودن ردیف بودجه"
        loading={modalDataMutation.isLoading}
        maxHeight="70%"
      >
        <CreditRequestBudgetInsertRowModal
          data={modalDataMutation.data?.data || []}
          formData={formData}
          onDoneTask={handleDoneTask}
          baseData={data}
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
