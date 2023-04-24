import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import AbstractProctorForm from "components/sections/forms/report/proctor/abstract-proctor-form";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { abstructProctorConfig } from "config/features/report/proctor/abstruct-config";
import { GetSingleAbstructProctorItemShape } from "types/data/report/abstruct-proctor-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { abstructProctorApi } from "api/report/abstruct-proctor-api";
import FixedModal from "components/ui/modal/fixed-modal";
import AbstructModalTable from "components/sections/abstruct/abstruct-modal-table";
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
    [abstructProctorConfig.YEAR]: 32,
    [abstructProctorConfig.AREA]: 1,
    [abstructProctorConfig.BUDGETPROCESS]: 1,
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
      title: "",
      colspan: 1,
    },
    {
      title: "",
      colspan: 1,
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
      title: "",
      colspan: 2,
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "عنوان",
      name: "title",
      align: "left",
    },
    {
      title: "مصوب",
      name: "mosavabHazine",
      split: true,
    },
    {
      title: "عملکرد",
      name: "expenseHazine",
      split: true,
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
    },
    {
      title: "عملکرد",
      name: "expenseSarmaie",
      split: true,
    },
    {
      title: "جذب %",
      name: "jazbSarmaie",
      percent: true,
    },
    {
      title: "جذب کل %",
      name: "jazbKol",
      percent: true,
    },
    {
      title: "عملیات",
      name: "actions",
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
  const handleListClicked = (row: any) => {
    dataModalMutation.mutate(row.Id);
    setTitleModal(row["متولی"]);

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
      title: item.متولی,
      mosavabHazine: item.mosavabCurrent,
      expenseHazine: item.expenseCurrent,
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
    () => abstructProctorApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = abstractQuery.data
    ? formatTableData(abstractQuery.data?.data)
    : [];

  // table footer
  const tableFooter: TableDataItemShape = {
    number: "جمع",
    title: "",
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
        <AbstructModalTable data={dataModalMutation.data?.data || []} />
      </FixedModal>
    </AdminLayout>
  );
}

export default ReportProctorAbstructPage;
