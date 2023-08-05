import { useMutation, useQuery } from "@tanstack/react-query";
import { creditRequestApi } from "api/credit/credit-request-api";
import {
  GetSingleContractLeftModalDataItemShape,
  GetSingleContractMotalebItemShape,
} from "types/data/contracts/contracts-motaleb-type";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import FixedTable from "components/data/table/fixed-table";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { contractsMotalebApi } from "api/contracts/contracts-motaleb-api";

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

  //   heads
  const insertMutation = useMutation(contractsMotalebApi.insertModalItem);
  const handleSaveClick = async () => {
    let shouldUpdateItems: any = [];
    for (const key in addItemsList) {
      const value = addItemsList?.[key];
      if (value === true) {
        shouldUpdateItems.push(+key);
      }
    }
    try {
      await Promise.all(
        shouldUpdateItems.map((item: any) => {
          return insertMutation.mutateAsync({
            reciveBankId: props.activeItem.id,
            contractInstallmentsId: item,
          });
        })
      );
    } catch {
      return props.onDoneTask();
    }
    props.onDoneTask();
  };

  const tableHeads: TableHeadShape = [
    {
      title: (
        <div>
          ردیف
          <IconButton color="primary" onClick={handleSaveClick}>
            <AddIcon />
          </IconButton>
        </div>
      ),
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

  //   data
  const [addItemsList, setAddItemsList] = useState<any>({});
  const toggleItem = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setAddItemsList((prevState: any) => {
      const result = {
        ...prevState,
        [value]: checked,
      };

      return result;
    });
  };

  const formatTableData = (
    unFormatData: GetSingleContractLeftModalDataItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: (
        <>
          <Checkbox
            value={item.id}
            checked={!!addItemsList[item.id]}
            onChange={toggleItem}
            size="small"
          />

          {i + 1}
        </>
      ),
    }));

    return formatedData;
  };

  const filteredItems =
    dataQuery.data?.data
      .filter((item) => item.suppliersName.includes(filterText))
      .filter((_, i) => i < 10) || [];

  //   add
  const readDataItem = useMutation(contractsMotalebApi.readModalItem, {
    onSuccess(data) {
      //   tableData = formatTableData(data.data);
    },
  });

  const tableData: GetSingleContractLeftModalDataItemShape[] = useMemo(() => {
    return formatTableData(readDataItem.data?.data || []);
  }, [readDataItem.data?.data, addItemsList]);

  const clickAdd = (id: number) => {
    readDataItem.mutate({
      suppliersId: id,
      reciveBankId: props.activeItem.id,
    });
    setAnchorEl(null);
  };

  return (
    <>
      <FixedTable
        data={tableData}
        heads={tableHeads}
        headGroups={tableHeadGroup}
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
                <IconButton
                  onClick={() => clickAdd(item.id)}
                  size="small"
                  color="primary"
                >
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
