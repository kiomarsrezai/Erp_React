import { Box, IconButton, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { budgetEditApi } from "api/budget/budget-edit-api";
import FixedTable from "components/data/table/fixed-table";
import AdminLayout from "components/layout/admin-layout";
import BudgetEditForm from "components/sections/budget/edit/budget-edit-form";
import { budgetEditConfig } from "config/features/budget/budget-edit-config";
import { reactQueryKeys } from "config/react-query-keys-config";
import { ChangeEvent, useState } from "react";
import { GetSingleBudgetEditItemShape } from "types/data/budget/budget-edit-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { changeInputHandler } from "helper/form-utils";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

function BudgetEditPage() {
  const [formData, setFormData] = useState({
    [budgetEditConfig.YEAR]: undefined,
    [budgetEditConfig.AREA]: undefined,
    [budgetEditConfig.BUDGET_METHOD]: undefined,
  });

  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: <BudgetEditForm formData={formData} setFormData={setFormData} />,
      colspan: 9,
    },
  ];
  //   heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      width: "50px",
    },
    {
      title: "کد",
      name: "code",
      width: "150px",
    },
    {
      title: "شرح",
      align: "left",
      name: "description",
    },
    {
      title: "مصوب",
      align: "left",
      name: "mosavabPublic",
      split: true,
      width: "150px",
    },
    {
      title: "عملکرد",
      align: "left",
      name: "expense",
      split: true,
      width: "150px",
    },
    {
      title: "کاهش",
      align: "left",
      name: "decrease",
      split: true,
      width: "150px",
    },
    {
      title: "افزایش",
      align: "left",
      name: "increase",
      split: true,
      width: "150px",
    },
    {
      title: "اصلاح بودجه",
      align: "left",
      name: "edit",
      split: true,
      width: "150px",
    },
    {
      title: "عملیات",
      name: "actions",
      width: "80px",
    },
  ];

  //   refresh
  const queryClient = useQueryClient();
  const getDataMutation = useMutation(budgetEditApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.budget.edit.getData, data);
    },
  });

  const handleDoneTask = () => {
    getDataMutation.mutate(formData);
  };

  //   insert
  const insertMutation = useMutation(budgetEditApi.insertItem, {
    onSuccess: () => {
      handleDoneTask();
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
  });

  const handleAddClick = (item: GetSingleBudgetEditItemShape) => {
    insertMutation.mutate({
      budgetDetailId: item.budgetDetailId,
    });
  };

  //   delete
  const [activeDeleteItem, setActiveDeleteItem] =
    useState<null | GetSingleBudgetEditItemShape>(null);
  const deleteMutation = useMutation(budgetEditApi.deleteItem, {
    onSuccess: () => {
      handleDoneTask();
      setActiveDeleteItem(null);
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
  });

  const handleConfrimDeleteProccess = () => {
    deleteMutation.mutate({
      id: activeDeleteItem?.id as number,
    });
  };

  const handleCancelDeleteProccess = () => {
    setActiveDeleteItem(null);
  };

  const handleDeleteClick = (item: GetSingleBudgetEditItemShape) => {
    setActiveDeleteItem(item);
  };

  //   update
  const [activeIdUpdate, setActiveIdUpdate] = useState<false | number>(false);
  const [editFormData, setEditFormData] = useState({
    decrease: 0,
    increase: 0,
  });

  const updateMutation = useMutation(budgetEditApi.updateItem, {
    onSuccess: () => {
      handleDoneTask();
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      setActiveIdUpdate(false);
    },
  });

  const onChangeEdit = (e: ChangeEvent<HTMLInputElement>) => {
    changeInputHandler(e, setEditFormData);
  };

  const handleEditClick = (item: GetSingleBudgetEditItemShape) => {
    setEditFormData({
      decrease: Number(item.decrease),
      increase: Number(item.increase),
    });
    setActiveIdUpdate(item.id);
  };

  const onSubmitEditFunctionality = () => {
    updateMutation.mutate({
      decrease: Number(editFormData.decrease),
      increase: Number(editFormData.increase),
      id: activeIdUpdate,
    });
  };

  const renderIncrease = (item: GetSingleBudgetEditItemShape) => {
    if (item.id === activeIdUpdate) {
      return (
        <TextField
          id="increase-input"
          label=""
          variant="outlined"
          type="number"
          size="small"
          name="increase"
          value={editFormData.increase}
          onChange={onChangeEdit}
          autoComplete="off"
          fullWidth
        />
      );
    } else {
      return item.increase;
    }
  };

  const renderDecrease = (item: GetSingleBudgetEditItemShape) => {
    if (item.id === activeIdUpdate) {
      return (
        <TextField
          id="decrease-input"
          label=""
          variant="outlined"
          type="number"
          name="decrease"
          size="small"
          value={editFormData.decrease}
          onChange={onChangeEdit}
          autoComplete="off"
          fullWidth
        />
      );
    } else {
      return item.decrease;
    }
  };

  //   actions
  const actionButtons = (item: GetSingleBudgetEditItemShape) => {
    return (
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        {item.id && (
          <>
            {activeIdUpdate !== item.id ? (
              <>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => handleDeleteClick(item)}
                >
                  <DeleteIcon />
                </IconButton>

                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => handleEditClick(item)}
                >
                  <EditIcon />
                </IconButton>
              </>
            ) : (
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
                  onClick={() => setActiveIdUpdate(false)}
                >
                  <CloseIcon />
                </IconButton>
              </>
            )}
          </>
        )}
      </Box>
    );
  };

  //   data
  const formatTableData = (
    unFormatData: GetSingleBudgetEditItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          {i + 1}
          {!item.id && (
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleAddClick(item)}
            >
              <AddIcon />
            </IconButton>
          )}
        </Box>
      ),
      increase: () => renderIncrease(item),
      decrease: () => renderDecrease(item),
      "textcolor-description": item.id === null ? "blue" : "",
      "textcolor-code": item.id === null ? "blue" : "",
      "textcolor-mosavabPublic": item.id === null ? "blue" : "",
      "bgcolor-expense": item.expense > item.mosavabPublic && "#d7a2a2",
      bgcolor: item.id === 1000 && "rgb(255,255,153,var(--hover-color))",
      actions: () => actionButtons(item),
    }));

    return formatedData;
  };

  const budgetEditQuery = useQuery(
    reactQueryKeys.budget.edit.getData,
    () => budgetEditApi.getData({}),
    {
      enabled: false,
    }
  );

  const data = budgetEditQuery.data ? budgetEditQuery.data?.data : [];
  const tableData = formatTableData(data);

  // footer
  const sumMosavabPublic = sumFieldsInSingleItemData(
    data,
    "mosavabPublic",
    (item: GetSingleBudgetEditItemShape) => item.id !== 1000
  );
  const sumIncrease = sumFieldsInSingleItemData(
    data,
    "increase",
    (item: GetSingleBudgetEditItemShape) => item.id !== 1000
  );
  const sumDecrease = sumFieldsInSingleItemData(
    data,
    "decrease",
    (item: GetSingleBudgetEditItemShape) => item.id !== 1000
  );
  const sumEdit = sumFieldsInSingleItemData(
    data,
    "edit",
    (item: GetSingleBudgetEditItemShape) => item.id !== 1000
  );
  const sumExpense = sumFieldsInSingleItemData(
    data,
    "expense",
    (item: GetSingleBudgetEditItemShape) => item.id !== 1000
  );
  const tableFooter = {
    number: "جمع",
    "colspan-number": 3,
    code: null,
    description: null,
    mosavabPublic: sumMosavabPublic,
    increase: sumIncrease,
    decrease: sumDecrease,
    edit: sumEdit,
    expense: sumExpense,
    actions: "",
  };

  return (
    <>
      <AdminLayout>
        <FixedTable
          heads={tableHeads}
          headGroups={tableHeadGroups}
          data={tableData}
          footer={tableFooter}
        />
      </AdminLayout>

      <ConfrimProcessModal
        onCancel={handleCancelDeleteProccess}
        onConfrim={handleConfrimDeleteProccess}
        open={Boolean(activeDeleteItem)}
        text={`آیا مایل به حذف ردیف ${activeDeleteItem?.id} - ${activeDeleteItem?.description} هستید؟`}
      />
    </>
  );
}

export default BudgetEditPage;
