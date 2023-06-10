import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FixedModal from "components/ui/modal/fixed-modal";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import AddIcon from "@mui/icons-material/Add";

import { ReactNode, useState } from "react";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { creditRequestConfig } from "config/features/credit/credit-request-config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creditRequestApi } from "api/credit/credit-request-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import CreditRequestTableActionModal from "./credit-request-table-action-modal";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { CreditReadRequestTableShape } from "types/data/credit/credit-request-type";
import { TextField } from "@mui/material";
import { reactQueryKeys } from "config/react-query-keys-config";

interface TableDataItemShape {
  number: ReactNode;
  description: string;
  quantity: number;
  scale: string;
  price: number;
  amount: number;
  othersDescription: string;
  actions: ((data: TableDataItemShape) => ReactNode) | ReactNode;
}

interface CreidtRequestFormTableProps {
  formData: any;
  firstStepCrossed: boolean;
  data: any[];
  mainDescriptionField: any;
}

function CreidtRequestTable(props: CreidtRequestFormTableProps) {
  const { formData, firstStepCrossed, data, mainDescriptionField } = props;

  // head group
  const [isOpenAddItemModal, setIsOpenAddItemModal] = useState(false);

  const quertClient = useQueryClient();
  const requestTableMutation = useMutation(creditRequestApi.requestTableRead, {
    onSuccess: (data) => {
      quertClient.setQueryData(reactQueryKeys.request.table.list, {
        data: data.data,
      });
    },
  });

  const insertToTableMutation = useMutation(creditRequestApi.insertToTable, {
    onSuccess: () => {
      setIsOpenAddItemModal(false);
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      requestTableMutation.mutate({
        id: formData[creditRequestConfig.request_id],
      });
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  const handleDoneAddTask = (values: any) => {
    insertToTableMutation.mutate({
      ...values,
      [creditRequestConfig.request_id]:
        formData[creditRequestConfig.request_id],
    });
  };

  // add item
  // const [isAddMode, setIsAddMode] = useState(false);
  // const handleAddInlineClick = () => {
  //   setIsAddMode(true);
  // };
  const headGroup: TableHeadGroupShape = [
    {
      title: mainDescriptionField,
      colspan: 8,
    },
  ];

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: (
        <div>
          ردیف
          {firstStepCrossed && (
            <IconButton
              color="primary"
              size="small"
              onClick={() => setIsOpenAddItemModal(true)}
            >
              <AddIcon />
            </IconButton>
          )}
        </div>
      ),
      name: "number",
    },
    {
      title: "شرح کوتاه",
      align: "left",
      name: "description",
    },
    {
      title: "تعداد / مقدار",
      name: "quantity",
      align: "left",
    },
    {
      title: "واحد",
      name: "scale",
      align: "left",
    },
    {
      title: "نرخ",
      align: "left",
      split: true,
      name: "price",
    },
    {
      title: "مبلغ",
      name: "amount",
      split: true,
      align: "left",
    },
    {
      title: "شرح",
      align: "left",
      name: "othersDescription",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];
  //   edit modal
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  const updateTableItemMutation = useMutation(
    creditRequestApi.updateTableItem,
    {
      onSuccess: () => {
        setIsOpenEditModal(false);
        enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
          variant: "success",
        });
      },
      onError: () => {
        enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
          variant: "error",
        });
      },
    }
  );

  const handleDoneUpdateTask = (values: any) => {
    updateTableItemMutation.mutate({
      ...values,
      // id:
    });
  };

  // delete item
  const [isShowConfrimDelete, setIsShowConfrimDelete] = useState(false);
  const [activeItem, setActiveItem] =
    useState<CreditReadRequestTableShape | null>(null);

  const deleteMutation = useMutation(creditRequestApi.requestTableDelete, {
    onSuccess: () => {
      requestTableMutation.mutate({
        id: formData[creditRequestConfig.request_id],
      });
      setIsShowConfrimDelete(false);
    },
  });

  const onConfrimDelete = () => {
    deleteMutation.mutate({ id: activeItem?.id });
  };

  const onCancelDelete = () => {
    setIsShowConfrimDelete(false);
  };

  const handleOpenDelete = (row: CreditReadRequestTableShape) => {
    setActiveItem(row);
    setIsShowConfrimDelete(true);
  };

  // data
  const ActionButtons = (row: CreditReadRequestTableShape) => {
    return (
      <>
        <IconButton
          size="small"
          color="error"
          onClick={() => handleOpenDelete(row)}
        >
          <DeleteIcon />
        </IconButton>

        <IconButton
          size="small"
          color="primary"
          onClick={() => setIsOpenEditModal(true)}
        >
          <EditIcon />
        </IconButton>
      </>
    );
  };

  const formatTableData = (
    unFormatData: CreditReadRequestTableShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        actions: () => ActionButtons(item),
      })
    );

    return formatedData;
  };

  const tableData = formatTableData(data);

  // add inputs
  // const formatAddItem = () => {
  //   if (!isAddMode) {
  //     return [];
  //   }

  //   return [
  //     {
  //       number: "افزودن",
  //       description: (
  //         <TextField
  //           id="code-input"
  //           label="مبلغ"
  //           variant="outlined"
  //           type="number"
  //           size="small"
  //           // value={editMosavab}
  //           // onChange={(e) => setEditMosavab(+e.target.value)}
  //           autoComplete="off"
  //           fullWidth
  //         />
  //       ),
  //       quantity: (
  //         <TextField
  //           id="code-input"
  //           label="مبلغ"
  //           variant="outlined"
  //           type="number"
  //           size="small"
  //           // value={editMosavab}
  //           // onChange={(e) => setEditMosavab(+e.target.value)}
  //           autoComplete="off"
  //           fullWidth
  //         />
  //       ),
  //       scale: (
  //         <TextField
  //           id="code-input"
  //           label="مبلغ"
  //           variant="outlined"
  //           type="number"
  //           size="small"
  //           // value={editMosavab}
  //           // onChange={(e) => setEditMosavab(+e.target.value)}
  //           autoComplete="off"
  //           fullWidth
  //         />
  //       ),
  //       price: (
  //         <TextField
  //           id="code-input"
  //           label="مبلغ"
  //           variant="outlined"
  //           type="number"
  //           size="small"
  //           // value={editMosavab}
  //           // onChange={(e) => setEditMosavab(+e.target.value)}
  //           autoComplete="off"
  //           fullWidth
  //         />
  //       ),
  //       othersDescription: (
  //         <TextField
  //           id="code-input"
  //           label="مبلغ"
  //           variant="outlined"
  //           type="number"
  //           size="small"
  //           // value={editMosavab}
  //           // onChange={(e) => setEditMosavab(+e.target.value)}
  //           autoComplete="off"
  //           fullWidth
  //         />
  //       ),
  //       amount: (
  //         <TextField
  //           id="code-input"
  //           label="مبلغ"
  //           variant="outlined"
  //           type="number"
  //           size="small"
  //           // value={editMosavab}
  //           // onChange={(e) => setEditMosavab(+e.target.value)}
  //           autoComplete="off"
  //           fullWidth
  //         />
  //       ),
  //     },
  //   ];
  // };
  // const finalyTableData = [...tableData, ...formatAddItem()];
  // console.log({ finalyTableData });

  //   footer
  const sumAmount = sumFieldsInSingleItemData(data, "amount");
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 5,
    description: null,
    quantity: null,
    scale: null,
    price: null,
    amount: sumAmount,
    othersDescription: "",
    actions: <></>,
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        topHeadGroups={headGroup}
        data={tableData}
        // data={finalyTableData}
        bgcolor="#eee"
        footer={tableFooter}
        notFixed
      />

      {/* add modal */}
      <FixedModal
        open={isOpenAddItemModal}
        handleClose={() => setIsOpenAddItemModal(false)}
        title="افزودن آیتم"
      >
        <CreditRequestTableActionModal onDoneTask={handleDoneAddTask} />
      </FixedModal>

      {/* edit modal */}
      <FixedModal
        open={isOpenEditModal}
        handleClose={() => setIsOpenEditModal(false)}
        title="ویرایش آیتم"
      >
        <CreditRequestTableActionModal onDoneTask={handleDoneUpdateTask} />
      </FixedModal>

      {/* confrim delete */}
      <ConfrimProcessModal
        onCancel={onCancelDelete}
        onConfrim={onConfrimDelete}
        open={isShowConfrimDelete}
        text={`آیا مایل به حذف ${activeItem?.description} هستید ؟`}
        title="حذف آیتم"
      />
    </>
  );
}

export default CreidtRequestTable;
