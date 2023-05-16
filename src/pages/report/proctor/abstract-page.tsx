import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import AbstractProctorForm from "components/sections/forms/report/proctor/abstract-proctor-form";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";
import FixedModal from "components/ui/modal/fixed-modal";
import AbstructModal1 from "components/sections/abstruct/abstruct-modal-1";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { abstructProctorConfig } from "config/features/report/proctor/abstruct-config";
import { GetSingleAbstructProctorItemShape } from "types/data/report/abstruct-proctor-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { abstructProctorApi } from "api/report/abstruct-proctor-api";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

interface TableDataItemShape {
  number: ReactNode;
  title: ReactNode;
  mosavabHazine: ReactNode;
  expenseHazine: ReactNode;
  jazbHazine: ReactNode;
  mosavabSarmaie: ReactNode;
  expenseSarmaie: ReactNode;
  jazbSarmaie: ReactNode;
  jazbKol: ReactNode;
  actions: (row: any) => ReactNode;
}

function ReportProctorAbstructPage() {
  const [formData, setFormData] = useState({
    [abstructProctorConfig.YEAR]: undefined,
    [abstructProctorConfig.AREA]: 0,
    [abstructProctorConfig.PROCTOR]: 0,
    [abstructProctorConfig.BUDGETPROCESS]: 0,
  });

  const tableTopHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <AbstractProctorForm formData={formData} setFormData={setFormData} />
      ),
      colspan: 10,
    },
  ];

  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: "ردیف",
      colspan: 1,
      rowspan: 2,
      align: "center",
    },
    {
      title: "عنوان",
      colspan: 1,
      rowspan: 2,
      align: "center",
    },
    {
      title: "هزینه ای",
      colspan: 3,
      align: "center",
    },
    {
      title: "سرمایه ای",
      colspan: 3,
      align: "center",
    },
    {
      title: "جذب کل %",
      colspan: 1,
      rowspan: 2,
      align: "center",
    },
    {
      title: "عملیات",
      colspan: 1,
      rowspan: 2,
      align: "center",
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      hiddenSelf: true,
    },
    {
      title: "عنوان",
      name: "title",
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "مصوب",
      name: "mosavabHazine",
      split: true,
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expenseHazine",
      split: true,
      align: "left",
    },
    {
      title: "جذب %",
      name: "jazbHazine",
      percent: true,
    },
    {
      title: "مصوب",
      name: "mosavabSarmaie",
      split: true,
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expenseSarmaie",
      split: true,
      align: "left",
    },
    {
      title: "جذب %",
      name: "jazbSarmaie",
      percent: true,
      forceHaveBorder: true,
    },
    {
      title: "جذب کل %",
      name: "jazbKol",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "عملیات",
      name: "actions",
      hiddenSelf: true,
    },
  ];

  // modal
  const dataModalMutation = useMutation(abstructProctorApi.getModalData);

  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const handleOpenModal = () => {
    setIsOpenedModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenedModal(false);
  };

  // table data
  const [recordId, setRecordId] = useState(0);
  const handleListClicked = (row: any) => {
    setRecordId(row.id);
    dataModalMutation.mutate(row.id);
    setTitleModal(row["proctorName"]);

    handleOpenModal();
  };

  const actionButtons = (row: TableDataItemShape) => (
    <IconButton
      size="small"
      color="primary"
      onClick={() => handleListClicked(row)}
    >
      <FormatListBulletedIcon />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: GetSingleAbstructProctorItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      title: item.proctorName,
      mosavabHazine: item.mosavabCurrent,
      expenseHazine: item.expenseCurrent,
      "textcolor-expenseHazine": item.expenseCurrent < 0 ? "red" : "",
      "textcolor-expenseSarmaie": item.expenseCivil < 0 ? "red" : "",
      jazbHazine: item.percentCurrent,
      mosavabSarmaie: item.mosavabCivil,
      expenseSarmaie: item.expenseCivil,
      jazbSarmaie: item.percentCivil,
      jazbKol: item.percentTotal,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const abstractQuery = useQuery(
    reactQueryKeys.report.proctor.abstract,
    () => abstructProctorApi.getData(false),
    {
      enabled: false,
    }
  );

  const tableData = abstractQuery.data
    ? formatTableData(abstractQuery.data?.data)
    : [];

  // table footer
  const tableFooter: TableDataItemShape & any = {
    number: "جمع",
    "colspan-number": 2,
    title: null,
    mosavabHazine: sumFieldsInSingleItemData(
      abstractQuery.data?.data,
      "mosavabCurrent"
    ),
    expenseHazine: sumFieldsInSingleItemData(
      abstractQuery.data?.data,
      "expenseCurrent"
    ),
    jazbHazine: "",
    mosavabSarmaie: sumFieldsInSingleItemData(
      abstractQuery.data?.data,
      "mosavabCivil"
    ),
    expenseSarmaie: sumFieldsInSingleItemData(
      abstractQuery.data?.data,
      "expenseCivil"
    ),
    jazbSarmaie: "",
    jazbKol: "",
    actions: () => "",
  };

  return (
    <AdminLayout>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroups}
        topHeadGroups={tableTopHeadGroups}
        footer={tableFooter}
        data={tableData}
      />

      <FixedModal
        open={isOpenedModal}
        handleClose={handleCloseModal}
        loading={dataModalMutation.isLoading}
        title={titleModal}
      >
        <AbstructModal1
          data={dataModalMutation.data?.data || []}
          title={titleModal}
          formdata={formData}
          recordId={recordId}
        />
      </FixedModal>
    </AdminLayout>
  );
}

export default ReportProctorAbstructPage;
