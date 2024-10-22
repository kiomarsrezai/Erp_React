import FixedTable from "components/data/table/fixed-table";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { ReactNode, useEffect, useState } from "react";

import {GetSingleSepratorAccItemShape, GetSingleSepratorItemShape} from "types/data/budget/seprator-type";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { reactQueryKeys } from "config/react-query-keys-config";
import Box from "@mui/material/Box";
import SectionGuard from "../../../../auth/section-guard";
import {joinPermissions} from "../../../../../helper/auth-utils";
import {accessNamesConfig} from "../../../../../config/access-names-config";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import FixedModal from "../../../../ui/modal/fixed-modal";
import SepratorSetYearModal from "../fix/seprator-set-year-modal";

interface TableDataItemShape {
  number: ReactNode;
  dateSanad: ReactNode;
  numberSanad: ReactNode;
  description: ReactNode;
  expense: ReactNode;
  action: any;
}

interface SepratorModal1props {
  formData: any;
  coding: string;
}
function SepratorAccModal(props: SepratorModal1props) {
  const { formData, coding } = props;

  const [modalFormData, setModalFormData] = useState({
    [sepratorBudgetConfig.kind]: undefined,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    const name = (event.target as HTMLInputElement).name;

    setModalFormData((state: any) => ({ ...state, [name]: +value }));
  };

  const accQuery = useQuery(
    reactQueryKeys.budget.proposal.getAccData,
    () => sepratorBudgetApi.areaAcc({}),
    {
      enabled: false,
    }
  );

  const queryClient = useQueryClient();
  const sepratorAccMutation = useMutation(sepratorBudgetApi.areaAcc, {
    onSuccess(data) {
      queryClient.setQueryData(reactQueryKeys.budget.proposal.getAccData, data);
    },
  });

  useEffect(() => {
    if (modalFormData[sepratorBudgetConfig.kind]) {
      sepratorAccMutation.mutate({
        ...formData,
        [sepratorBudgetConfig.CODING]: coding,
        [sepratorBudgetConfig.kind]: modalFormData[sepratorBudgetConfig.kind],
      });
    }
  }, [modalFormData]);

  // head group
  const tableHeadGroup: TableHeadGroupShape = [
    {
      title: (
        <RadioGroup
          name={sepratorBudgetConfig.kind}
          value={modalFormData[sepratorBudgetConfig.kind]}
          onChange={handleChange}
          row
        >
          <FormControlLabel
            value={1}
            checked={modalFormData[sepratorBudgetConfig.kind] === 1}
            control={<Radio />}
            label="تامین اعتبار"
          />
          <FormControlLabel
            value={2}
            checked={modalFormData[sepratorBudgetConfig.kind] === 2}
            control={<Radio />}
            label="اسناد حسابداری"
          />
        </RadioGroup>
      ),
      colspan: 5,
    },
  ];

  // heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      width: "90px",
    },
    {
      title: "شماره سند",
      name: "numberSanad",
      width: "110px",
    },
    {
      title: "تاریخ سند",
      name: "dateSanad",
      width: "110px",
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
    },
    {
      title: "عملکرد",
      name: "expense",
      split: true,
      align: "left",
      width: "150px",
    },
    {
      title: "عملیات",
      name: "actions",
      width: "100px",
      hidden: modalFormData[sepratorBudgetConfig.kind] !== 1
    },
  ];
  
  const [isOpenAddCodeModal, setIsOpenAddCodeModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  
  const handleOpenAddCodeModal = (row: any) => {
    setIsOpenAddCodeModal(true);
    setSelectedRow(row);
  };
  
  const handleCloseAddCodeModal = () => {
    setIsOpenAddCodeModal(false);
  };
  
  function actions(item: any){
    return (
        <Box display={"flex"} alignItems={"center"}>
          
          <SectionGuard
              permission={joinPermissions([
                accessNamesConfig.BUDGET__SEPRATOR_PAGE,
                accessNamesConfig.BUDGET__SEPRATOR_SET_YEAR,
              ])}
          >
            <IconButton
                size="small"
                color="primary"
                onClick={() => handleOpenAddCodeModal(item)}
            >
              <AddIcon/>
            </IconButton>
          </SectionGuard>
        </Box>
    )
  }
  
  // data
  const data = accQuery.data?.data || [];
  const formatTableData = (
    unFormatData: GetSingleSepratorAccItemShape[]
  ): TableDataItemShape[] => {
    // @ts-ignore
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
    // @ts-ignore
      actions: actions(item),
    }));

    return formatedData;
  };

  const tableData = formatTableData(data);

  // footer
  const sumExpense = sumFieldsInSingleItemData(data, "expense");
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 4,
    numberSanad: null,
    dateSanad: null,
    description: null,
    expense: sumExpense,
  };
  
  function afterUpdate(){
    setIsOpenAddCodeModal(false);
  }

  return (
      <>
        <FixedTable
          heads={tableHeads}
          headGroups={tableHeadGroup}
          data={tableData}
          footer={tableFooter}
          notFixed
        />
        
        <FixedModal
            open={isOpenAddCodeModal}
            handleClose={handleCloseAddCodeModal}
            title="افزودن به عنوان ریز پروژه"
            maxWidth="600px"
            maxHeight="300px"
        >
          <SepratorSetYearModal initialData={selectedRow} coding={coding} yearId={formData.yearId}  areaId={formData.areaId} afterUpdate={afterUpdate}/>
        </FixedModal>
      </>
  );
}

export default SepratorAccModal;
