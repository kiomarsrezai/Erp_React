import AdminLayout from "components/layout/admin-layout";
import Box from "@mui/material/Box";
import ProjectOrgCard from "components/sections/project/project-org-card";
import Draggable from "react-draggable";
import ProjectOrgTools from "components/sections/project/project-org-tools";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

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

  // insert mode
  const [isInsertMode, setIsInsertMode] = useState(false);

  const insertMutation = useMutation(orgProjectApi.insertProjectTable, {
    onSuccess: () => {
      getDataMutation.mutate(formData);
      setIsInsertMode(false);
    },
  });

  const [actionFormData, setActionFormData] = useState({
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
    }
  };

  //   heads
  const tableHeads: TableHeadShape = [
    {
      title: (
        <div>
          ردیف
          {formData[orgProjectConfig.area] && (
            <IconButton
              onClick={() => setIsInsertMode((state) => !state)}
              color="primary"
              size="small"
            >
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
      name: "dateFrom",
      width: "180px",
    },
    {
      title: "تا تاریخ",
      align: "left",
      name: "dateEnd",
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

  // action item
  const onChange = (e: any) => {
    changeInputHandler(e, setActionFormData);
  };
  const actionItem = {
    number: "افزودن",
    code: "",
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
    dateFrom: (
      <DatePicker
        // label="Date Picker"
        // editFormData.dateStart
        value={new Date(actionFormData.dateFrom)}
        onChange={(newValue) =>
          setActionFormData((state: any) => ({ ...state, dateFrom: newValue }))
        }
      />
    ),
    dateEnd: (
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
      <IconButton onClick={clickActionDone} color="primary" size="small">
        <CheckIcon />
      </IconButton>
    ),
  };

  //   data
  const formatTableData = (
    unFormatData: GetSingleOrgProjectTableItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      // proctorName: (
      //   <span style={{ whiteSpace: "nowrap" }}>{item.proctorName}</span>
      // ),
      actions: "actionButtons",
    }));

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
    <AdminLayout>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroups}
        data={filteredData}
        // footer={tableFooter}
      />
    </AdminLayout>
  );
}

export default OrgProjectTablePage;
