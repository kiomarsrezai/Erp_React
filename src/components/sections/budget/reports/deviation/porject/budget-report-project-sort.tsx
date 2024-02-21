import FixedTable from "components/data/table/fixed-table";
import { ReactNode, useState } from "react";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import BudgetReportProjectSortForm from "./budget-report-project-sort-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import {
  getPercent,
  getPercentFloat,
  sumFieldsInSingleItemData,
} from "helper/calculate-utils";
import { budgetProjectSortConfig } from "config/features/budget/report/budget-project-sort-config";
import FixedModal from "components/ui/modal/fixed-modal";
import BudgetReportProjectSortModal1 from "./budget-report-project-sort-modal1";
import { budgetProjectSortApi } from "api/report/budget-project-sort-api";
import { IconButton } from "@mui/material";
import {convertNumbers} from "../../../../../../helper/number-utils";
import {generalFieldsConfig} from "../../../../../../config/features/general-fields-config";

interface BudgetReportProjectSortProps {
  tabRender?: ReactNode;
}

function BudgetReportProjectSort(props: BudgetReportProjectSortProps) {
  const { tabRender } = props;

  const [formData, setFormData] = useState({
    [budgetProjectSortConfig.year]: undefined,
    [budgetProjectSortConfig.area]: undefined,
    [budgetProjectSortConfig.budget]: undefined,
    // [budgetProjectSortConfig.kind]: 1,
  });

  // head
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      width: "80px",
    },
    {
      title: "کد بودجه",
      name: "code",
      width: "120px",
    },
    {
      title: "شرح ردیف",
      name: "description",
      align: "left",
      width: "600px",
    },

    {
      title: "مصوب",
      name: "mosavab",
      split: true,
      align: "left",
      width: "150px",
    },
    {
      title: "اصلاح",
      name: "edit",
      split: true,
      align: "left",
      width: "150px",
    },
    {
      title: "ت اعتبار",
      name: "creditAmount",
      split: true,
      align: "left",
      width: "150px",
    },
    {
      title: "%",
      name: "percentCreditAmount",
      percent: true,
      width: "80px",
    },
    {
      title: "عملکرد",
      name: "expense",
      split: true,
      align: "left",
      width: "150px",
    },
    {
      title: "%",
      name: "percent",
      percent: true,
      width: "80px",
    },
    {
      title: "منطقه",
      name: "areaName",
      width: "100px",
    },
    {
      title: "سهم",
      name: "share",
      width: "100px",
    },
    {
      title: "تجمیع",
      name: "sum",
      width: "100px",
    },
    {
      title: "عملیات",
      name: "actions",
      width: "100px",
    },
  ];

  // data
  const dataQuery = useQuery(
    reactQueryKeys.budget.sort.getData,
    () => {
      return { data: [] };
    },
    {
      enabled: false,
      initialData: {
        data: [],
      },
    }
  );
  
  const formatAndBindData = (data?: any[]) => {
    const formatedData = convertNumbers(
        data||dataQuery.data?.data||[],
        ["mosavab", "edit", "creditAmount", "expense"],
        // @ts-ignore
        formData[generalFieldsConfig.numbers]
    );
    
    // queryClient.setQueryData(reactQueryKeys.budget.proposal.getData, {
    //   data: formatedData,
    // });
    
    return formatedData
  };

  // footer
  const sumMosavab = sumFieldsInSingleItemData(
    dataQuery.data?.data || [],
    "mosavab"
  );
  
  const sumEdit = sumFieldsInSingleItemData(
    dataQuery.data?.data || [],
    "edit"
  );
  const sumExpense = sumFieldsInSingleItemData(
    dataQuery.data?.data || [],
    "expense"
  );

  const sumCreaditAmount = sumFieldsInSingleItemData(
    dataQuery.data?.data || [],
    "creditAmount"
  );

  const tableFooter: any = {
    number: "جمع",
    "colspan-number": 3,
    code: null,
    areaName: "",
    percent: getPercent(sumExpense, sumMosavab),
    description: null,
    mosavab: sumMosavab,
    edit: sumEdit,
    expense: sumExpense,
    creditAmount: sumCreaditAmount,
    percentCreditAmount: getPercent(sumCreaditAmount, sumEdit),
  };

  // table data
  const actionButtons = (row: any) => {
    return (
      <IconButton
        size="small"
        color="primary"
        onClick={() => handleOpenModal(row)}
      >
        <FormatListBulletedIcon />
      </IconButton>
    );
  };
  let CalculatedMosavab = 0;
  const formatTableData = (unFormatData: any): any => {
    const formatedData: any = unFormatData.map((item: any, i: any) => {
      const result = {
        ...item,
        share: getPercentFloat(item.mosavab, sumMosavab, 1) + "%",
        percent: getPercent(item.expense, item.mosavab),
        sum:
          getPercentFloat(item.mosavab + CalculatedMosavab, sumMosavab, 1) +
          "%",
        number: i + 1,
        actions: () => actionButtons(item),
      };

      CalculatedMosavab += item.mosavab;
      return result;
    });

    return formatedData;
  };

  const tableData: any = (formatTableData(dataQuery.data?.data) as any) || [];

  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <BudgetReportProjectSortForm
          formData={formData}
          setFormData={setFormData}
          tabRender={tabRender}
          formatAndBindData={formatAndBindData}
          printData={{
            data: tableData,
            footer: [tableFooter],
          }}
        />
      ),
      colspan: 13,
    },
  ];

  // modal
  const dataModalMutation = useMutation(budgetProjectSortApi.getDataModal1);

  const [isOpenModal1, setIsOpenModal1] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const handleOpenModal = (item: any) => {
    setTitleModal(`${item.code} - ${item.description}`);
    dataModalMutation.mutate({
      [budgetProjectSortConfig.year]: formData[budgetProjectSortConfig.year],
      [budgetProjectSortConfig.area]: formData[budgetProjectSortConfig.area],
      [budgetProjectSortConfig.coding]: item.codingId,
    });
    setIsOpenModal1(true);
  };

  const handleCloseModal1 = () => {
    setIsOpenModal1(false);
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroups}
        footer={tableFooter}
        data={tableData}
        tableLayout="auto"
        enableVirtual
      />

      <FixedModal
        open={isOpenModal1}
        handleClose={handleCloseModal1}
        title={titleModal}
        loading={dataModalMutation.isLoading}
      >
        <BudgetReportProjectSortModal1
          data={dataModalMutation.data?.data || []}
        />
      </FixedModal>
    </>
  );
}

export default BudgetReportProjectSort;
