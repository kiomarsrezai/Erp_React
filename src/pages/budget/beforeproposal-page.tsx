import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";
import WindowLoading from "components/ui/loading/window-loading";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { transferApi } from "api/transfer/transfer-api";
import DeleteIcon from "@mui/icons-material/Delete";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { getBgColorBudget } from "helper/get-color-utils";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import { formatExpenseName } from "helper/data-utils";
import { Box } from "@mui/material";
import BeforeProposalBudgetForm from "components/sections/budget/beforeproposal/beforeproposal-budget-form";
import { beforeproposalConfig, beforepropsalBudgetUrls } from "config/features/budget/beforeproposal-config";
import { GetSingleBeforeProposalItemShape } from "types/beforeproposal-type";
import { beforeproposalapi } from "api/budget/pishnahadi-api";
import { globalConfig } from "config/global-config";
import { enqueueSnackbar } from "notistack";
import { generalFieldsConfig } from "config/features/general-fields-config";

interface TableDataItemShape {
  number: ReactNode;
  codingId: ReactNode;
  code: ReactNode;
  description: ReactNode;
  mosavab: ReactNode;
  edit: ReactNode;
  creditAmount: ReactNode;
  expense: ReactNode;
  budgetNext: ReactNode;
  levelNumber: ReactNode;
  crud: ReactNode;
  percent: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}





