import AdminLayout from "components/layout/admin-layout";
import Box from "@mui/material/Box";
import ProjectOrgCard from "components/sections/project/project-org-card";
import Draggable from "react-draggable";
import ProjectOrgTools from "components/sections/project/project-org-tools";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";

import { grey } from "@mui/material/colors";
import { Tree, TreeNode } from "react-organizational-chart";
import { globalConfig } from "config/global-config";
import { orgProjectApi } from "api/project/org-project-api";
import { orgProjectConfig } from "config/features/project/org-project-config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { reactQueryKeys } from "config/react-query-keys-config";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import FixedTable from "components/data/table/fixed-table";
import OrgProjectTableForm from "./org-table-form";
import { GetSingleOrgProjectTableItemShape } from "types/data/project/org-project-type";
import { IconButton, TextField } from "@mui/material";
import ProjectScaleInput from "components/sections/inputs/project-scale-input";
import { DatePicker } from "@mui/x-date-pickers";
import { changeInputHandler } from "helper/form-utils";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import { enqueueSnackbar } from "notistack";

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
    // areaArray: "",
    projectScaleId: undefined,
  });

  const clickActionDone = () => {
    if (isInsertMode) {
      insertMutation.mutate({
        ...actionFormData,
        areaArray: `-${formData[orgProjectConfig.area]}-`,
      });
    } else {
      updateMutation.mutate({
        ...actionFormData,
        id: activeIdUpdate,
        areaArray: `-${formData[orgProjectConfig.area]}-`,
      });
    }
  };

  //   heads
  const addClick = () => {
    setActionFormData({
      projectCode: "",
      projectName: "",
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
      dateFrom: row.dateFrom,
      dateEnd: row.dateEnd,
      projectScaleId: row.projectScaleId,
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

  // action item
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
      />
    ),
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

  const actionBtn = (row: GetSingleOrgProjectTableItemShape) => (
    <Box display={"flex"} justifyContent={"center"}>
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
