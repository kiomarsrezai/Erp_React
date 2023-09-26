import FixedTable from "components/data/table/fixed-table";
import PrintIcon from "@mui/icons-material/Print";
import IconButton from "@mui/material/IconButton";

import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import { getGeneralFieldItemYear } from "helper/export-utils";
import { ReactNode } from "react";
import { GetSingleAbstructProctorModalRowDataItemShape } from "types/data/report/abstruct-proctor-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { abstructProctorModal2Stimul } from "stimul/budget/report/proctor/abstruct-proctor-modal2-stimul";

interface TableDataItemShape {
  number: ReactNode;
  title: ReactNode;
  code: ReactNode;
  hazine: ReactNode;
  mosavab: ReactNode;
  jazb: ReactNode;
}

interface AbstructModal2Props {
  data: any[];
  formdata: any;
  modal1Title: string;
  modal2Title: string;
}

function AbstructModal2(props: AbstructModal2Props) {
  const { data, formdata, modal1Title, modal2Title } = props;

  // table heads
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
      title: "عنوان",
      name: "title",
      align: "left",
    },
    {
      title: "مصوب",
      name: "mosavab",
      split: true,
      align: "left",
    },
    {
      title: "ت اعتبار",
      name: "supply",
      split: true,
      align: "left",
    },
    {
      title: "هزینه",
      name: "hazine",
      split: true,
      align: "left",
    },

    {
      title: "% جذب",
      name: "jazb",
      percent: true,
    },
  ];

  // table data
  const formatTableData = (
    unFormatData: GetSingleAbstructProctorModalRowDataItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
      title: item.description,
      code: item.code,
      hazine: item.expense,
      "textcolor-hazine": item.expense < 0 ? "red" : "",
      mosavab: item.mosavab,
      jazb: getPercent(item.expense, item.mosavab),
      actions: () => "",
    }));

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // table footer
  const sumMosavab = sumFieldsInSingleItemData(data, "mosavab");
  const sumHazine = sumFieldsInSingleItemData(data, "expense");
  const sumSupply = sumFieldsInSingleItemData(data, "supply");

  const tableFooters: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 3,
    title: null,
    code: null,
    mosavab: sumMosavab,
    hazine: sumHazine,
    supply: sumSupply,
    jazb: getPercent(sumHazine, sumMosavab),
  };

  // print
  const handlePrintForm = () => {
    if (tableData.length) {
      const [areaTitle, mainTitle] = modal2Title.split("-");

      const yearLabel = getGeneralFieldItemYear(formdata, 1);
      abstructProctorModal2Stimul({
        data: tableData,
        footer: [tableFooters],
        year: yearLabel,
        title1: modal1Title,
        title2: areaTitle?.trim(),
        mainTitle: mainTitle?.trim(),
        numberShow: "ریال",
      });
    }
  };

  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <IconButton color="primary" onClick={handlePrintForm}>
          <PrintIcon />
        </IconButton>
      ),
      colspan: 7,
    },
  ];

  return (
    <FixedTable
      heads={tableHeads}
      data={tableData}
      footer={tableFooters}
      headGroups={tableHeadGroups}
      notFixed
    />
  );
}

export default AbstructModal2;
