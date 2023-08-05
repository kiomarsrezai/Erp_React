import { useQuery } from "@tanstack/react-query";
import { creditRequestApi } from "api/credit/credit-request-api";
import { GetSingleContractMotalebItemShape } from "types/data/contracts/contracts-motaleb-type";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useRef, useState } from "react";
import FixedTable from "components/data/table/fixed-table";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";

interface Props {
  onDoneTask: () => void;
  activeItem: GetSingleContractMotalebItemShape;
}

export default function ContractMotalebModalAdd(props: Props) {
  const dataQuery = useQuery(
    ["search-supplier"],
    creditRequestApi.suplliersRead
  );

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const openAnchorEl = Boolean(anchorEl);

  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };

  const [filterText, setFilterText] = useState("");
  const inputRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    if (filterText) {
      //   setAnchorEl(inputRef.current as any);
      timeoutRef.current = setTimeout(() => {
        setAnchorEl(inputRef.current as any);
      }, 1000);
    } else {
      setAnchorEl(null);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [filterText]);

  const tableHeadGroup: TableHeadGroupShape = [
    {
      title: (
        <Box sx={{ width: "80%", mx: "auto" }}>
          <TextField
            size="small"
            label="جستجو"
            value={filterText}
            ref={inputRef}
            variant="filled"
            onChange={(e) => setFilterText(e.target.value)}
            fullWidth
          />
        </Box>
      ),
      colspan: 5,
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "سال",
      name: "yearName",
    },
    {
      title: "ماه",
      name: "monthId",
    },
    {
      title: "مبلغ",
      name: "monthlyAmount",
    },
    {
      title: "توضیحات",
      name: "description",
    },
  ];

  const tableData: any = [];

  const filteredItems =
    dataQuery.data?.data
      .filter((item) => item.suppliersName.includes(filterText))
      .filter((_, i) => i < 10) || [];

  return (
    <>
      <FixedTable
        data={tableData}
        heads={tableHeads}
        headGroups={tableHeadGroup}
        enableVirtual
        notFixed
      />

      <Popover
        open={openAnchorEl}
        anchorEl={anchorEl}
        onClose={handleCloseAnchor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {filteredItems.length ? (
          filteredItems.map((item, i) => {
            return (
              <Box
                sx={{
                  py: 1,
                  px: 2,
                  width: 250,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 1,
                }}
                key={i}
              >
                {item.suppliersName}
                <IconButton onClick={() => {}} size="small" color="primary">
                  <CheckIcon />
                </IconButton>
              </Box>
            );
          })
        ) : (
          <Box
            sx={{
              py: 1,
              px: 2,
              width: 250,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
            }}
          >
            هیج آیتمی یافت نشد
          </Box>
        )}
      </Popover>
    </>
  );
}
