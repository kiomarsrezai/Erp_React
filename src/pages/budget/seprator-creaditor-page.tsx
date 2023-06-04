import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import FixedModal from "components/ui/modal/fixed-modal";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import SepratorCreaditorBudgetForm from "components/sections/budget/seprator-creaditor/seprator-creaditor-budget-form";
import SepratorCreaditModal from "components/sections/budget/seprator-creaditor/seprator-creadit-modal";
import EditIcon from "@mui/icons-material/Edit";
import SepratorUpdateModal from "components/sections/budget/seprator-creaditor/seprator-update-modal";

import { TableHeadShape } from "types/table-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import { ReactNode, useState } from "react";
import { GetSingleSepratorItemShape } from "types/data/budget/seprator-type";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { formatExpenseName } from "helper/data-utils";
import { sepratorCreaditorBudgetConfig } from "config/features/budget/seprator-creaditro-config";
import { sepratorCreaditorBudgetApi } from "api/budget/seprator-creaditor-api";
import { getBgColorBudget } from "helper/get-color-utils";
import SepratorDepratmentModal1 from "components/sections/budget/seprator-creaditor/seprator-department-modal-1";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  description: ReactNode;
  mosavab: ReactNode;
  edit: ReactNode;
  creditAmount: ReactNode;
  expense: ReactNode;
  percentBud: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

