import FixedTable from "components/data/table/fixed-table";
import EditIcon from "@mui/icons-material/Edit";
import { TableHeadShape, TableHeadGroupShape } from "types/table-type";

import {
  GetSingleSepratorAccItemShape,
  GetSingleSepratorMosavabItemShape,
} from "types/data/budget/seprator-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import SectionGuard from "components/auth/section-guard";
import { joinPermissions } from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";
import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import FixedModal from "components/ui/modal/fixed-modal";
import SepratorFixMosavabModal2 from "./seprator-fix-mosavab-modal-2";

interface SepratorFixMosavabModal1props {
  data: GetSingleSepratorMosavabItemShape[];
  formData: any;
}
function SepratorFixMosavabModal1(props: SepratorFixMosavabModal1props) {
  const { data, formData } = props;

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      width: "90px",
    },
    {
      title: "کد",
      name: "code",
    },
    {
      title: "شرح",
      align: "left",
      name: "description",
    },
    {
      title: "مصوب",
      align: "left",
      name: "mosavabPublic",
      split: true,
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // actions
  const [isOpenMosavabFixModal, setIsOpenMosavabFixModal] = useState(false);
  const [activeMosavabItem, setActiveMosavabItem] =
    useState<null | GetSingleSepratorMosavabItemShape>(null);

  const handleClickFixMosavabModal = (
    item: GetSingleSepratorMosavabItemShape
  ) => {
    // setActiveMosavabItem()
    // setDetailModalTitle(`${item.code} - ${item.description}`);
    // setCodingId(item[sepratorBudgetConfig.CODING]);
    setActiveMosavabItem(item);
    setIsOpenMosavabFixModal(true);
  };

  const actionButtons = (item: GetSingleSepratorMosavabItemShape) => {
    return (
      <SectionGuard
        permission={joinPermissions([
          accessNamesConfig.BUDGET__SEPRATOR_PAGE,
          accessNamesConfig.BUDGET__SEPRATOR_PAGE_FIX_MOSAVAB,
        ])}
      >
        <IconButton
          size="small"
          color="primary"
          onClick={() => handleClickFixMosavabModal(item)}
        >
          <EditIcon />
        </IconButton>
      </SectionGuard>
    );
  };

  // data
  const formatTableData = (
    unFormatData: GetSingleSepratorMosavabItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      actions: () => actionButtons(item),
      number: i + 1,
    }));

    return formatedData;
  };

  const tableData = formatTableData(data);

  // footer
  const sumMosavabPublic = sumFieldsInSingleItemData(data, "mosavabPublic");
  const tableFooter: any = {
    number: "جمع",
    "colspan-number": 3,
    code: null,
    mosavabPublic: sumMosavabPublic,
    description: null,
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        footer={tableFooter}
        notFixed
      />

      <FixedModal
        open={isOpenMosavabFixModal}
        handleClose={() => {
          setIsOpenMosavabFixModal(false);
          // afterCloseAnyModal();
        }}
        title={`${activeMosavabItem?.code} - ${activeMosavabItem?.description}`}
        maxWidth="sm"
        maxHeight="40%"
        minHeight="40%"
      >
        <SepratorFixMosavabModal2
          initialData={activeMosavabItem as GetSingleSepratorMosavabItemShape}
          onDoneTask={() => {}}
          formData={formData}
        />
      </FixedModal>
    </>
  );
}

export default SepratorFixMosavabModal1;
