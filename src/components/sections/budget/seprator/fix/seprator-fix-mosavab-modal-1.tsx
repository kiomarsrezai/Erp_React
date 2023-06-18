import FixedTable from "components/data/table/fixed-table";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { TableHeadShape, TableHeadGroupShape } from "types/table-type";

import {
  GetSingleSepratorAccItemShape,
  GetSingleSepratorMosavabItemShape,
} from "types/data/budget/seprator-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import SectionGuard from "components/auth/section-guard";
import { joinPermissions } from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import FixedModal from "components/ui/modal/fixed-modal";
import SepratorFixMosavabModal2 from "./seprator-fix-mosavab-modal-2";
import { useMutation } from "@tanstack/react-query";
import { proposalBudgetApi } from "api/budget/proposal-api";
import { globalConfig } from "config/global-config";
import { enqueueSnackbar } from "notistack";
import { sepratorBudgetApi } from "api/budget/seprator-api";

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
      width: "140px",
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
      width: "160px",
    },
    {
      title: "عملیات",
      name: "actions",
      width: "120px",
    },
  ];

  // mosavab
  const [editMosavab, setEditMosavab] = useState(0);

  const renderMosavab = (item: GetSingleSepratorMosavabItemShape) => {
    if (
      item.budgetDetailId === activeMosavabItem?.budgetDetailId &&
      item.budgetDetailProjectId === activeMosavabItem?.budgetDetailProjectId &&
      item.budgetDetailProjectAreaId ===
        activeMosavabItem?.budgetDetailProjectAreaId
    ) {
      return (
        <TextField
          id="mosavab-input"
          label=""
          variant="outlined"
          type="number"
          size="small"
          value={editMosavab}
          onChange={(e) => setEditMosavab(+e.target.value)}
          autoComplete="off"
          inputProps={{
            sx: {
              height: "17px",
            },
          }}
          fullWidth
        />
      );
    } else {
      return mosavabMutation.isLoading ? "" : item.mosavabProject;
    }
  };

  // base data
  const mosavabMutation = useMutation(sepratorBudgetApi.fixMosavabRead);

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
    setEditMosavab(item.mosavabPublic);
    // setIsOpenMosavabFixModal(true);
  };

  const editMutation = useMutation(sepratorBudgetApi.fixMosavabUpdate, {
    onSuccess: () => {
      console.log({ formData });

      mosavabMutation.mutate(formData);
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      setActiveMosavabItem(null);
      // handleDoneActionTask();
    },
    onError: () => {
      //enqueueSnackbar(globalConfig.ERROR_MESSAGE, {
      //variant: "error",
      //});
    },
  });

  const onSubmitEditFunctionality = () => {
    editMutation.mutate({
      budgetDetailId: activeMosavabItem?.budgetDetailId,
      budgetDetailProjectId: activeMosavabItem?.budgetDetailProjectId,
      budgetDetailProjectAreaId: activeMosavabItem?.budgetDetailProjectAreaId,
      mosavab: editMosavab,
    });
  };

  const actionButtons = (item: GetSingleSepratorMosavabItemShape) => {
    if (
      item.budgetDetailId === activeMosavabItem?.budgetDetailId &&
      item.budgetDetailProjectId === activeMosavabItem?.budgetDetailProjectId &&
      item.budgetDetailProjectAreaId ===
        activeMosavabItem?.budgetDetailProjectAreaId
    ) {
      return (
        <Box display={"flex"} justifyContent={"center"}>
          <IconButton
            color="success"
            size="small"
            onClick={onSubmitEditFunctionality}
          >
            <CheckIcon />
          </IconButton>

          <IconButton
            color="error"
            size="small"
            onClick={() => setActiveMosavabItem(null)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      );
    } else {
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
    }
  };

  // data
  const formatTableData = (
    unFormatData: GetSingleSepratorMosavabItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      actions: () => actionButtons(item),
      mosavabPublic: () => renderMosavab(item),
      number: i + 1,
    }));

    return formatedData;
  };

  const tableData = formatTableData(mosavabMutation.data?.data || data);

  // footer
  const sumMosavabPublic = sumFieldsInSingleItemData(
    mosavabMutation.data?.data || data,
    "mosavabPublic"
  );
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
          formData={{}} // formData
        />
      </FixedModal>
    </>
  );
}

export default SepratorFixMosavabModal1;
