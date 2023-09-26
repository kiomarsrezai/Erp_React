import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";
import FixedModal from "components/ui/modal/fixed-modal";
import AbstructModal1 from "components/sections/abstruct/abstruct-modal-1";
import AbstractProctorForm from "components/sections/abstruct/abstract-proctor-form";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { abstructProctorConfig } from "config/features/report/proctor/abstruct-config";
import { GetSingleAbstructProctorItemShape } from "types/data/report/abstruct-proctor-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { abstructProctorApi } from "api/report/abstruct-proctor-api";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";

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

interface ReportProctorAbstructProps {
  tabRender?: ReactNode;
}
function ReportProctorAbstructPage(props: ReportProctorAbstructProps) {
  const { tabRender } = props;

  const [formData, setFormData] = useState({
    [abstructProctorConfig.YEAR]: undefined,
    [abstructProctorConfig.AREA]: 0,
    [abstructProctorConfig.PROCTOR]: 0,
    [abstructProctorConfig.BUDGETPROCESS]: 0,
  });

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
      colspan: 5,
      align: "center",
    },
    {
      title: "سرمایه ای",
      colspan: 5,
      align: "center",
    },
    {
      title: "% جذب کل",
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
      title: "ت اعتبار",
      name: "creditAmountCurrent",
      split: true,
      align: "left",
    },
    {
      title: "%",
      name: "percentCreditAmountCurrent",
      percent: true,
    },
    {
      title: "عملکرد",
      name: "expenseHazine",
      split: true,
      align: "left",
    },
    {
      title: "%",
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
      title: "ت اعتبار",
      name: "creditAmountCivil",
      split: true,
      align: "left",
    },
    {
      title: "%",
      name: "percentCreditAmountCivil",
      percent: true,
    },
    {
      title: "عملکرد",
      name: "expenseSarmaie",
      split: true,
      align: "left",
    },
    {
      title: "%",
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
    dataModalMutation.mutate({
      ...formData,
      proctorId: row.id,
      // [abstructProctorConfig.YEAR]: formData[abstructProctorConfig.YEAR],
    });
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
  const sumMosavabHazine = sumFieldsInSingleItemData(
    abstractQuery.data?.data || [],
    "mosavabCurrent"
  );
  const sumExpenseHazine = sumFieldsInSingleItemData(
    abstractQuery.data?.data || [],
    "expenseCurrent"
  );

  const sumMosavabSarmaie = sumFieldsInSingleItemData(
    abstractQuery.data?.data || [],
    "mosavabCivil"
  );
  const sumExpenseSarmaie = sumFieldsInSingleItemData(
    abstractQuery.data?.data || [],
    "expenseCivil"
  );

  const sumCreaditAmountCivil = sumFieldsInSingleItemData(
    abstractQuery.data?.data || [],
    "creditAmountCivil"
  );

  const sumCreaditAmountHazine = sumFieldsInSingleItemData(
    abstractQuery.data?.data || [],
    "creditAmountCurrent"
  );

  const tableFooter: TableDataItemShape & any = {
    number: "جمع",
    "colspan-number": 2,
    title: null,
    mosavabHazine: sumMosavabHazine,
    expenseHazine: sumExpenseHazine,
    percentCreditAmountCivil: getPercent(
      sumCreaditAmountCivil,
      sumMosavabSarmaie
    ),
    percentCreditAmountCurrent: getPercent(
      sumCreaditAmountHazine,
      sumMosavabHazine
    ),
    creditAmountCivil: sumCreaditAmountCivil,
    creditAmountCurrent: sumCreaditAmountHazine,
    jazbHazine: getPercent(sumExpenseHazine, sumMosavabHazine),
    mosavabSarmaie: sumMosavabSarmaie,
    expenseSarmaie: sumExpenseSarmaie,
    jazbSarmaie: getPercent(sumExpenseSarmaie, sumMosavabSarmaie),
    jazbKol: getPercent(
      sumExpenseSarmaie + sumExpenseHazine,
      sumMosavabHazine + sumMosavabSarmaie
    ),
    actions: () => "",
  };

  // form
  const tableTopHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <AbstractProctorForm
          formData={formData}
          setFormData={setFormData}
          tabRender={tabRender}
          printData={{
            data: tableData,
            footer: [tableFooter],
          }}
        />
      ),
      colspan: 14,
    },
  ];

  return (
    // <AdminLayout>
    <>
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
        maxHeight="90%"
      >
        <AbstructModal1
          data={dataModalMutation.data?.data || []}
          title={titleModal}
          formdata={formData}
          recordId={recordId}
        />
      </FixedModal>
    </>
    // </AdminLayout>
  );
}

export default ReportProctorAbstructPage;
