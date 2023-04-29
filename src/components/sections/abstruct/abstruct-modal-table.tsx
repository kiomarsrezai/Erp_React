import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ColorizeIcon from "@mui/icons-material/Colorize";
import FixedModal from "components/ui/modal/fixed-modal";
import AbstructRowModalTable from "./abstruct-row-modal-table";
import CastleIcon from "@mui/icons-material/Castle";

import { ReactNode, useState } from "react";
import { GetSingleAbstructProctorModalDataItemShape } from "types/data/report/abstruct-proctor-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { abstructProctorApi } from "api/report/abstruct-proctor-api";
import { useMutation } from "@tanstack/react-query";
import { abstructProctorConfig } from "config/features/report/proctor/abstruct-config";

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

interface AbstructModalTableProps {
  data: any[];
  title: string;
  formdata: any;
  recordId: number;
}

function AbstructModalTable(props: AbstructModalTableProps) {
  const { data, title, formdata, recordId } = props;

  // table heads
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
      colspan: 1,
    },
    {
      title: "",
      colspan: 1,
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
      align: "left",
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

  // table data
  const handleClickCreateIcon = (row: any) => {
    dataModalRowMutation.mutate({
      ...formdata,
      [abstructProctorConfig.BUDGETPROCESS]: 2,
      [abstructProctorConfig.PROCTOR]: recordId,
      [abstructProctorConfig.AREA]: row.Id,
    });
    setAreaName(`${row.منطقه} - اعتبارات هزینه ای`);
    handleOpenBudgetRowModal();
  };

  const handleClickFareIcon = (row: any) => {
    dataModalRowMutation.mutate({
      ...formdata,
      [abstructProctorConfig.BUDGETPROCESS]: 3,
      [abstructProctorConfig.PROCTOR]: recordId,
      [abstructProctorConfig.AREA]: row.Id,
    });
    setAreaName(`${row.منطقه} - تملک دارایی های سرمایه ای`);
    handleOpenBudgetRowModal();
  };
  const actionButtons = (row: any) => (
    <Box display="flex">
      <IconButton
        color="primary"
        size="small"
        onClick={() => handleClickCreateIcon(row)}
      >
        <ColorizeIcon />
      </IconButton>

      <IconButton
        color="primary"
        size="small"
        onClick={() => handleClickFareIcon(row)}
      >
        <CastleIcon />
      </IconButton>
    </Box>
  );
  const formatTableData = (
    unFormatData: GetSingleAbstructProctorModalDataItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      title: item.منطقه,
      mosavabHazine: item.mosavabCurrent,
      expenseHazine: item.expenseCurrent,
      jazbHazine: item[" % جذب هزینه ای"],
      mosavabSarmaie: item.mosavabCivil,
      expenseSarmaie: item.expenseCivil,
      jazbSarmaie: item["% جذب سرمایه ای"],
      jazbKol: item["% جذب کل"],
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // table footer
  const tableFooter: TableDataItemShape = {
    number: "جمع",
    title: "",
    mosavabHazine: sumFieldsInSingleItemData(data, "mosavabCurrent"),
    expenseHazine: sumFieldsInSingleItemData(data, "expenseCurrent"),
    jazbHazine: "",
    mosavabSarmaie: sumFieldsInSingleItemData(data, "mosavabCivil"),
    expenseSarmaie: sumFieldsInSingleItemData(data, "expenseCivil"),
    jazbSarmaie: "",
    jazbKol: "",
    actions: () => "",
  };

  // modals
  const [budgetRowModal, setBudgetRowModal] = useState(false);
  const [areaName, setAreaName] = useState("");
  const handleCloseBudgetRowModal = () => {
    setBudgetRowModal(false);
  };

  const handleOpenBudgetRowModal = () => {
    setBudgetRowModal(true);
  };

  const dataModalRowMutation = useMutation(abstructProctorApi.getModalRowData);

  return (
    <>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroups}
        data={tableData}
        footer={tableFooter}
        notFixed
      />

      <FixedModal
        open={budgetRowModal}
        handleClose={handleCloseBudgetRowModal}
        title={`${title} - ${areaName}`}
        loading={dataModalRowMutation.isLoading}
      >
        <AbstructRowModalTable data={dataModalRowMutation.data?.data || []} />
      </FixedModal>
    </>
  );
}

export default AbstructModalTable;
