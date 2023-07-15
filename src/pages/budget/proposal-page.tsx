import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";
import FixedModal from "components/ui/modal/fixed-modal";
import ProposalBudgetForm from "components/sections/budget/proposal/proposal-budget-form";
import ProposalModal1 from "components/sections/budget/proposal/modal-1/proposal-modal-1";
import WindowLoading from "components/ui/loading/window-loading";
import ProposalModalInfo from "components/sections/budget/proposal/modal-info/proposal-modal-info";
import AddIcon from "@mui/icons-material/Add";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { ReactNode, useEffect, useRef, useState } from "react";
import { proposalConfig } from "config/features/budget/proposal-config";
import { GetSingleProposalItemShape } from "types/data/budget/proposal-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { getBgColorBudget } from "helper/get-color-utils";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import { formatExpenseName } from "helper/data-utils";
import { Box } from "@mui/material";
import ProposalModalInsertCode from "components/sections/budget/proposal/insert-modal/proposal-modal-insert-code";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  description: ReactNode;
  mosavab: ReactNode;
  edit: ReactNode;
  creditAmount: ReactNode;
  expense: ReactNode;
  percent: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

function BudgetProposalPage() {
  const [formData, setFormData] = useState({
    [proposalConfig.YEAR]: undefined,
    [proposalConfig.AREA]: undefined,
    [proposalConfig.BUDGET_METHOD]: undefined,
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
    },
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
      title: "مصوب",
      align: "left",
      name: "mosavab",
      split: true,
      width: "160px",
    },
    {
      title: "اصلاح",
      align: "left",
      name: "edit",
      split: true,
      width: "160px",
    },
    {
      title: "ت اعتبار",
      name: "creditAmount",
      split: true,
      align: "left",
      hidden: formData[proposalConfig.BUDGET_METHOD] === 1,
      width: "160px",
    },
    {
      title: formatExpenseName(formData[proposalConfig.BUDGET_METHOD]),
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
    },
    {
      title: "عملیات",
      name: "actions",
      width: "100px",
    },
  ];

  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <ProposalBudgetForm
          formData={formData}
          setFormData={setFormData}
          setCodingId={setCodingId}
          afterCloseAnyModal={afterCloseAnyModal}
        />
      ),
      colspan: tableHeads.filter((item) => !item.hidden).length,
    },
  ];

  // detail modal
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [activeRowData, setActiveRowData] =
    useState<GetSingleProposalItemShape | null>(null);

  const getDetailMutation = useMutation(proposalBudgetApi.getDetailData);

  const queryClient = useQueryClient();
  const getDataMutation = useMutation(proposalBudgetApi.getData, {
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
    row: TableDataItemShape & GetSingleProposalItemShape
  ) => {
    clearTimeout(activeTimeOut.current);
    setIsmodal1Changed(false);
    const title = `${row.code} - ${row.description}`;
    setModalTitle(title);
    setActiveRowData(row);

    getDetailMutation.mutate({
      ...formData,
      [proposalConfig.coding]: row.codingId,
    });

    setCodingId(row.codingId);

    setIsOpenDetailModal(true);
  };

  // detail modal
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

  const getInfoDataMutation = useMutation(proposalBudgetApi.getInfoData);

  const handleOpenInfoModal = (
    row: TableDataItemShape & GetSingleProposalItemShape
  ) => {
    clearTimeout(activeTimeOut.current);
    const title = `${row.code} - ${row.description}`;
    setModalTitle(title);
    setActiveRowData(row);

    getInfoDataMutation.mutate({
      ...formData,
      [proposalConfig.coding]: row.codingId,
    });

    setCodingId(row.codingId);

    setIsOpenInfoModal(true);
  };

  // data
  const actionButtons = (
    row: TableDataItemShape & GetSingleProposalItemShape
  ) => (
    <Box display={"flex"} justifyContent={"center"}>
      {/* {formData[proposalConfig.AREA] === 10 && ( */}
      <IconButton
        size="small"
        color="primary"
        onClick={() => handleOpenInfoModal(row)}
      >
        <UnfoldMoreIcon />
      </IconButton>
      {/* )} */}

      <IconButton
        size="small"
        color="primary"
        onClick={() => handleOpenDetailModal(row)}
      >
        <FormatListBulletedIcon />
      </IconButton>
    </Box>
  );

  // add code
  const [isOpenAddCodeModal, setIsOpenAddCodeModal] = useState(false);
  const handleOpenAddCodeModal = (item: GetSingleProposalItemShape) => {
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
    unFormatData: GetSingleProposalItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        code: (
          <Box display={"flex"} alignItems={"center"}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleOpenAddCodeModal(item)}
            >
              <AddIcon />
            </IconButton>
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
              formData[proposalConfig.BUDGET_METHOD] as any
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
                formData[proposalConfig.BUDGET_METHOD] || 0
              ),
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const proposalQuery = useQuery(
    reactQueryKeys.budget.proposal.getData,
    () => proposalBudgetApi.getData({}),
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
    (item: GetSingleProposalItemShape) => item.levelNumber === 1
  );

  const footerEditSum = sumFieldsInSingleItemData(
    proposalQuery.data?.data,
    "edit",
    (item: GetSingleProposalItemShape) => item.levelNumber === 1
  );

  const footerExpenseSum = sumFieldsInSingleItemData(
    proposalQuery.data?.data,
    "expense",
    (item: GetSingleProposalItemShape) => item.levelNumber === 1
  );

  const footerCreaditAmount = sumFieldsInSingleItemData(
    proposalQuery.data?.data,
    "creditAmount",
    (item: GetSingleProposalItemShape) => item.levelNumber === 1
  );

  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 3,
    "rowspan-number": 2,
    code: null,
    description: null,
    mosavab: footerMosavabSum,
    edit: footerEditSum,
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

  return (
    <>
      <AdminLayout>
        <FixedTable
          heads={tableHeads}
          headGroups={tableHeadGroups}
          data={tableData}
          footer={tableFooter}
          bottomFooter={tableBottomFooter}
          // enableVirtual
          // tableLayout="auto"
        />
      </AdminLayout>
      {/* modal 1 */}
      <FixedModal
        open={isOpenDetailModal}
        handleClose={handleCloseModal1}
        loading={getDetailMutation.isLoading}
        title={modalTitle}
        maxWidth="70%"
      >
        <ProposalModal1
          data={getDetailMutation.data?.data || []}
          baseTitle={modalTitle}
          formData={formData}
          baseRowData={activeRowData as GetSingleProposalItemShape}
          setIsmodal1Changed={setIsmodal1Changed}
        />
      </FixedModal>
      {/* modal info */}
      <FixedModal
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
      </FixedModal>

      {/* modal insert code */}
      <FixedModal
        open={isOpenAddCodeModal}
        handleClose={handleCloseAddCodeModal}
        loading={getInfoDataMutation.isLoading}
        title={modalTitle}
        maxHeight="400px"
        minHeight="400px"
      >
        <ProposalModalInsertCode
          activeRowData={activeRowData as GetSingleProposalItemShape}
          formData={formData}
          onDoneTask={onDoneTaskModalInsertCode}
        />
      </FixedModal>

      {/* loading */}
      <WindowLoading active={getDataMutation.isLoading} />
    </>
  );
}

export default BudgetProposalPage;
