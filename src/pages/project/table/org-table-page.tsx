import AdminLayout from "components/layout/admin-layout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

import { globalConfig } from "config/global-config";
import { orgProjectApi } from "api/project/org-project-api";
import { orgProjectConfig } from "config/features/project/org-project-config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import FixedTable from "components/data/table/fixed-table";
import OrgProjectTableForm from "../../../components/sections/project/org-table/org-table-form";
import { GetSingleOrgProjectTableItemShape } from "types/data/project/org-project-type";
import { Chip, IconButton, TextField } from "@mui/material";
import ProjectScaleInput from "components/sections/inputs/project-scale-input";
import { DatePicker } from "@mui/x-date-pickers";
import { changeInputHandler } from "helper/form-utils";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import { enqueueSnackbar } from "notistack";
import { convertToCalenderDate } from "helper/date-utils";
import { areaGeneralApi } from "api/general/area-general-api";
import FixedModal from "components/ui/modal/fixed-modal";
import OrgTableAreaModal from "components/sections/project/org-table/org-table-area-modal";
import { GetSingleAreaShape } from "types/data/general/area-type";
import ChartOrgTable from "components/sections/project/org-table/chart-org-table";

function OrgProjectTablePage() {
  const [formData, setFormData] = useState({
    [orgProjectConfig.area]: undefined,
  });

  const queryClient = useQueryClient();
  const getDataMutation = useMutation(orgProjectApi.getProjectTable, {
    onSuccess: (data) => {
      queryClient.setQueryData(reactQueryKeys.project.org.getTable, data);
    },
  });

  // action mode
  const [isInsertMode, setIsInsertMode] = useState(false);

  const insertMutation = useMutation(orgProjectApi.insertProjectTable, {
    onSuccess: () => {
      getDataMutation.mutate(formData);
      setIsInsertMode(false);
      setActiveIdUpdate(null);
    },
  });

  const updateMutation = useMutation(orgProjectApi.updateProjectTable, {
    onSuccess: () => {
      getDataMutation.mutate(formData);
      setIsInsertMode(false);
      setActiveIdUpdate(null);
    },
  });

  const [actionFormData, setActionFormData] = useState<any>({
    projectCode: "",
    projectName: "",
    dateFrom: "",
    dateEnd: "",
    areaArray: "",
    projectScaleId: undefined,
  });

  const clickActionDone = () => {
    if (isInsertMode) {
      const newAreaId =
        formData[orgProjectConfig.area] === 10
          ? actionFormData.areaArray
          : `-${formData[orgProjectConfig.area]}-`;
      insertMutation.mutate({
        ...actionFormData,
        areaArray: newAreaId,
      });
    } else {
      updateMutation.mutate({
        ...actionFormData,
        id: activeIdUpdate,
        areaArray: actionFormData.areaArray,
      });
    }
  };

  //   heads
  const addClick = () => {
    setActionFormData({
      projectCode: "",
      projectName: "",
      areaArray: "",
      dateFrom: new Date(),
      dateEnd: new Date(),
      projectScaleId: "",
    });
    setIsInsertMode((state) => !state);
    setActiveIdUpdate(null);
  };
  const tableHeads: TableHeadShape = [
    {
      title: (
        <div>
          ردیف
          {formData[orgProjectConfig.area] && (
            <IconButton onClick={addClick} color="primary" size="small">
              <AddIcon />
            </IconButton>
          )}
        </div>
      ),
      name: "number",
      width: "100px",
    },
    {
      title: "کد پروژه",
      name: "projectCode",
      width: "150px",
    },
    {
      title: "نام پروژه",
      align: "left",
      name: "projectName",
    },
    {
      title: "ابعاد اجرایی",
      align: "left",
      name: "projectScaleName",
      width: "180px",
    },
    {
      title: "از تاریخ",
      align: "left",
      name: "dateFromShamsi",
      width: "180px",
    },
    {
      title: "تا تاریخ",
      align: "left",
      name: "dateEndShamsi",
      width: "180px",
    },
    {
      title: "مناطق",
      align: "left",
      name: "areas",
      hidden: formData[orgProjectConfig.area] !== 10,
    },
    {
      title: "عملیات",
      name: "actions",
      width: "100px",
    },
  ];

  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <OrgProjectTableForm formData={formData} setFormData={setFormData} />
      ),
      colspan: tableHeads.length,
    },
  ];

  /*
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
  */

  // delete
  const [idItemForDelete, setIdItemForDelete] = useState(0);
  const [titleItemForDelete, setTitleItemForDelete] = useState("");
  const [isOpenConfrimDelete, setIsOpenConfrimDelete] = useState(false);

  const handleClickDelete = (row: GetSingleOrgProjectTableItemShape) => {
    setTitleItemForDelete(
      `آیا مایل به حذف  ${row.projectCode} - ${row.projectName} هستید؟`
    );
    setIdItemForDelete(row.id);
    setIsOpenConfrimDelete(true);
  };

  const projectDeleteMutation = useMutation(orgProjectApi.deleteProjectTable, {
    onSuccess: () => {
      getDataMutation.mutate(formData);
      setIsOpenConfrimDelete(false);
      enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
        variant: "success",
      });
    },
  });

  const handleConfrimDelete = () => {
    projectDeleteMutation.mutate({
      id: idItemForDelete,
    });
  };

  // action btn
  const [activeIdUpdate, setActiveIdUpdate] = useState<null | number>(null);

  const openEditFunctionality = (row: GetSingleOrgProjectTableItemShape) => {
    // setEditFormData({
    //   description: row.description,
    //   dateStart: row.dateStart,
    //   dateEnd: row.dateEnd,
    // });
    setActionFormData({
      projectCode: row.projectCode,
      projectName: row.projectName,
      dateFrom: convertToCalenderDate(row.dateFrom),
      dateEnd: convertToCalenderDate(row.dateEnd),
      projectScaleId: row.projectScaleId,
      areaArray: row.areaArray,
    });
    setActiveIdUpdate(row.id);
  };

  const closeEditFunctionality = () => {
    setActiveIdUpdate(null);
    setIsInsertMode(false);
  };

  const onSubmitEditFunctionality = () => {
    // updateWbsMutation.mutate({
    //   id: activeIdUpdate,
    //   ...editFormData,
    // });
  };

  // area modal
  const [isOpenAreaModal, setIsOpenAreaModal] = useState(false);
  const [activeAreaArray, setActiveAreaArray] = useState<string[]>([]);

  const handleClickAreaModal = (areaArray: string[]) => {
    setActiveAreaArray(areaArray);
    setIsOpenAreaModal(true);
  };

  const handleDoneAreaSelect = (newAreas: string) => {
    setIsOpenAreaModal(false);

    setActionFormData((state: any) => ({
      ...state,
      areaArray: newAreas,
    }));
  };

  // action item
  const areaData = useQuery(["area-data"], () => areaGeneralApi.getData(3));

  const renderAreas = (item: GetSingleOrgProjectTableItemShape) => {
    const filteredAreasArray = item.areaArray
      .split("-")
      .filter((areaItem) => Boolean(areaItem));

    return (
      <Box display={"flex"} flexWrap={"wrap"} gap={0.5}>
        {filteredAreasArray.map((areaItem, i) => (
          <Chip
            size="small"
            label={
              areaData.data?.data.find((a) => a.id === Number(areaItem))
                ?.areaNameShort
            }
            key={i}
          />
        ))}
        {!item.id && (
          <Button
            size="small"
            onClick={() => handleClickAreaModal(filteredAreasArray)}
          >
            <SearchIcon sx={{ fontSize: 16 }} />
          </Button>
        )}
      </Box>
    );
  };

  const onChange = (e: any) => {
    changeInputHandler(e, setActionFormData);
  };
  const actionItem = {
    number: isInsertMode ? "افزودن" : "ویرایش",
    projectCode: actionFormData.projectCode,
    projectName: (
      <TextField
        id="project-name-input"
        label=""
        variant="outlined"
        // type="number"
        size="small"
        name="projectName"
        value={actionFormData.projectName}
        onChange={onChange}
        autoComplete="off"
        fullWidth
      />
    ),
    projectScaleName: (
      <ProjectScaleInput
        value={actionFormData.projectScaleId as any}
        setter={setActionFormData}
        name={"projectScaleId"}
      />
    ),
    dateFromShamsi: (
      <DatePicker
        // label="Date Picker"
        // editFormData.dateStart
        value={new Date(actionFormData.dateFrom)}
        onChange={(newValue) =>
          setActionFormData((state: any) => ({ ...state, dateFrom: newValue }))
        }
        slotProps={{ textField: { size: "small" } }}
      />
    ),
    dateEndShamsi: (
      <DatePicker
        // label="Date Picker"
        // editFormData.dateStart
        value={new Date(actionFormData.dateEnd)}
        onChange={(newValue) =>
          setActionFormData((state: any) => ({ ...state, dateEnd: newValue }))
        }
        slotProps={{ textField: { size: "small" } }}
      />
    ),
    areas: () => renderAreas(actionFormData),
    actions: (
      <>
        <IconButton onClick={clickActionDone} color="primary" size="small">
          <CheckIcon />
        </IconButton>

        <IconButton
          onClick={closeEditFunctionality}
          color="primary"
          size="small"
        >
          <ClearIcon />
        </IconButton>
      </>
    ),
  };

  // org
  const [isOpenOrgId, setIsOpenOrgId] = useState(false);
  const [activeOrgRow, setActiveOrgRow] =
    useState<GetSingleOrgProjectTableItemShape | null>(null);
  const handleOpenOrg = (item: GetSingleOrgProjectTableItemShape) => {
    setActiveOrgRow(item);
    setIsOpenOrgId(true);
  };

  // action
  const actionBtn = (row: GetSingleOrgProjectTableItemShape) => (
    <Box display={"flex"} justifyContent={"center"}>
      <IconButton
        color="primary"
        onClick={() => handleOpenOrg(row)}
        size="small"
      >
        <OpenInFullIcon />
      </IconButton>

      <IconButton
        color="primary"
        size="small"
        onClick={() => openEditFunctionality(row)}
      >
        <EditIcon />
      </IconButton>

      <IconButton
        color="error"
        onClick={() => handleClickDelete(row)}
        size="small"
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );

  //   data
  const formatTableData = (
    unFormatData: GetSingleOrgProjectTableItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => {
      if (activeIdUpdate === item.id) {
        return actionItem;
      } else {
        return {
          ...item,
          number: i + 1,
          // proctorName: (
          //   <span style={{ whiteSpace: "nowrap" }}>{item.proctorName}</span>
          // ),
          areas: () => renderAreas(item),
          actions: () => actionBtn(item),
        };
      }
    });

    return formatedData;
  };

  const orgTableQuery = useQuery(
    reactQueryKeys.project.org.getTable,
    () => orgProjectApi.getProjectTable({}),
    {
      enabled: false,
    }
  );

  const tableData = orgTableQuery.data
    ? formatTableData(orgTableQuery.data?.data)
    : [];

  const filteredData = [...(isInsertMode ? [actionItem] : []), ...tableData];

  return (
    <>
      <AdminLayout>
        <FixedTable
          heads={tableHeads}
          headGroups={tableHeadGroups}
          data={filteredData}
          // footer={tableFooter}
        />
      </AdminLayout>

      {/* area modal */}
      <FixedModal
        open={isOpenAreaModal}
        handleClose={() => setIsOpenAreaModal(false)}
      >
        <OrgTableAreaModal
          areaArray={activeAreaArray}
          allAreas={areaData.data?.data as GetSingleAreaShape[]}
          onDone={handleDoneAreaSelect}
        />
      </FixedModal>

      {/* org modal */}
      <FixedModal
        open={isOpenOrgId}
        handleClose={() => setIsOpenOrgId(false)}
        maxWidth="97%"
        maxHeight="97%"
        dontCloseWithBox
        title={`${activeOrgRow?.projectCode} - ${activeOrgRow?.projectName}`}
      >
        <ChartOrgTable
          activeItem={activeOrgRow as GetSingleOrgProjectTableItemShape}
        />
      </FixedModal>

      {/* delete  */}
      <ConfrimProcessModal
        onCancel={() => setIsOpenConfrimDelete(false)}
        onConfrim={handleConfrimDelete}
        text={titleItemForDelete}
        open={isOpenConfrimDelete}
      />
    </>
  );
}

export default OrgProjectTablePage;
