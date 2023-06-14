import {
  Avatar,
  Card,
  CardContent,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useMutation, useQuery } from "@tanstack/react-query";
import { mettingsProjectApi } from "api/project/meetings-project-api";
import BoxLoading from "components/ui/loading/box-loading";
import { ChangeEvent, useState } from "react";
import grey from "@mui/material/colors/grey";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import defaultProfileImg from "assets/images/default-profile.png";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import FixedTable from "components/data/table/fixed-table";
import {
  GetSingleCommiteDetailConfirmationModalShape,
  GetSingleCommiteDetailWbsModalShape,
  GetSingleWbsUserListShape,
} from "types/data/project/commite-project-type";

interface CommiteConfirmationModal2Props {
  onSelectUser: (users: number[]) => void;
  ignoreItems: GetSingleCommiteDetailConfirmationModalShape[];
}
function CommiteConfirmationModal2(props: CommiteConfirmationModal2Props) {
  const { onSelectUser, ignoreItems } = props;

  const usersQuery = useQuery(
    ["confirmation-user-list"],
    mettingsProjectApi.getWbsUserList
  );
  const [searchText, setSearchText] = useState("");

  //   head group
  const headGroup: TableHeadGroupShape = [
    {
      title: (
        <Box sx={{ width: "80%", mx: "auto" }}>
          <TextField
            id="user-input"
            label="جستجوی کاربر"
            variant="filled"
            size="small"
            onChange={(e) => setSearchText(e.target.value)}
            autoComplete="off"
            fullWidth
          />
        </Box>
      ),
      colspan: 3,
    },
  ];

  // heads
  const handleSaveClick = async () => {
    // let shouldUpdateItems: any = [];
    // for (const key in addItemsList) {
    //   const value = addItemsList?.[key];
    //   if (value === true) {
    //     shouldUpdateItems.push(+key);
    //   }
    // }
    // try {
    //   await Promise.all(
    //     shouldUpdateItems.map((item: any) => {
    //       return insertMutation.mutateAsync({
    //         requestId: formData.id,
    //         budgetDetailProjectAreatId: item,
    //       });
    //     })
    //   );
    // } catch {
    //   return onDoneTask();
    // }
    // enqueueSnackbar(globalConfig.SUCCESS_MESSAGE, {
    //   variant: "success",
    // });
    // onDoneTask();
    onSelectUser(addItemsList);
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
      title: "نام",
      name: "name",
    },
    {
      title: "سمت",
      name: "bio",
      align: "left",
    },
    // {
    //   title: "عملیات",
    //   name: "actions",
    // },
  ];

  //   data
  const [addItemsList, setAddItemsList] = useState<any>({});
  const toggleItem = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setAddItemsList((prevState: any) => {
      // let itemValue = prevState[sepratorCreaditorBudgetConfig.creaditorId];
      // itemValue[value] = checked;
      // if (itemValue.find(value)) {
      // } else {
      //   itemValue = [...itemValue, value];
      // }

      const result = {
        ...prevState,
        [value]: checked,
      };

      return result;
    });
  };

  const formatTableData = (
    unFormatData: GetSingleWbsUserListShape[]
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
      name: `${item.firstName} ${item.lastName}`,
      //   actions: actionButtons,
    }));

    return formatedData;
  };

  const tableData = formatTableData(
    usersQuery.data?.data.filter(
      (item) =>
        item.firstName.includes(searchText) ||
        item.lastName.includes(searchText) ||
        item.bio.includes(searchText)
      //    &&
      // ignoreItems.find((ignoreItem) => ignoreItem.id !== item.id)
    ) || []
  );

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

export default CommiteConfirmationModal2;
