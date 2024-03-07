import { Box } from "@mui/material";
import FixedTable from "components/data/table/fixed-table";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import { proposalConfig } from "config/features/budget/proposal-config";
import {generalFieldsConfig, organItems, organItems2} from "config/features/general-fields-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import {useEffect, useState} from "react";
import {GetSingleProposalInfoItemShape, GetSingleProposalItemShape} from "types/data/budget/proposal-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import IconButton from "@mui/material/IconButton";
import GetAppIcon from "@mui/icons-material/GetApp";
import {getGeneralFieldItemArea, getGeneralFieldItemYear} from "../../../../../helper/export-utils";
import {accessNamesConfig} from "../../../../../config/access-names-config";
import {mosavabModalXlsx} from "../../../../../stimul/budget/mosavab/mosavab-modal-xlsx";

interface ProposalModalInfoProps {
  data: GetSingleProposalInfoItemShape[];
  formData: any;
  baseRowData: GetSingleProposalItemShape;
}

function ProposalModalInfo(props: ProposalModalInfoProps) {
  const { data, formData, baseRowData } = props;

  const [modalFormData, setModalFormData] = useState({
    [proposalConfig.organ]: 1, // 1,
  });

  const tableHeadGroup: TableHeadGroupShape = [
    {
      title: (
        <Box sx={{ width: "200px" }}>
          <FlotingLabelSelect
            label="سازمان"
            name={proposalConfig.organ}
            items={organItems2}
            value={modalFormData[proposalConfig.organ]}
            setter={setModalFormData}
          />
        </Box>
      ),
      colspan: 6,
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
      title: "منطقه",
      name: "areaName",
      align: "left",
    },
    {
      title: "مصوب",
      name: "mosavab",
      align: "left",
      split: true,
      width: "150px",
    },
    {
      title: "اصلاح",
      name: "editArea",
      align: "left",
      split: true,
      width: "150px",
    },
    {
      title: "ت اعتبار",
      name: "creditAmount",
      split: true,
      align: "left",
      hidden: formData[proposalConfig.BUDGET_METHOD] === 1,
      width: "150px",
    },
    {
      title: "هزینه",
      name: "expense",
      align: "left",
      split: true,
      width: "150px",
    },
  ];

  //   data
  // const filteredData = data.filter(
  //   (item) => item.structureId === modalFormData[proposalConfig.organ]
  // );
  const filteredData = data;
  const formatTableData = (
    unFormatData: GetSingleProposalInfoItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      "bgcolor-expense": item.expense > item.editArea && "#d7a2a2",
      "bgcolor-creditAmount": item.creditAmount > item.editArea && "#d7a2a2",
      "textcolor-expense": item.expense > item.creditAmount && "red",
    }));

    return formatedData;
  };

  const tableData = formatTableData(filteredData);

  // footer

  const sumMosavabShahrdari = sumFieldsInSingleItemData(
    filteredData,
    "mosavab",
    (item: GetSingleProposalInfoItemShape) => item.structureId === 1
  );

  const sumEditShahrdari = sumFieldsInSingleItemData(
    filteredData,
    "editArea",
    (item: GetSingleProposalInfoItemShape) => item.structureId === 1
  );

  const sumExpenseShahrdari = sumFieldsInSingleItemData(
    filteredData,
    "expense",
    (item: GetSingleProposalInfoItemShape) => item.structureId === 1
  );

  const sumCreditAmountShahrdari = sumFieldsInSingleItemData(
    filteredData,
    "creditAmount",
    (item: GetSingleProposalInfoItemShape) => item.structureId === 1
  );

  const sumMosavabSazman = sumFieldsInSingleItemData(
    filteredData,
    "mosavab",
    (item: GetSingleProposalInfoItemShape) => item.structureId === 2
  );

  const sumEditSazman = sumFieldsInSingleItemData(
    filteredData,
    "editArea",
    (item: GetSingleProposalInfoItemShape) => item.structureId === 2
  );

  const sumExpenseSazman = sumFieldsInSingleItemData(
    filteredData,
    "expense",
    (item: GetSingleProposalInfoItemShape) => item.structureId === 2
  );

  const sumCreditAmountSazman = sumFieldsInSingleItemData(
    filteredData,
    "creditAmount",
    (item: GetSingleProposalInfoItemShape) => item.structureId === 2
  );

  const tableFooterShahrdari: any = {
    number: "جمع شهرداری",
    "colspan-number": 2,
    areaName: null,
    creditAmount: sumCreditAmountShahrdari,
    mosavab: sumMosavabShahrdari,
    editArea: sumEditShahrdari,
    expense: sumExpenseShahrdari,
  };

  const tableFooterSazman: any = {
    number: "جمع سازمان",
    "colspan-number": 2,
    areaName: null,
    creditAmount: sumCreditAmountSazman,
    mosavab: sumMosavabSazman,
    editArea: sumEditSazman,
    expense: sumExpenseSazman,
  };

  const tableFooter: any = {
    number: "جمع کل",
    "colspan-number": 2,
    areaName: null,
    creditAmount: sumCreditAmountShahrdari + sumCreditAmountSazman,
    mosavab: sumMosavabShahrdari + sumMosavabSazman,
    editArea: sumEditShahrdari + sumEditSazman,
    expense: sumExpenseShahrdari + sumExpenseSazman,
  };
  
  const handleExcelClick = () => {
    tableData.map((item) => {
      item.code = baseRowData.code;
    });
  
    let culmnsData: any = {};
  
    [{label: 'تست', value: 1}].forEach((item) => {
      culmnsData[item.value] = [];
    });
  
    const culmnKeys = Object.keys(culmnsData);
  
    culmnsData = {
      ...culmnsData,
      [1]: tableData,
    };
    const yearLabel = getGeneralFieldItemYear(formData, 1);
    const areaLabel = getGeneralFieldItemArea(formData, 1);
  
    mosavabModalXlsx({
      culmnsData: culmnsData,
      area: areaLabel,
      year: yearLabel,
      budgetMethod: formData[accessNamesConfig.FIELD_BUDGET_METHOD],
      tableFooterShahrdari: tableFooterShahrdari,
      tableFooterSazman: tableFooterSazman,
      tableFooter: tableFooter,
    });
  }
  
  useEffect(() => {
    // @ts-ignore
    document.getElementById("excelExportButton").addEventListener("click", () => {
      handleExcelClick();
    });
  }, [])
  
  return (
    <div style={{height: 'calc(80vh - 74px)'}}>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        footer={tableFooterShahrdari}
        bottomFooter={tableFooterSazman}
        moreBottomFooter={tableFooter}
        notFixed
      />
    </div>
  );
}

export default ProposalModalInfo;
