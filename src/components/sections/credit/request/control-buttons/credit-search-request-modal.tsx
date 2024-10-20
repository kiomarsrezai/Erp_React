import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";

import { ReactNode } from "react";
import { TableHeadShape } from "types/table-type";
import {
  CreditReadRequestShape,
  SearchCreditRequestShape,
} from "types/data/credit/credit-request-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creditRequestApi } from "api/credit/credit-request-api";
import { convertToJalaliDate } from "helper/date-utils";
import { reactQueryKeys } from "config/react-query-keys-config";

interface TableDataItemShape {
  rowNumber: ReactNode;
  employee: ReactNode;
  number: ReactNode;
  date: ReactNode;
  description: ReactNode;
  estimateAmount: ReactNode;
  actions: (row: any) => ReactNode;
}

interface CreditSearchRequestModalProps {
  data: any[];
  onDoneTask: (data: CreditReadRequestShape) => void;
}

function CreditSearchRequestModal(props: CreditSearchRequestModalProps) {
  const { data, onDoneTask } = props;

  // table head
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "rowNumber",
    },

    {
      title: "شماره",
      name: "number",
    },
    {
      title: "تاریخ",
      name: "dateShamsi",
    },
    {
      title: "شرح",
      align: "left",
      name: "description",
    },
    {
      title: "برآورد مبلغ",
      name: "estimateAmount",
      split: true,
      align: "left",
    },
    {
      title: "ثبت کننده",
      name: "employee",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // read request
  const quertClient = useQueryClient();
  const budgetRowMutation = useMutation(
    creditRequestApi.budgetRowReadInserted,
    {
      onSuccess: (data) => {
        quertClient.setQueryData(reactQueryKeys.request.budgetRow.list, {
          data: data.data,
        });
      },
    }
  );

  const requestContractMutation = useMutation(
    creditRequestApi.contractInserted,
    {
      onSuccess: (data) => {
        quertClient.setQueryData(reactQueryKeys.request.contract.list, {
          data: data.data,
        });
      },
    }
  );

  const requestTableMutation = useMutation(creditRequestApi.requestTableRead, {
    onSuccess: (data) => {
      quertClient.setQueryData(reactQueryKeys.request.table.list, {
        data: data.data,
      });
    },
  });

  const readMutation = useMutation(creditRequestApi.readRequest, {
    onSuccess: async (data) => {
      try {
        await budgetRowMutation.mutateAsync({ requestId: data.data.id });
        await requestTableMutation.mutateAsync({ id: data.data.id });
        await requestContractMutation.mutateAsync({ id: data.data.id });
      } catch {}

      onDoneTask(data.data);
    },
  });

  // table data
  const handleClickCheckBtn = (
    row: TableDataItemShape & SearchCreditRequestShape
  ) => {
    readMutation.mutate(row.id);
  };

  const actionButtons = (
    row: TableDataItemShape & SearchCreditRequestShape
  ) => (
    <IconButton
      color="primary"
      size="small"
      onClick={() => handleClickCheckBtn(row)}
    >
      <CheckIcon />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: SearchCreditRequestShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        rowNumber: i + 1,
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  return <FixedTable heads={tableHeads} data={tableData} notFixed />;
}

export default CreditSearchRequestModal;
