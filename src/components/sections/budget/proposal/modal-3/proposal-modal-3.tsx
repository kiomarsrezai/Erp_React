import FixedTable from "components/data/table/fixed-table";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FixedModal from "components/ui/modal/fixed-modal";
import ProposalModal3Edit from "./proposal-modal-3-edit";
import ProposalModal3Search from "./proposal-modal-3-search";

import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { GetSingleLevel5DetailProposalItemShape } from "types/data/budget/proposal-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { proposalConfig } from "config/features/budget/proposal-config";
import { useMutation } from "@tanstack/react-query";
import { areaGeneralApi } from "api/general/area-general-api";

interface TableDataItemShape {
  number: ReactNode;
  area: ReactNode;
  creditAmount: ReactNode;
  mosavab: ReactNode;
  expense: ReactNode;
  edit: ReactNode;
  percent: ReactNode;
}

interface ProposalModal3Props {
  data: any[];
  formData: any;
}
function ProposalModal3(props: ProposalModal3Props) {
  const { data, formData } = props;

  // search modal
  const [isOpenSearchModal, setIsOpenSearchModal] = useState(false);

  const searchMutation = useMutation(areaGeneralApi.getData);

  const handleSearchClick = () => {
    searchMutation.mutate(3);
    setIsOpenSearchModal(true);
  };

  // heads
  const tableHeadGroup: TableHeadGroupShape = [
    {
      title: (
        <IconButton color="primary" size="small" onClick={handleSearchClick}>
          <SearchIcon />
        </IconButton>
      ),
      colspan: 9,
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "منطقه",
      name: "area",
    },
    {
      title: "مصوب",
      name: "mosavab",
      align: "left",
      split: true,
    },
    {
      title: "اصلاح",
      name: "edit",
      align: "left",
      split: true,
    },
    {
      title: "ت اعتبار",
      name: "creditAmount",
      split: true,
      align: "left",
      hidden: formData[proposalConfig.BUDGET_METHOD] === 1,
    },
    {
      title: "هزینه",
      name: "expense",
      align: "left",
      split: true,
    },
    {
      title: "% جذب",
      name: "percent",
      percent: true,
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // eidt modal
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [editModalInitialData, setEditModalInitialData] = useState({});
  const handleEditBtnClick = (
    row: TableDataItemShape & GetSingleLevel5DetailProposalItemShape
  ) => {
    setEditModalInitialData(row);
    setIsOpenEditModal(true);
  };

  // data
  const actionButtons = (
    row: TableDataItemShape & GetSingleLevel5DetailProposalItemShape
  ) => (
    <>
      <IconButton size="small" color="error" onClick={() => {}}>
        <DeleteIcon />
      </IconButton>

      <IconButton
        size="small"
        color="primary"
        onClick={() => handleEditBtnClick(row)}
      >
        <EditIcon />
      </IconButton>
    </>
  );

  const formatTableData = (
    unFormatData: GetSingleLevel5DetailProposalItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      area: item.areaNameShort,
      creditAmount: 0,
      mosavab: item.mosavab,
      expense: item.expense,
      "textcolor-expense": item.expense < 0 ? "red" : "",
      percent: item.percentBud,
      edit: item.edit,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // footer
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 2,
    area: null,
    creditAmount: 0,
    mosavab: sumFieldsInSingleItemData(data, "mosavab"),
    edit: sumFieldsInSingleItemData(data, "edit"),
    percent: "",
    expense: sumFieldsInSingleItemData(data, "expense"),
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        footer={tableFooter}
        headGroups={tableHeadGroup}
        notFixed
      />

      {/* search modal */}
      <FixedModal
        open={isOpenSearchModal}
        handleClose={() => setIsOpenSearchModal(false)}
        maxWidth="sm"
        maxHeight="60%"
        title="افزودن آیتم"
        loading={searchMutation.isLoading}
      >
        <ProposalModal3Search
          formData={formData}
          data={searchMutation.data?.data || []}
        />
      </FixedModal>

      {/* edit modal */}
      <FixedModal
        open={isOpenEditModal}
        handleClose={() => setIsOpenEditModal(false)}
        title="ویرایش آیتم"
        maxWidth="sm"
        maxHeight="60%"
      >
        <ProposalModal3Edit initialData={editModalInitialData} />
      </FixedModal>
    </>
  );
}

export default ProposalModal3;