function BudgetBeforeProposalPage() {
  const [formData, setFormData] = useState({
    [generalFieldsConfig.YEAR]: undefined,
    [generalFieldsConfig.AREA]: undefined,
    [generalFieldsConfig.BUDGET_METHOD]: undefined,
  });

  const handleaddbtnclick = useMutation(beforeproposalapi.insertData, {
    onSuccess: () => {
      getDataMutation.mutate(formData);
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  const [codingId, setCodingId] = useState<any>(0);

  const activeTimeOut = useRef<any>(null);

  useEffect(() => {
    return () => clearTimeout(activeTimeOut.current);
  }, []);

  const afterCloseAnyModal = () => {
    activeTimeOut.current = setTimeout(() => {
      setCodingId(0);
    }, 3000);
  };

  const [textDeleteModal, setTextDeleteModal] = useState("");
 // delete item
 const [isShowConfrimDelete, setIsShowConfrimDelete] = useState<null | number>(
  null
);
const handleClickDelete = (
  row: TableDataItemShape & GetSingleBeforeProposalItemShape
) => {
  const deleteText = `آیا مایل به حذف ${row.code} - ${row.description} هستید ؟`;
  setTextDeleteModal(deleteText);
  setIsShowConfrimDelete(row.id);
};


const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeRowTitle, setActiveRowTitle] = useState("");
  // const detailCodingMutation = useMutation(beforeproposalapi.del);
  


  // form heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      width: "50px",
    },
    {
      title: "#",
      name: "levelNumber",
      width: "40px",
      hidden:true
    }
    ,
    {
      title: "کد",
      name: "code",
      width: "110px",
    },
    {
      title: "شرح",
      align: "left",
      name: "description",
    },
    {
      title: "مصوب 1402",
      align: "left",
      name: "mosavab",
      split: true,
      width: "160px",
    },
    {
      title: "اصلاح 1402",
      align: "left",
      name: "edit",
      split: true,
      width: "160px",
    },
    {
      title: "مبلغ پیشنهادی 1403",
      align: "left",
      name: "budgetNext",
      split: true,
      width: "160px",
    },
    {
      title: "ت اعتبار 1402",
      name: "creditAmount",
      split: true,
      align: "left",
      hidden: formData[beforeproposalConfig.BUDGET_METHOD] === 1,
      width: "160px",
    },
    {
      title: "هزینه 1402",
      name: "expense",
      align: "left",
      split: true,
      width: "160px",
    },
    {
      title: "% جذب",
      name: "percent",
      percent: true,
      width: "80px",
      hidden:true
    },
    {
      title: "عملیات",
      name: "actions",
      width: "100px",
      hidden:true
    },
  ];


  // detail modal
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [activeRowData, setActiveRowData] =
    useState<GetSingleBeforeProposalItemShape | null>(null);

  const getDetailMutation = useMutation(proposalBudgetApi.getDetailData);

  const queryClient = useQueryClient();
  const getDataMutation = useMutation(beforeproposalapi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.budget.proposal.getData, data);
    },
  });

  const [isModal1Changed, setIsmodal1Changed] = useState(false);

  const handleCloseModal1 = () => {
    if (isModal1Changed) {
      getDataMutation.mutate(formData);
    }

    afterCloseAnyModal();
    setIsOpenDetailModal(false);
  };

  const handleOpenDetailModal = (
    row: TableDataItemShape & GetSingleBeforeProposalItemShape
  ) => {
    clearTimeout(activeTimeOut.current);
    setIsmodal1Changed(false);
    const title = `${row.code} - ${row.description}`;
    setModalTitle(title);
    setActiveRowData(row);

    getDetailMutation.mutate({
      ...formData,
      [beforeproposalConfig.coding]: row.codingId,
    });

    setCodingId(row.codingId);

    setIsOpenDetailModal(true);
  };
  const insertCodeAccMutation = useMutation(beforeproposalapi.insertData, {
    onSuccess: () => {
      getDataMutation.mutate(formData);
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  // detail modal
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

  const getInfoDataMutation = useMutation(proposalBudgetApi.getInfoData);

  const handleOpenInfoModal = (
    row: TableDataItemShape & GetSingleBeforeProposalItemShape
  ) => {
    clearTimeout(activeTimeOut.current);
    const title = `${row.code} - ${row.description}`;
    setModalTitle(title);
    setActiveRowData(row);

    
    setCodingId(row.codingId);

    setIsOpenInfoModal(true);
  };

  // data
  const actionButtons = (
    row: (TableDataItemShape & GetSingleBeforeProposalItemShape) | any
  ) => (
    <Box display={"flex"} justifyContent={"center"}>
      {/* {formData[beforeproposalConfig.AREA] === 10 && ( */}
      {/* <DelIcon
        size="small"
        color="danger"
        onClick={() => handleOpenInfoModal(row)}
      >
        <UnfoldMoreIcon />
      </DelIcon> */}
      {/* )} */}

      <IconButton
        size="small"
        color="error"
        onClick={() => handleClickDelete(row)}
      >
        <DeleteIcon />
      </IconButton>

      <IconButton
        size="small"
        color="primary"
        // onClick={() => handleClickEditBtn(row)}
      >
        <EditIcon />
      </IconButton>
    </Box>
  );

  // add code
  const [isOpenAddCodeModal, setIsOpenAddCodeModal] = useState(false);
  const handleOpenAddCodeModal = (item: GetSingleBeforeProposalItemShape) => {
    clearTimeout(activeTimeOut.current);
    const title = `افزودن کد - ${item.code} - ${item.description}`;
    setModalTitle(title);
    setActiveRowData(item);

    setCodingId(item.codingId);

    setIsOpenAddCodeModal(true);
  };

  const handleCloseAddCodeModal = () => {
    setIsOpenAddCodeModal(false);
    afterCloseAnyModal();
  };

  const onDoneTaskModalInsertCode = () => {
    getDataMutation.mutate(formData);
    handleCloseAddCodeModal();
  };

  // data
  const formatTableData = (
    unFormatData: GetSingleBeforeProposalItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        code: (
          <Box display={"flex"} alignItems={"center"}>
            {/* <IconButton
              size="small"
              color="primary"
              // onClick={() => handleaddbtnclick.mutate(item)}
            > */}
              {/* <AddIcon /> */}
            {/* </IconButton> */}
            <span>{item.code}</span>
          </Box>
        ),
        description: item.description,
        mosavab: item.mosavab,
        edit: item.edit,
        creditAmount: item.creditAmount,
        percent: item.percentBud,
        row_id: `c-${item.codingId}`,
        expense: item.expense,
        bgcolor_pulse: codingId === item.codingId,
        "textcolor-expense":
          item.expense < 0 ||
          (item.expense > item.creditAmount &&
            [2, 3, 4, 5].includes(
              formData[beforeproposalConfig.BUDGET_METHOD] as any
            ))
            ? "red"
            : "",
        "bgcolor-expense": item.expense > item.edit && "#d7a2a2",
        "bgcolor-creditAmount": item.creditAmount > item.edit && "#d7a2a2",
        bgcolor:
          codingId === item.codingId
            ? "#ffb1b1"
            : getBgColorBudget(
                item.levelNumber,
                formData[beforeproposalConfig.BUDGET_METHOD] || 0
              ),
        actions: () => actionButtons(item),
      })
    );

    return formatedData;
  };

  const proposalQuery = useQuery(
    reactQueryKeys.budget.proposal.getData,
    () => beforeproposalapi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = proposalQuery.data
    ? formatTableData(proposalQuery.data?.data)
    : [];

  // footer
  const footerMosavabSum = sumFieldsInSingleItemData(
    proposalQuery.data?.data,
    "mosavab",
    (item: GetSingleBeforeProposalItemShape) => item.levelNumber === 1
  );

  const footerEditSum = sumFieldsInSingleItemData(
    proposalQuery.data?.data,
    "edit",
    (item: GetSingleBeforeProposalItemShape) => item.levelNumber === 1
  );
  const footerbudgetNextSum = sumFieldsInSingleItemData(
    proposalQuery.data?.data,
    "budgetNext",
    (item: GetSingleBeforeProposalItemShape) => item.levelNumber === 1
  );
  const footerExpenseSum = sumFieldsInSingleItemData(
    proposalQuery.data?.data,
    "expense",
    (item: GetSingleBeforeProposalItemShape) => item.levelNumber === 1
  );

  const footerCreaditAmount = sumFieldsInSingleItemData(
    proposalQuery.data?.data,
    "creditAmount",
    (item: GetSingleBeforeProposalItemShape) => item.levelNumber === 1
  );

  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 3,
    "rowspan-number": 2,
    code: null,
    description: null,
    mosavab: footerMosavabSum,
    edit: footerEditSum,
    budgetNext: footerbudgetNextSum,
    creditAmount: footerCreaditAmount,
    expense: footerExpenseSum,
    // percent: getPercent(footerExpenseSum, footerEditSum),
    actions: "",
  };

  const tableBottomFooter: TableDataItemShape | any = {
    number: null,
    code: null,
    description: null,
    mosavab: "",
    creditAmount: (
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        dir="ltr"
      >
        <div>{getPercent(footerCreaditAmount, footerEditSum) + "%"}</div>
        <div>{getPercent(footerCreaditAmount, footerMosavabSum) + "%"}</div>
      </Box>
    ),
    "align-mosavab": "center",
    edit: "-",
    "align-edit": "center",
    expense: (
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        dir="ltr"
      >
        <div>{getPercent(footerExpenseSum, footerEditSum) + "%"}</div>
        <div>{getPercent(footerExpenseSum, footerMosavabSum) + "%"}</div>
      </Box>
    ),
    percent: "",
    actions: "",
  };
  
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
          <BeforeProposalBudgetForm
              formData={formData}
              setFormData={setFormData}
              setCodingId={setCodingId}
              printData={{
                data: tableData
              }}
          />
      ),
      colspan: tableHeads.filter((item) => !item.hidden).length,
    },
  ];

  return (
    <>
      <AdminLayout>
        <FixedTable
          heads={tableHeads}
          headGroups={tableHeadGroups}
          data={tableData}
          footer={tableFooter}
          bottomFooter={tableBottomFooter}
          enableVirtual
          tableLayout="auto"
        />
      </AdminLayout>
      {/* modal 1 */}
      {/* <FixedModal
        open={isOpenDetailModal}
        handleClose={handleCloseModal1}
        loading={getDetailMutation.isLoading}
        title={modalTitle}
        maxWidth="80%"
      >
        <ProposalModal1
          data={getDetailMutation.data?.data || []}
          baseTitle={modalTitle}
          formData={formData}
          baseRowData={activeRowData as GetSingleBeforeProposalItemShape}
          setIsmodal1Changed={setIsmodal1Changed}
        />
      </FixedModal> */}
      {/* modal info */}
      {/* <FixedModal
        open={isOpenInfoModal}
        handleClose={() => {
          setIsOpenInfoModal(false);
          afterCloseAnyModal();
        }}
        loading={getInfoDataMutation.isLoading}
        title={modalTitle}
        maxWidth="md"
        maxHeight="70%"
      >
        <ProposalModalInfo
          data={getInfoDataMutation.data?.data || []}
          formData={formData}
        />
      </FixedModal> */}

      {/* modal insert code */}
      {/* <FixedModal
        open={isOpenAddCodeModal}
        handleClose={handleCloseAddCodeModal}
        loading={getInfoDataMutation.isLoading}
        title={modalTitle}
        maxHeight="400px"
        minHeight="400px"
      >
        <ProposalModalInsertCode
          activeRowData={activeRowData as GetSingleBeforeProposalItemShape}
          formData={formData}
          onDoneTask={onDoneTaskModalInsertCode}
        />
      </FixedModal> */}

      {/* loading */}
      <WindowLoading active={getDataMutation.isLoading} />
    </>
  );
}

export default BudgetBeforeProposalPage;