function BudgetSepratorCreaditorPage() {
  // forms
  const [formData, setFormData] = useState({
    [sepratorCreaditorBudgetConfig.YEAR]: undefined,
    [sepratorCreaditorBudgetConfig.AREA]: undefined,
    [sepratorCreaditorBudgetConfig.BUDGET_METHOD]: undefined,
  });

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "کد",
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
      width: "300px",
      align: "left",
    },
    {
      title: "مصوب",
      name: "mosavab",
      split: true,
      align: "left",
    },
    {
      title: "اصلاح بودجه",
      name: "edit",
      split: true,
      align: "left",
    },
    {
      title: "ت اعتبار",
      name: "creditAmount",
      split: true,
      align: "left",
      hidden: formData[sepratorBudgetConfig.BUDGET_METHOD] === 1,
    },
    {
      title: formatExpenseName(formData[sepratorBudgetConfig.BUDGET_METHOD]),
      name: "expense",
      split: true,
      align: "left",
    },
    {
      title: "% جذب",
      name: "percentBud",
      percent: true,
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  const tableHeadGroup = [
    {
      title: (
        <SepratorCreaditorBudgetForm
          formData={formData}
          setFormData={setFormData}
        />
      ),
      colspan: tableHeads.filter((item) => !item.hidden).length,
    },
  ];

  // modal creadit
  const sepratorProjectMutation = useMutation(sepratorBudgetApi.areaProject);
  const [activeInitialData, setActiveInitialData] = useState<null | any>(null);
  const [isOpenCreaditModal, setIsOpenCreaditModal] = useState(false);
  const [detailModalTitle, setDetailModalTitle] = useState("");

  const handleClickCraditModal = (row: any) => {
    setActiveInitialData(row);
    setDetailModalTitle(`${row.code} - ${row.description}`);
    setIsOpenCreaditModal(true);
  };

  // modal update
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

  const handleClickUpdateModal = (row: any) => {
    setActiveInitialData(row);
    setDetailModalTitle(`${row.code} - ${row.description}`);
    setIsOpenUpdateModal(true);
  };

  // modal 1

  const [isOpenModal1, setIsOpenModal1] = useState(false);

  const sepratorModal1Mutation = useMutation(
    sepratorCreaditorBudgetApi.getModalData
  );

  const handleClickOpenModal1 = (row: any) => {
    setActiveInitialData(row);
    setDetailModalTitle(`${row.code} - ${row.description}`);
    sepratorModal1Mutation.mutate({
      ...formData,
      [sepratorCreaditorBudgetConfig.coding]: row.codingId,
      [sepratorCreaditorBudgetConfig.project]: row.projectId,
    });
    setIsOpenModal1(true);
  };

  // actions
  const actionButtons = (row: TableDataItemShape | any) => (
    <Box display={"flex"} justifyContent={"center"}>
      {row.crud && (
        <IconButton
          color="primary"
          size="small"
          onClick={() => handleClickOpenModal1(row)}
        >
          <PersonIcon />
        </IconButton>
      )}

      {row.levelNumber === 0 && (
        <IconButton
          color="primary"
          size="small"
          onClick={() => handleClickUpdateModal(row)}
        >
          <EditIcon />
        </IconButton>
      )}
    </Box>
  );

  const formatTableData = (
    unFormatData: GetSingleSepratorItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        code: item.code,
        description: item.description,
        mosavab: item.mosavab,
        edit: item.edit,
        creditAmount: item.creditAmount,
        expense: item.expense,
        "textcolor-expense": item.expense < 0 ? "red" : "",
        percentBud: item.percentBud,
        actions: actionButtons,
        bgcolor: getBgColorBudget(
          item.levelNumber,
          formData[sepratorBudgetConfig.BUDGET_METHOD] || 0
        ),

        "bgcolor-creditAmount": item.creditAmount > item.mosavab && "#d7a2a2",
        "bgcolor-expense": item.expense > item.mosavab && "#d7a2a2",
      })
    );

    return formatedData;
  };

  const sepratorQuery = useQuery(
    reactQueryKeys.budget.sepratorCreaditor.getData,
    () => sepratorBudgetApi.getData({}),
    {
      enabled: false,
    }
  );

  let formatedData: any[] = [];

  sepratorQuery.data?.data.forEach((item) => {
    if (!formatedData.find((formatedItem) => formatedItem.code === item.code)) {
      if (item.crud) {
        formatedData.push({
          ...item,
          mosavab: 0,
        });
      } else {
        formatedData.push({
          ...item,
          project: "-",
          mosavab: 0,
        });
      }
    }
  });

  sepratorQuery.data?.data.forEach((item) => {
    formatedData = formatedData.map((formatedItem) => {
      if (formatedItem.code === item.code) {
        return {
          ...formatedItem,
          mosavab: formatedItem.mosavab + item.mosavab,
        };
      } else {
        return formatedItem;
      }
    });
  });

  // console.log({ formatedData });

  // let beforeMosavab = 0;
  // let beforeCode: any = null;
  // let beforeItem: any = null;
  // sepratorQuery.data?.data.forEach((item) => {
  //   if (beforeCode === null) {
  //     beforeMosavab = item.mosavab;
  //     beforeCode = item.code;
  //     beforeItem = item;
  //   } else {
  //     if (beforeCode === item.code) {
  //       beforeMosavab += item.mosavab;
  //       beforeItem = item;
  //     } else {
  //       formatedData.push({
  //         ...beforeItem,
  //         project: "-",
  //         description: "-",
  //         mosavab: beforeMosavab,
  //       });
  //       beforeMosavab = 0;
  //       beforeCode = item.code;
  //     }
  //   }
  // const lastItem =
  //   formatedData.length > 0
  //     ? formatedData[formatedData.length - 1]
  //     : undefined;
  // if (lastItem?.code === item.code) {
  //   beforeMosavab += item.mosavab;
  // } else {
  //   formatedData.push({
  //     ...item,
  //     project: "-",
  //     mosavab: beforeMosavab,
  //   });
  //   beforeMosavab = 0;
  // }
  // });

  // console.log({ formatedData });

  // const tableData = sepratorQuery.data
  //   ? formatTableData(sepratorQuery.data?.data)
  //   : [];
  const tableData = formatTableData(formatedData);

  // footer
  const sumMosavab = sumFieldsInSingleItemData(
    sepratorQuery.data?.data,
    "mosavab",
    (item: GetSingleSepratorItemShape) => item.levelNumber !== 0
  );

  const sumCreditAmount = sumFieldsInSingleItemData(
    sepratorQuery.data?.data,
    "creditAmount",
    (item: GetSingleSepratorItemShape) => item.levelNumber !== 0
  );

  const sumExpense = sumFieldsInSingleItemData(
    sepratorQuery.data?.data,
    "expense",
    (item: GetSingleSepratorItemShape) => item.levelNumber !== 0
  );

  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 3,
    code: null,
    description: null,
    mosavab: sumMosavab,
    edit: sumFieldsInSingleItemData(
      sepratorQuery.data?.data,
      "edit",
      (item: GetSingleSepratorItemShape) => item.levelNumber !== 0
    ),
    creditAmount: sumCreditAmount,
    expense: sumExpense,
    percentBud: "",
    actions: () => "",
  };

  // done modal task
  const queryClient = useQueryClient();
  const getDataMutation = useMutation(sepratorCreaditorBudgetApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(
        reactQueryKeys.budget.sepratorCreaditor.getData,
        data
      );
    },
  });
  const handleDoneTask = () => {
    setIsOpenCreaditModal(false);
    setIsOpenUpdateModal(false);

    getDataMutation.mutate(formData);
  };
  return (
    <AdminLayout>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        headGroups={tableHeadGroup}
        footer={tableFooter}
      />

      {/* modal 1 */}
      <FixedModal
        open={isOpenModal1}
        handleClose={() => setIsOpenModal1(false)}
        title={detailModalTitle}
        loading={sepratorModal1Mutation.isLoading}
        maxWidth="md"
      >
        <SepratorDepratmentModal1
          data={sepratorModal1Mutation.data?.data || []}
          baseTitle={detailModalTitle}
          baseInitialValue={activeInitialData}
          formData={formData}
        />
      </FixedModal>
      {/* creadit modal */}
      {/* <FixedModal
        open={isOpenCreaditModal}
        handleClose={() => setIsOpenCreaditModal(false)}
        title={detailModalTitle}
        loading={sepratorProjectMutation.isLoading}
        maxWidth="md"
      >
        <SepratorCreaditModal
          initialData={activeInitialData as any}
          onDoneTask={handleDoneTask}
        />
      </FixedModal> */}

      {/* update modal */}
      {/* <FixedModal
        open={isOpenUpdateModal}
        handleClose={() => setIsOpenUpdateModal(false)}
        title={detailModalTitle}
        loading={sepratorProjectMutation.isLoading}
        maxWidth="md"
      >
        <SepratorUpdateModal
          initialData={activeInitialData as any}
          onDoneTask={handleDoneTask}
        />
      </FixedModal> */}
    </AdminLayout>
  );
}

export default BudgetSepratorCreaditorPage;
