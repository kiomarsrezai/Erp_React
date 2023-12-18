import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { connectBudgetApi } from "api/budget/budget-connect-api";
import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import AdminLayout from "components/layout/admin-layout";
import BudgetConnectForm from "components/sections/budget/connect/budget-connect-form";
import { budgetConnectConfig } from "config/features/budget/budget-connect-config";
import { reactQueryKeys } from "config/react-query-keys-config";
import { ReactNode, useRef, useState } from "react";
import { GetSingleBudgetConnectItemShape } from "types/data/budget/budget-connect-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import EditIcon from "@mui/icons-material/Edit";
import FixedModal from "components/ui/modal/fixed-modal";
import BudgetConnectEditModal from "components/sections/budget/connect/budget-connect-edit-modal";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  description: ReactNode;
  mosavab: ReactNode;
  proctorName: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

function BudgetConnectPage() {
  const [formData, setFormData] = useState({
    [budgetConnectConfig.YEAR]: undefined,
    [budgetConnectConfig.AREA]: undefined,
    [budgetConnectConfig.BUDGET_METHOD]: undefined,
  });

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
      title: "متولی",
      align: "left",
      name: "proctorName",
      width: "150px",
    },
    {
      title: "مجری",
      align: "left",
      name: "codingNatureName",
      width: "150px",
    },
    {
      title: "مصوب",
      align: "left",
      name: "mosavab",
      split: true,
      width: "150px",
    },
    {
      title: "عملیات",
      name: "actions",
      width: "80px",
    },
  ];

  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <BudgetConnectForm formData={formData} setFormData={setFormData} />
      ),
      colspan: tableHeads.length,
    },
  ];

  // edit modal
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [editModalTitle, setEditModalTitle] = useState("");

  const [activeOpenRowId, setActiveOpenRowId] = useState<number | null>(null);
  const activeTimeOut = useRef<any>(null);

  const handleCloseModal = () => {
    activeTimeOut.current = setTimeout(() => {
      setActiveOpenRowId(null);
    }, 1000);

    setIsOpenEditModal(false);
  };

  const [editModalInitialData, setEditModalInitialData] =
    useState<GetSingleBudgetConnectItemShape | null>(null);

  const openEditModal = (row: GetSingleBudgetConnectItemShape) => {
    setEditModalTitle(`${row.code} - ${row.description}`);
    setActiveOpenRowId(row.id);
    setIsOpenEditModal(true);
    setEditModalInitialData(row);
  };

  const queryClient = useQueryClient();
  const getDataMutation = useMutation(connectBudgetApi.getData, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.budget.connect.getData, data);
    },
  });

  const handleDoneModalEditTask = () => {
    setIsOpenEditModal(false);
    setEditModalInitialData(null);
    getDataMutation.mutate(formData);
  };

  // actions
  const actionButtons = (row: GetSingleBudgetConnectItemShape) => (
    <IconButton size="small" color="primary" onClick={() => openEditModal(row)}>
      <EditIcon />
    </IconButton>
  );

  //   data

  const formatTableData = (
    unFormatData: GetSingleBudgetConnectItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        proctorName: (
          <span style={{ whiteSpace: "nowrap" }}>{item.proctorName}</span>
        ),
        actions: actionButtons,
        bgcolor: activeOpenRowId === item.id && "#ffb1b1",
      })
    );

    return formatedData;
  };

  const proposalQuery = useQuery(
    reactQueryKeys.budget.connect.getData,
    () => connectBudgetApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = proposalQuery.data
    ? formatTableData(proposalQuery.data?.data)
    : [];

  // footer
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 4,
    code: null,
    description: null,
    proctorName: null,
    mosavab: sumFieldsInSingleItemData(proposalQuery.data?.data, "mosavab"),
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

      <FixedModal
        open={isOpenEditModal}
        handleClose={handleCloseModal}
        title={editModalTitle}
        maxWidth="sm"
        maxHeight="270px"
        minHeight="270px"
      >
        <BudgetConnectEditModal
          initialData={editModalInitialData}
          onDoneTask={handleDoneModalEditTask}
        />
      </FixedModal>
    </>
  );
}

export default BudgetConnectPage;
