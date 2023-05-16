import FixedTable from "components/data/table/fixed-table";
import AddIocn from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { ReactNode, useState } from "react";
import { GetSearchPropsalModal1Data } from "types/data/budget/proposal-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  description: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

interface ProposalModal1ModalAddProos {
  formData: any;
  data: GetSearchPropsalModal1Data[];
}

function ProposalModal1ModalAdd(props: ProposalModal1ModalAddProos) {
  const { formData, data } = props;

  const [filterText, setFilterText] = useState("");

  const headGroup: TableHeadGroupShape = [
    {
      title: (
        <Box display={"flex"} justifyContent={"center"}>
          <TextField
            size="small"
            label="جستجو"
            value={filterText}
            variant="filled"
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Box>
      ),
      colspan: 4,
    },
  ];

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "کد",
      name: "code",
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  //   data
  const handleAddClick = () => {
    alert("should add");
  };

  const actionButtons = () => (
    <IconButton color="primary" size="small" onClick={handleAddClick}>
      <AddIocn />
    </IconButton>
  );
  const formatTableData = (
    unFormatData: GetSearchPropsalModal1Data[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = filterText.length
    ? formatTableData(
        data.filter((item) => item.description.includes(filterText))
      )
    : [];

  return (
    <FixedTable
      data={tableData}
      heads={tableHeads}
      headGroups={headGroup}
      enableVirtual
      notFixed
    />
  );
}

export default ProposalModal1ModalAdd;
