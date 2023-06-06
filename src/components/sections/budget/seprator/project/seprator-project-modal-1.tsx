import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import FixedModal from "components/ui/modal/fixed-modal";
import PersonIcon from "@mui/icons-material/Person";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import SepratorProjectModal2 from "./seprator-project-modal-2";

import { TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { GetSingleSepratorProjectItemShape } from "types/data/budget/seprator-type";
import { reactQueryKeys } from "config/react-query-keys-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import SepratorDepratmentModal1 from "../../seprator-creaditor/seprator-department-modal-1";
import { sepratorCreaditorBudgetApi } from "api/budget/seprator-creaditor-api";
import { sepratorCreaditorBudgetConfig } from "config/features/budget/seprator-creaditro-config";

interface TableDataItemShape {
  number: ReactNode;
  areaNameShort: ReactNode;
  projectCode: ReactNode;
  projectName: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

interface SepratorProjectModal1props {
  data: any[];
  formData: any;
  baseModal1Title: string;
  baseCodingId: number;
}
function SepratorProjectModal1(props: SepratorProjectModal1props) {
  const { data, formData, baseModal1Title, baseCodingId } = props;

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "کد پروژه",
      name: "projectCode",
    },
    {
      title: "نام پروژه",
      name: "projectName",
      align: "left",
    },
    {
      title: "مصوب",
      name: "mosavab",
      split: true,
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  const [modalTitle, setModalTitle] = useState<ReactNode>("");

  // modal project
  const sepratorAreaMutation = useMutation(sepratorBudgetApi.areaArea);
  const [isOpenAreaModal, setIsOpenAreaModal] = useState(false);
  const [modal1ProjectId, setModal1ProjectId] = useState<null | number>(null);

  const handleClickAreaModal = (row: any) => {
    setModalTitle(
      <>
        {baseModal1Title}
        <div>
          {row.projectCode} - {row.projectName}
        </div>
      </>
    );
    setModal1ProjectId(row?.projectId as any);
    sepratorAreaMutation.mutate(formData);
    setIsOpenAreaModal(true);
  };

  // actions
  // <IconButton
  //   color="primary"
  //   size="small"
  //   onClick={() => handleClickAreaModal(row)}
  // >
  {
    /* <FormatListBulletedIcon /> */
  }
  // </IconButton>
  const actionButtons = (row: TableDataItemShape | any) => (
    <Box display={"flex"} justifyContent={"center"} gap={1}>
      <Button
        color="primary"
        variant="outlined"
        size="small"
        onClick={() => handleClickAreaModal(row)}
        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
        // startIcon={}
      >
        <SearchIcon sx={{ fontSize: 17 }} />p
      </Button>

      <IconButton
        color="primary"
        size="small"
        onClick={() => handleClickOpenModal1(row)}
      >
        <PersonIcon />
      </IconButton>
    </Box>
  );

  // data
  const formatTableData = (
    unFormatData: GetSingleSepratorProjectItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const modal1Query = useQuery(
    reactQueryKeys.budget.seprator.projectModal1,
    sepratorBudgetApi.areaProject,
    {
      enabled: false,
    }
  );

  const tableData = formatTableData(modal1Query.data?.data || data);

  // footer
  const sumMosavab = sumFieldsInSingleItemData(
    modal1Query.data?.data || data,
    "mosavab"
  );
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 3,
    projectCode: null,
    projectName: null,
    mosavab: sumMosavab,
    actions: "",
  };

  // modal 1
  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const [activeInitialData, setActiveInitialData] = useState<null | any>(null);

  const sepratorModal1Mutation = useMutation(
    sepratorCreaditorBudgetApi.getModalData
  );

  const handleClickOpenModal1 = (row: any) => {
    setActiveInitialData(row);
    // setDetailModalTitle(`${row.code} - ${row.description}`);
    sepratorModal1Mutation.mutate({
      ...formData,
      [sepratorCreaditorBudgetConfig.coding]: baseCodingId,
      [sepratorCreaditorBudgetConfig.project]: row.projectId,
    });
    setIsOpenModal1(true);
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        footer={tableFooter}
        notFixed
      />

      {/* area modal */}
      <FixedModal
        open={isOpenAreaModal}
        handleClose={() => setIsOpenAreaModal(false)}
        loading={sepratorAreaMutation.isLoading}
        title={modalTitle}
        maxWidth="sm"
        maxHeight="70%"
      >
        <SepratorProjectModal2
          data={sepratorAreaMutation.data?.data || []}
          modal1ProjectId={modal1ProjectId}
          baseCodingId={baseCodingId}
          formData={formData}
          onClose={() => setIsOpenAreaModal(false)}
        />
      </FixedModal>

      {/* modal 1 */}
      <FixedModal
        open={isOpenModal1}
        handleClose={() => setIsOpenModal1(false)}
        title={modalTitle}
        loading={sepratorModal1Mutation.isLoading}
        maxWidth="sm"
        maxHeight="70%"
      >
        <SepratorDepratmentModal1
          data={sepratorModal1Mutation.data?.data || []}
          baseTitle={modalTitle}
          baseInitialValue={activeInitialData}
          formData={formData}
          codingId={baseCodingId}
          baseMosavab={sumMosavab}
        />
      </FixedModal>
    </>
  );
}

export default SepratorProjectModal1;
