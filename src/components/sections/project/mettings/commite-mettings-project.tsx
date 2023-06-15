import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";

import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { GetSingleCommiteDetailProjectModalShape } from "types/data/project/commite-project-type";

interface TableDataItemShape {
  number: ReactNode;
  areaNameShort: ReactNode;
  projectCode: ReactNode;
  projectName: ReactNode;
}

interface CommiteMettingsProjectProps {
  data: any[];
  onDoneTask: (project: GetSingleCommiteDetailProjectModalShape) => void;
}

function CommiteMettingsProject(props: CommiteMettingsProjectProps) {
  const { data, onDoneTask } = props;

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      width: "70px",
    },
    {
      title: "کد پروژه",
      name: "projectCode",
      width: "70px",
    },
    {
      title: "نام پروژه",
      name: "projectName",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
      width: "70px",
    },
  ];

  // head group
  const [filterText, setFilterText] = useState("");
  const headGroup: TableHeadGroupShape = [
    {
      title: (
        <Box sx={{ width: "80%", mx: "auto" }}>
          <TextField
            size="small"
            label="جستجو"
            value={filterText}
            variant="filled"
            onChange={(e) => setFilterText(e.target.value)}
            fullWidth
          />
        </Box>
      ),
      colspan: 4,
    },
  ];

  // update
  //   const queryClient = useQueryClient();
  //   const sepratorProjectMutation = useMutation(sepratorBudgetApi.areaProject, {
  //     onSuccess: (data) => {
  //       enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
  //         variant: "success",
  //       });
  //       queryClient.setQueryData(
  //         reactQueryKeys.budget.seprator.projectModal1,
  //         data
  //       );
  //       onClose();
  //     },
  //   });

  //   const updateMutation = useMutation(sepratorBudgetApi.areaAreaUpdate, {
  //     onSuccess: () => {
  //       sepratorProjectMutation.mutate({
  //         ...formData,
  //         [sepratorBudgetConfig.CODING]: baseCodingId,
  //       });
  //     },
  //   });
  const handleClickLink = (
    project: GetSingleCommiteDetailProjectModalShape
  ) => {
    // updateMutation.mutate({
    //   budgetDetailPrjectId: modal1ProjectId,
    //   programOperationDetailId: id,
    // });
    onDoneTask(project);
  };

  // actions
  const actionButtons = (item: GetSingleCommiteDetailProjectModalShape) => (
    <IconButton
      color="primary"
      size="small"
      onClick={() => handleClickLink(item)}
    >
      <CheckIcon />
    </IconButton>
  );

  // data
  const formatTableData = (
    unFormatData: GetSingleCommiteDetailProjectModalShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        actions: () => actionButtons(item),
      })
    );

    return formatedData;
  };

  const tableData = formatTableData(
    data.filter(
      (item: GetSingleCommiteDetailProjectModalShape) =>
        item.projectCode.includes(filterText) ||
        item.projectName.includes(filterText)
    )
  );

  return (
    <FixedTable
      heads={tableHeads}
      headGroups={headGroup}
      data={tableData}
      tableLayout="auto"
      enableVirtual
      notFixed
    />
  );
}

export default CommiteMettingsProject;
