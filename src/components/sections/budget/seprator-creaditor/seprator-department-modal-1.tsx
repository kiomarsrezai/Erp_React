import BudgetSepratorCreaditorInput from "components/sections/inputs/budget-seprator-creaditor-input";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import * as yup from "yup";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { ReactNode, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { sepratorCreaditorBudgetApi } from "api/budget/seprator-creaditor-api";
import { sepratorCreaditorBudgetConfig } from "config/features/budget/seprator-creaditro-config";
import { GetSingleSepratorCreaditorItemShape } from "types/data/budget/seprator-creaditor-type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import FixedTable from "components/data/table/fixed-table";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import FixedModal from "components/ui/modal/fixed-modal";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import SepratorCreaditModal from "./seprator-creadit-modal";
import SepratorUpdateModal from "./seprator-update-modal";

interface SepratorDepratmentModal1props {
  data: any[];
  baseTitle: ReactNode;
  baseInitialValue: any;
  formData: any;
}

function SepratorDepratmentModal1(props: SepratorDepratmentModal1props) {
  const { data: initData, baseTitle, baseInitialValue, formData } = props;

  const sepratorModal1Mutation = useMutation(
    sepratorCreaditorBudgetApi.getModalData
  );

  const data = sepratorModal1Mutation.data?.data || initData;

  const handleDoneTask = () => {
    setIsOpenCreaditModal(false);
    setIsOpenUpdateModal(false);
    setActiveIdUpdate(null);

    sepratorModal1Mutation.mutate({
      ...formData,
      [sepratorCreaditorBudgetConfig.coding]: baseInitialValue.codingId,
      [sepratorCreaditorBudgetConfig.project]: baseInitialValue.projectId,
    });
  };

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "نام",
      name: "departmanName",
      align: "left",
    },
    {
      title: "مصوب",
      name: "mosavabDepartman",
      split: true,
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];
  //   update
  const [activeIdUpdate, setActiveIdUpdate] = useState<null | number>(null);
  const [editMosavab, setEditMosavab] = useState<number>(0);

  const openEditFunctionality = (row: any) => {
    setEditMosavab(row.mosavabDepartman);
    setActiveIdUpdate(row.id);
  };

  const closeEditFunctionality = () => {
    setActiveIdUpdate(null);
  };

  const editMutation = useMutation(sepratorCreaditorBudgetApi.updateOne, {
    onSuccess: () => {
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
      handleDoneTask();
    },
  });

  const onSubmitEditFunctionality = () => {
    editMutation.mutate({
      id: activeIdUpdate,
      [sepratorCreaditorBudgetConfig.mosavab_creaditor]: editMosavab,
    });
  };

  const renderMosavabDepartman = (row: any) => {
    if (row.id === activeIdUpdate) {
      return (
        <TextField
          id="code-input"
          label="مصوب"
          variant="outlined"
          type="number"
          size="small"
          //   {...register(sepratorCreaditorBudgetConfig.mosavab_creaditor)}
          //   error={!!errors[sepratorCreaditorBudgetConfig.mosavab_creaditor]}
          //   helperText={
          //     (errors[sepratorCreaditorBudgetConfig.mosavab_creaditor]?.message ||
          //       "") as any
          //   }
          //   defaultValue={initialData?.mosavab || 0}
          value={editMosavab}
          onChange={(e) => setEditMosavab(+e.target.value)}
          autoComplete="off"
          fullWidth
        />
      );
    } else {
      return row.mosavabDepartman;
    }
  };

  // actions
  const actionButtons = (row: any) => (
    <Box display={"flex"} justifyContent={"center"}>
      {activeIdUpdate === row.id ? (
        <>
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
            onClick={closeEditFunctionality}
          >
            <CloseIcon />
          </IconButton>
        </>
      ) : (
        <IconButton
          color="primary"
          size="small"
          onClick={() => openEditFunctionality(row)}
        >
          <EditIcon />
        </IconButton>
      )}
    </Box>
  );

  const formatTableData = (unFormatData: any[]): any[] => {
    const formatedData: any[] | any = unFormatData.map((item, i) => ({
      ...item,
      mosavabDepartman: () => renderMosavabDepartman(item),
      number: i + 1,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = formatTableData(data);

  const sumMosavab = sumFieldsInSingleItemData(data, "mosavabDepartman");

  const tableFooter: any = {
    number: "جمع",
    "colspan-number": 2,
    departmanName: null,
    mosavabDepartman: sumMosavab,
    actions: () => "",
  };

  // modal creadit
  const sepratorProjectMutation = useMutation(sepratorBudgetApi.areaProject);
  const [activeInitialData, setActiveInitialData] = useState<null | any>(null);
  const [isOpenCreaditModal, setIsOpenCreaditModal] = useState(false);
  const [detailModalTitle, setDetailModalTitle] = useState<ReactNode>("");

  const handleClickCraditModal = () => {
    // setActiveInitialData(row);
    // setDetailModalTitle(`${row.code} - ${row.description}`);
    setIsOpenCreaditModal(true);
  };

  // modal update
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

  const handleClickUpdateModal = (row: any) => {
    setActiveInitialData(row);
    setDetailModalTitle(
      <>
        {baseTitle}
        <div>{row.departmanName}</div>
      </>
    );
    setIsOpenUpdateModal(true);
  };

  const tableHeadGroup: TableHeadGroupShape = [
    {
      title: (
        <IconButton
          color="primary"
          size="small"
          onClick={handleClickCraditModal}
        >
          <PersonAddIcon />
        </IconButton>
      ),
      colspan: 4,
    },
  ];

  return (
    <>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        footer={tableFooter}
        headGroups={tableHeadGroup}
        notFixed
      />

      {/* creadit modal */}
      <FixedModal
        open={isOpenCreaditModal}
        handleClose={() => setIsOpenCreaditModal(false)}
        title={baseTitle}
        loading={sepratorProjectMutation.isLoading}
        maxWidth="sm"
        maxHeight="70%"
      >
        <SepratorCreaditModal
          initialData={activeInitialData as any}
          onDoneTask={handleDoneTask}
          baseInitialValue={baseInitialValue}
          formData={formData}
          modal1Data={data}
        />
      </FixedModal>

      {/* update modal */}
      <FixedModal
        open={isOpenUpdateModal}
        handleClose={() => setIsOpenUpdateModal(false)}
        title={detailModalTitle}
        loading={sepratorProjectMutation.isLoading}
        maxWidth="sm"
        maxHeight="70%"
      >
        <SepratorUpdateModal
          initialData={activeInitialData as any}
          onDoneTask={handleDoneTask}
        />
      </FixedModal>
    </>
  );
}

export default SepratorDepratmentModal1;