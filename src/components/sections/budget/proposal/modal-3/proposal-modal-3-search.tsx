import FixedTable from "components/data/table/fixed-table";
import AddIocn from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import { ReactNode } from "react";
import { GetSearchPropsalModal1Data } from "types/data/budget/proposal-type";
import { TableHeadShape } from "types/table-type";
import { useMutation } from "@tanstack/react-query";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { proposalConfig } from "config/features/budget/proposal-config";
import { GetSingleAreaShape } from "types/data/general/area-type";

interface TableDataItemShape {
  number: ReactNode;
  areaName: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

interface ProposalModal3SearchProos {
  formData: any;
  data: GetSingleAreaShape[];
  modal1CodingId: number;
  projectId: number;
  rowProjectId: number;
  onDoneTask: () => void;
}

function ProposalModal3Search(props: ProposalModal3SearchProos) {
  const {
    formData,
    data,
    modal1CodingId,
    projectId,
    onDoneTask,
    rowProjectId,
  } = props;

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "نام",
      name: "areaName",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // insert
  const insertMutation = useMutation(proposalBudgetApi.insertModal3, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      onDoneTask();
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  // data
  const handleAddClick = (row: GetSingleAreaShape & TableDataItemShape) => {
    insertMutation.mutate({
      [proposalConfig.area_public]: rowProjectId, // formData[proposalConfig.AREA],
      [proposalConfig.YEAR]: formData[proposalConfig.YEAR],
      [proposalConfig.coding]: modal1CodingId,
      [proposalConfig.project]: projectId,
      [proposalConfig.AREA]: row.id,
    });
  };

  const actionButtons = (row: any) => (
    <IconButton
      color="primary"
      size="small"
      onClick={() => handleAddClick(row)}
    >
      <AddIocn />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: GetSingleAreaShape[]
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

  const tableData = formatTableData(data);

  return <FixedTable data={tableData} heads={tableHeads} notFixed />;
}

export default ProposalModal3Search;
