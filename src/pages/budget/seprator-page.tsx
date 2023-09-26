import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import FixedModal from "components/ui/modal/fixed-modal";
import SepratoeBudgetForm from "components/sections/budget/seprator/seprator-budget-form";
import SepratorModal1 from "components/sections/budget/seprator/seprator-modal-1";
import Box from "@mui/material/Box";
import SepratorAccModal from "components/sections/budget/seprator/acc/seprator-acc-modal";
import SepratorProjectModal1 from "components/sections/budget/seprator/project/seprator-project-modal-1";

import { TableHeadShape } from "types/table-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import { ReactNode, useEffect, useRef, useState } from "react";
import { GetSingleSepratorItemShape } from "types/data/budget/seprator-type";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { getBgColorBudget } from "helper/get-color-utils";
import { formatExpenseName } from "helper/data-utils";
import SectionGuard from "components/auth/section-guard";
import { joinPermissions } from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";
import SepratorFixCodeModal from "components/sections/budget/seprator/fix/seprator-fix-code-modal";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import SepratorMonthlyModal from "components/sections/budget/seprator/mothly/seprator-monthly-modal";

interface TableDataItemShape {
  id: ReactNode;
  code: ReactNode;
  description: ReactNode;
  mosavab: ReactNode;
  edit: ReactNode;
  creditAmount: ReactNode;
  expense: ReactNode;
  percentBud: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

function BudgetSepratorPage() {
  // forms
  const [formData, setFormData] = useState({
    [sepratorBudgetConfig.YEAR]: undefined,
    [sepratorBudgetConfig.AREA]: undefined,
    [sepratorBudgetConfig.BUDGET_METHOD]: undefined,
  });

  const [codingId, setCodingId] = useState(0);

  const activeTimeOut = useRef<any>(null);

  useEffect(() => {
    return () => clearTimeout(activeTimeOut.current);
  }, []);

  const afterCloseAnyModal = () => {
    /*
window.pageYOffset + document.querySelector('#c-2719').getBoundingClientRect().top

document.querySelector('#table-container').scrollTop
document.querySelector('#table-container').scrollTo
    */

    activeTimeOut.current = setTimeout(() => {
      setCodingId(0);
    }, 3000);
  };

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "id",
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
      name: "description",
      align: "left",
    },
    {
      title: "مصوب",
      name: "mosavab",
      split: true,
      align: "left",
      width: "160px",
    },
    {
      title: "اصلاح بودجه",
      name: "edit",
      split: true,
      align: "left",
      width: "160px",
    },
    {
      title: "ت اعتبار",
      name: "creditAmount",
      split: true,
      align: "left",
      hidden: formData[sepratorBudgetConfig.BUDGET_METHOD] === 1,
      width: "160px",
    },
    {
      title: formatExpenseName(formData[sepratorBudgetConfig.BUDGET_METHOD]),
      name: "expense",
      split: true,
      align: "left",
      width: "160px",
    },
    {
      title: "% جذب",
      name: "percentBud",
      percent: true,
      width: "80px",
    },
    {
      title: "عملیات",
      name: "actions",
      width: "100px",
    },
  ];

  // data
  const sepratorDetailDataQuery = useQuery(
    reactQueryKeys.report.proctor.getDetailData,
    () => sepratorBudgetApi.getDetail({}),
    {
      enabled: false,
    }
  );

  const queryClient = useQueryClient();

  const sepratorDetailMutation = useMutation(sepratorBudgetApi.getDetail, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        reactQueryKeys.report.proctor.getDetailData,
        data
      );
    },
  });

  const handleClickDetailIcon = (row: any) => {
    sepratorDetailMutation.mutate({
      ...formData,
      [sepratorBudgetConfig.CODING]: row[sepratorBudgetConfig.CODING],
    });
    setCodingId(row[sepratorBudgetConfig.CODING]);

    setDetailModalTitle(`${row.code} - ${row.description}`);
    handleOpenDetailModal();
  };

  // modal acc
  const [isOpenAccModal, setIsOpenAccModal] = useState(false);

  const handleClickAccModal = (row: any) => {
    clearTimeout(activeTimeOut.current);
    setCodingId(row[sepratorBudgetConfig.CODING]);
    setDetailModalTitle(`${row.code} - ${row.description}`);
    setIsOpenAccModal(true);
  };

  // modal project
  const sepratorProjectMutation = useMutation(sepratorBudgetApi.areaProject);
  const [isOpenProjectModal, setIsOpenProjectModal] = useState(false);
  const [baseInitialItem, setBaseInitialItem] = useState<any>(null);

  const handleClickProjectModal = (row: any) => {
    clearTimeout(activeTimeOut.current);
    sepratorProjectMutation.mutate({
      ...formData,
      [sepratorBudgetConfig.CODING]: row[sepratorBudgetConfig.CODING],
    });
    setBaseInitialItem(row);
    setCodingId(row[sepratorBudgetConfig.CODING]);
    setDetailModalTitle(`${row.code} - ${row.description}`);
    setIsOpenProjectModal(true);
  };

  // fix code
  const [isOpenCodeFixModal, setIsOpenCodeFixModal] = useState(false);
  const handleDoneTask = () => {
    enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
      variant: "success",
    });
    setIsOpenCodeFixModal(false);
    setTimeout(() => {
      afterCloseAnyModal();
      const top =
        (document.querySelector("#table-container") as any)?.scrollTop +
        (
          document.querySelector(`#c-${codingId}`) as any
        ).getBoundingClientRect()?.top -
        500;

      (document.querySelector("#table-container") as any)?.scrollTo?.(0, top);
    }, 500);
  };

  const handleClickFixCodeModal = (item: any) => {
    clearTimeout(activeTimeOut.current);
    setDetailModalTitle(`${item.code} - ${item.description}`);
    setCodingId(item[sepratorBudgetConfig.CODING]);
    setIsOpenCodeFixModal(true);
    setBaseInitialItem(item);
  };

  // fix mosavab
  const [isOpenMosavabFixModal, setIsOpenMosavabFixModal] = useState(false);

  const handleClickFixMosavabModal = (item: any) => {
    setDetailModalTitle(`${item.code} - ${item.description}`);
    setCodingId(item[sepratorBudgetConfig.CODING]);
    setIsOpenMosavabFixModal(true);
    setBaseInitialItem(item);
  };

  // actions
  const actionButtons = (row: TableDataItemShape | any) => (
    <Box display={"flex"} justifyContent={"center"}>
      {/* <SectionGuard
        permission={joinPermissions([
          accessNamesConfig.BUDGET__SEPRATOR_PAGE,
          accessNamesConfig.BUDGET__SEPRATOR_PAGE_FIX_MOSAVAB,
        ])}
      >
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={() => handleClickFixMosavabModal(row)}
          sx={{ fontSize: 10, minWidth: "15px", ml: 1 }}
        >
          ms
        </Button>
      </SectionGuard> */}

      <SectionGuard
        permission={joinPermissions([
          accessNamesConfig.BUDGET__SEPRATOR_PAGE,
          accessNamesConfig.BUDGET__SEPRATOR_PAGE_FIX_CODE,
        ])}
      >
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={() => handleClickFixCodeModal(row)}
          sx={{ fontSize: 10, minWidth: "15px", ml: 1 }}
        >
          c
        </Button>
      </SectionGuard>

      {row.crud && (
        <>
          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__SEPRATOR_PAGE,
              accessNamesConfig.BUDGET__SEPRATOR_PAGE_PROJECT_BTN,
            ])}
          >
            <Button
              color="primary"
              variant="outlined"
              size="small"
              onClick={() => handleClickProjectModal(row)}
              sx={{ fontSize: 10, minWidth: "15px", ml: 1 }}
            >
              p
            </Button>
          </SectionGuard>

          <SectionGuard
            permission={joinPermissions([
              accessNamesConfig.BUDGET__SEPRATOR_PAGE,
              accessNamesConfig.BUDGET__SEPRATOR_PAGE_ACC_BTN,
            ])}
          >
            <Button
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => handleClickAccModal(row)}
              sx={{ fontSize: 10, minWidth: "15px", ml: 1 }}
            >
              acc
            </Button>
          </SectionGuard>
        </>
      )}

      {formData[sepratorBudgetConfig.BUDGET_METHOD] === 3 && row.crud && (
        <SectionGuard
          permission={joinPermissions([
            accessNamesConfig.BUDGET__SEPRATOR_PAGE,
            accessNamesConfig.BUDGET__SEPRATOR_PAGE_TAMIN_BTN,
          ])}
        >
          <IconButton
            color="primary"
            size="small"
            onClick={() => handleClickDetailIcon(row)}
          >
            <CreditCardIcon />
          </IconButton>
        </SectionGuard>
      )}
    </Box>
  );

  const formatTableData = (
    unFormatData: GetSingleSepratorItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        id: i + 1,
        code: item.code,
        description: item.description,
        mosavab: item.mosavab,
        edit: item.edit,
        creditAmount: item.creditAmount,
        expense: item.expense,
        percentBud: item.percentBud,
        row_id: `c-${item.codingId}`,
        actions: actionButtons,
        bgcolor_pulse: codingId === item.codingId,
        bgcolor:
          codingId === item.codingId
            ? "#ffb1b1"
            : getBgColorBudget(
                item.levelNumber,
                formData[sepratorBudgetConfig.BUDGET_METHOD] || 0
              ),

        "bgcolor-creditAmount": item.creditAmount > item.edit && "#d7a2a2",
        "bgcolor-expense": item.expense > item.edit && "#d7a2a2",
        "textcolor-expense":
          item.expense < 0 ||
          (item.expense > item.creditAmount &&
            [2, 3, 4, 5].includes(
              formData[sepratorBudgetConfig.BUDGET_METHOD] as any
            ))
            ? "red"
            : "",
      })
    );

    return formatedData;
  };

  const sepratorQuery = useQuery(
    reactQueryKeys.budget.seprator.getData,
    () => sepratorBudgetApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = sepratorQuery.data
    ? formatTableData(
        sepratorQuery.data?.data //.sort((a, b) => +a.code - +b.code)
      )
    : [];

  // footer
  const sumMosavab = sumFieldsInSingleItemData(
    sepratorQuery.data?.data,
    "mosavab",
    (item: GetSingleSepratorItemShape) => item.levelNumber === 1
  );

  const sumCreditAmount = sumFieldsInSingleItemData(
    sepratorQuery.data?.data,
    "creditAmount",
    (item: GetSingleSepratorItemShape) => item.levelNumber === 1
  );

  const sumExpense = sumFieldsInSingleItemData(
    sepratorQuery.data?.data,
    "expense",
    (item: GetSingleSepratorItemShape) => item.levelNumber === 1
  );

  const sumEdit = sumFieldsInSingleItemData(
    sepratorQuery.data?.data,
    "edit",
    (item: GetSingleSepratorItemShape) => item.levelNumber === 1
  );
  const tableFooter: TableDataItemShape | any = {
    id: "جمع",
    "colspan-id": 3,
    "rowspan-id": 2,
    code: null,
    description: null,
    mosavab: sumMosavab,
    edit: sumEdit,
    creditAmount: sumCreditAmount,
    expense: sumExpense,
    percentBud: "",
    actions: () => "",
  };

  const tableBottomFooter: TableDataItemShape | any = {
    id: null,
    code: null,
    description: null,
    mosavab: "-",
    edit: "-",
    creditAmount: (
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        dir="ltr"
      >
        <div>{getPercent(sumCreditAmount, sumEdit) + "%"}</div>
        <div>{getPercent(sumCreditAmount, sumMosavab) + "%"}</div>
      </Box>
    ),
    expense: (
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        dir="ltr"
      >
        <div>{getPercent(sumExpense, sumEdit) + "%"}</div>
        <div>{getPercent(sumExpense, sumMosavab) + "%"}</div>
      </Box>
    ),
    "align-creditAmount": "center",
    "align-expense": "center",
    percentBud: "",
    actions: () => "",
  };

  // modal
  const [detailModal, setDetailModal] = useState(false);
  const [detailModalTitle, setDetailModalTitle] = useState("");
  const handleOpenDetailModal = () => {
    clearTimeout(activeTimeOut.current);
    setDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModal(false);
    afterCloseAnyModal();
  };

  // head group
  const tableHeadGroup = [
    {
      title: (
        <SepratoeBudgetForm
          formData={formData}
          setFormData={setFormData}
          printData={{
            data: tableData,
            footer: [tableFooter],
            bottomFooter: [tableBottomFooter],
          }}
        />
      ),
      colspan: tableHeads.filter((item) => !item.hidden).length,
    },
  ];

  return (
    <AdminLayout>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        headGroups={tableHeadGroup}
        footer={tableFooter}
        bottomFooter={tableBottomFooter}
      />

      {/* tamin modal */}
      <FixedModal
        open={detailModal}
        handleClose={handleCloseDetailModal}
        title={detailModalTitle}
        loading={sepratorDetailMutation.isLoading}
      >
        <SepratorModal1
          title={detailModalTitle}
          formdata={formData}
          coding={codingId}
          data={sepratorDetailDataQuery.data?.data || []}
        />
      </FixedModal>

      {/* acc modal */}
      <FixedModal
        open={isOpenAccModal}
        handleClose={() => {
          setIsOpenAccModal(false);
          afterCloseAnyModal();
        }}
        title={detailModalTitle}
        maxWidth="60%"
        maxHeight="70%"
      >
        <SepratorAccModal formData={formData} coding={codingId as any} />
      </FixedModal>

      {/* project modal */}
      <FixedModal
        open={isOpenProjectModal}
        handleClose={() => {
          setIsOpenProjectModal(false);
          afterCloseAnyModal();
        }}
        title={detailModalTitle}
        loading={sepratorProjectMutation.isLoading}
        maxWidth="md"
      >
        <SepratorProjectModal1
          data={sepratorProjectMutation.data?.data || []}
          formData={formData}
          baseModal1Title={detailModalTitle}
          baseCodingId={codingId}
          baseInitialItem={baseInitialItem}
          onCloseModal={() => {
            setIsOpenProjectModal(false);
            afterCloseAnyModal();
          }}
        />
      </FixedModal>

      {/* fix */}
      <FixedModal
        open={isOpenCodeFixModal}
        handleClose={() => {
          setIsOpenCodeFixModal(false);
          afterCloseAnyModal();
        }}
        title={detailModalTitle}
        maxWidth="sm"
        maxHeight="40%"
        minHeight="40%"
      >
        <SepratorFixCodeModal
          initialData={baseInitialItem}
          onDoneTask={handleDoneTask}
          formData={formData}
          coding={codingId}
        />
      </FixedModal>
    </AdminLayout>
  );
}

export default BudgetSepratorPage;
