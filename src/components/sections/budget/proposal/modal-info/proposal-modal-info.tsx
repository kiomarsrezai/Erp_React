import { Box } from "@mui/material";
import FixedTable from "components/data/table/fixed-table";
import FlotingLabelSelect from "components/ui/inputs/floting-label-select";
import { proposalConfig } from "config/features/budget/proposal-config";
import { organItems, organItems2 } from "config/features/general-fields-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import { useState } from "react";
import { GetSingleProposalInfoItemShape } from "types/data/budget/proposal-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";

interface ProposalModalInfoProps {
  data: GetSingleProposalInfoItemShape[];
  formData: any;
}

function ProposalModalInfo(props: ProposalModalInfoProps) {
  const { data, formData } = props;

  const [modalFormData, setModalFormData] = useState({
    [proposalConfig.organ]: 1,
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
  const filteredData = data.filter(
    (item) => item.structureId === modalFormData[proposalConfig.organ]
  );
  const formatTableData = (
    unFormatData: GetSingleProposalInfoItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
    }));

    return formatedData;
  };

  const tableData = formatTableData(filteredData);

  // footer
  const sumMosavab = sumFieldsInSingleItemData(filteredData, "mosavab");

  const sumEdit = sumFieldsInSingleItemData(filteredData, "editArea");

  const sumExpense = sumFieldsInSingleItemData(filteredData, "expense");

  const sumCreditAmount = sumFieldsInSingleItemData(
    filteredData,
    "creditAmount"
  );

  const tableFooter: any = {
    number: "جمع",
    "colspan-number": 2,
    areaName: null,
    creditAmount: sumCreditAmount,
    mosavab: sumMosavab,
    editArea: sumEdit,
    expense: sumExpense,
  };

  return (
    <FixedTable
      heads={tableHeads}
      data={tableData}
      footer={tableFooter}
      headGroups={tableHeadGroup}
      notFixed
    />
  );
}

export default ProposalModalInfo;
