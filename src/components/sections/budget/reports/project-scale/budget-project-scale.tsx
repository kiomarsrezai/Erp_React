import FixedTable from "components/data/table/fixed-table";
import { ReactNode, useState } from "react";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import BudgetReportProjectScaleForm from "./budget-project-scale-form";
import { useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { budgetDeviationApi } from "api/report/budget-deviation-api";
import { GetSingleBudgetDeviationItemShape } from "types/data/budget/budget-deviation-type";
import { budgetDeviationConfig } from "config/features/budget/report/budget-deviation-config";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import { budgetProjectOprationConfig } from "config/features/budget/report/budget-project-opration-config";
import {GetSingleBeforeProposalItemShape} from "../../../../../types/beforeproposal-type";
import {Box} from "@mui/material";
import SectionGuard from "../../../../auth/section-guard";
import {joinPermissions} from "../../../../../helper/auth-utils";
import {accessNamesConfig} from "../../../../../config/access-names-config";
import IconButton from "@mui/material/IconButton";
import BarChartIcon from "@mui/icons-material/BarChart";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FixedModal from "../../../../ui/modal/fixed-modal";

interface TableDataItemShape {
  number: ReactNode;
  projectName: ReactNode;
  projectCode: ReactNode;
  mosavab: ReactNode;
  expense: ReactNode;
}

interface BudgetReportDeviationProps {
  tabRender?: ReactNode;
}

function BudgetReportProjectScale(props: BudgetReportDeviationProps) {
  const { tabRender } = props;
  const [formData, setFormData] = useState({
    [budgetProjectOprationConfig.area]: undefined,
    [budgetProjectOprationConfig.year]: undefined,
    [budgetProjectOprationConfig.scale]: undefined,
  });

  // head
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "نام منطقه",
      name: "areaName",
    },
    {
      title: "کد پروژه",
      name: "projectCode",
    },
    {
      title: "نام پروژه",
      name: "projectName",
      align: "left",
    },
    {
      title: "مصوب 1402",
      name: "mosavab",
      split: true,
      align: "left",
    },
    {
      title: "اصلاح 1402",
      name: "edit",
      split: true,
      align: "left",
    },
    {
      title: "ت اعتبار 1402",
      name: "supply",
      split: true,
      align: "left",
    },
    {
      title: "هزینه 1402",
      name: "expense",
      split: true,
      align: "left",
    },
    {
      title: "مبلغ پیشنهادی 1403",
      name: "budgetNext",
      split: true,
      align: "left",
    },
    // {
    //   title: "عملیات",
    //   name: "actions",
    //   width: "30px",
    // },
  ];
  
  
  const [projectReportScaleBudgetModal, setProjectReportScaleBudgetModal] = useState<boolean>(false)
  const [editModalInitialData, setEditModalInitialData] = useState<any>({})
  const actionButtons = (
      row: (TableDataItemShape & GetSingleBeforeProposalItemShape) | any
  ) => (
      <Box display={"flex"} justifyContent={"center"}>
        {/*<SectionGuard*/}
        {/*    permission={joinPermissions([*/}
        {/*      accessNamesConfig.BUDGET__BeforePROPOSAL_PAGE,*/}
        {/*      accessNamesConfig.BUDGET__PROPOSAL_DATA_TABLE_READ,*/}
        {/*    ])}*/}
        {/*>*/}
          <IconButton
              size="small"
              color="primary"
              onClick={() => handelOpenProjectReportScaleBudgetModal(row)}
          >
            <FormatListBulletedIcon />
          </IconButton>
        {/*</SectionGuard>*/}
        
      </Box>
  );
  
  function handelOpenProjectReportScaleBudgetModal(row: (TableDataItemShape & GetSingleBeforeProposalItemShape) | any){
    setProjectReportScaleBudgetModal(true)
    setEditModalInitialData(row);
  }
  
  // data
  const formatTableData = (
    unFormatData: GetSingleBudgetDeviationItemShape[]
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

  const deviationQuery = useQuery(
    reactQueryKeys.budget.projectOpration,
    () => budgetDeviationApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = formatTableData(deviationQuery.data?.data || []);

  // footer
  const sumMosavab = sumFieldsInSingleItemData(tableData, "mosavab");
  const sumEdit = sumFieldsInSingleItemData(tableData, "edit");
  const sumSupply = sumFieldsInSingleItemData(tableData, "supply");
  const sumExpense = sumFieldsInSingleItemData(tableData, "expense");
  const sumBudgetNext = sumFieldsInSingleItemData(tableData, "budgetNext");
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 4,
    areaName: null,
    projectCode: null,
    projectName: null,
    mosavab: sumMosavab,
    edit: sumEdit,
    supply: sumSupply,
    expense: sumExpense,
    budgetNext: sumBudgetNext,
    actions: "",
  };

  // head group
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <BudgetReportProjectScaleForm
          formData={formData}
          setFormData={setFormData}
          tabRender={tabRender}
          printData={{
            data: tableData,
            footer: [tableFooter],
          }}
        />
      ),
      colspan: 9,
    },
  ];

  return (
      <>
        <FixedTable
          heads={tableHeads}
          headGroups={tableHeadGroups}
          footer={tableFooter}
          data={tableData}
        />
  
        <FixedModal
            open={projectReportScaleBudgetModal}
            handleClose={() => {
              setProjectReportScaleBudgetModal(false);
            }}
            title={editModalInitialData?.description}
            maxWidth="85%"
            maxHeight="70%"
        >
        
        </FixedModal>
      </>
  );
}

export default BudgetReportProjectScale;
