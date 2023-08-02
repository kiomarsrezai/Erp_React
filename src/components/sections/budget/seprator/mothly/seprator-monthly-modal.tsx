import FixedTable from "components/data/table/fixed-table";
import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import { GetSingleSepratorMonthlyItemShape } from "types/data/budget/seprator-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";

interface SepratorMonthlyModalProps {
  data: GetSingleSepratorMonthlyItemShape[];
}
function SepratorMonthlyModal(props: SepratorMonthlyModalProps) {
  const { data } = props;

  const tableHeadGroup: TableHeadGroupShape = [
    {
      title: "ردیف",
      colspan: 1,
      rowspan: 2,
      align: "center",
    },
    {
      title: "کد",
      colspan: 1,
      rowspan: 2,
      align: "center",
    },
    {
      title: "شرح",
      align: "left",
      colspan: 1,
      rowspan: 2,
    },
    {
      title: "مصوب",
      align: "center",
      colspan: 1,
      rowspan: 2,
    },
    {
      title: "فروردین",
      align: "center",
      colspan: 2,
      rowspan: 2,
    },
    {
      title: "اردیبهشت",
      align: "center",
      colspan: 2,
      rowspan: 2,
    },
    {
      title: "خرداد",
      align: "center",
      colspan: 2,
      rowspan: 2,
    },
    {
      title: "تیر",
      align: "center",
      colspan: 2,
      rowspan: 2,
    },

    {
      title: "مرداد",
      align: "center",
      colspan: 2,
      rowspan: 2,
    },
    {
      title: "شهریور",
      colspan: 2,
      rowspan: 2,
      align: "center",
    },
    {
      title: "مهر",
      colspan: 2,
      rowspan: 2,
      align: "center",
    },
    {
      title: "آبان",
      colspan: 2,
      rowspan: 2,
      align: "center",
    },
    {
      title: "آذر",
      colspan: 2,
      rowspan: 2,
      align: "center",
    },
    {
      title: "دی",
      colspan: 2,
      rowspan: 2,
      align: "center",
    },
    {
      title: "بهمن",
      colspan: 2,
      rowspan: 2,
      align: "center",
    },
    {
      title: "اسفند",
      colspan: 2,
      rowspan: 2,
      align: "center",
    },
    {
      title: "جمع کل",
      colspan: 2,
      rowspan: 2,
      align: "center",
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
      hiddenSelf: true,
    },
    {
      title: "کد",
      name: "code",
      hiddenSelf: true,
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "مصوب",
      name: "mosavab",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "فروردین",
      name: "month-1",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "%",
      name: "percent-month-1",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "اردیبهشت",
      name: "month-2",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "%",
      name: "percent-month-2",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "خرداد",
      name: "month-3",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "%",
      name: "percent-month-3",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "تیر",
      name: "month-4",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "%",
      name: "percent-month-4",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "مرداد",
      name: "month-5",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "%",
      name: "percent-month-5",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "شهریور",
      name: "month-6",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "%",
      name: "percent-month-6",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "مهر",
      name: "month-7",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "%",
      name: "percent-month-7",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "آبان",
      name: "month-8",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "%",
      name: "percent-month-8",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "آذر",
      name: "month-9",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "%",
      name: "percent-month-9",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "دی",
      name: "month-10",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "%",
      name: "percent-month-10",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "بهمن",
      name: "month-11",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "%",
      name: "percent-month-11",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "اسفند",
      name: "month-12",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "%",
      name: "percent-month-12",
      percent: true,
      hiddenSelf: true,
    },
    {
      title: "جمع کل",
      name: "sumAll",
      split: true,
      align: "left",
      hiddenSelf: true,
    },
    {
      title: "%",
      name: "percentSumAll",
      percent: true,
      hiddenSelf: true,
    },
  ];

  //   data
  const formatTableData = (
    unFormatData: GetSingleSepratorMonthlyItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => {
      const findedItems = data.filter((dataItem) => dataItem.id === item.id);

      const rowItem: any = {
        ...item,
        number: i + 1,
        "month-1": 0,
        "month-2": 0,
        "month-3": 0,
        "month-4": 0,
        "month-5": 0,
        "month-6": 0,
        "month-7": 0,
        "month-8": 0,
        "month-9": 0,
        "month-10": 0,
        "month-11": 0,
        "month-12": 0,
        sumAll: 0,

        "percent-month-1": 0,
        "percent-month-2": 0,
        "percent-month-3": 0,
        "percent-month-4": 0,
        "percent-month-5": 0,
        "percent-month-6": 0,
        "percent-month-7": 0,
        "percent-month-8": 0,
        "percent-month-9": 0,
        "percent-month-10": 0,
        "percent-month-11": 0,
        "percent-month-12": 0,
        percentSumAll: 0,
      };

      findedItems.forEach((findedItem) => {
        if (findedItem.month) {
          rowItem[`percent-month-${findedItem.month}`] = getPercent(
            findedItem.expense,
            findedItem.mosavab
          );
          rowItem[`month-${findedItem.month}`] = findedItem.expense;
        }
      });

      rowItem.sumAll =
        rowItem["month-1"] +
        rowItem["month-2"] +
        rowItem["month-3"] +
        rowItem["month-4"] +
        rowItem["month-5"] +
        rowItem["month-6"] +
        rowItem["month-7"] +
        rowItem["month-8"] +
        rowItem["month-9"] +
        rowItem["month-10"] +
        rowItem["month-11"] +
        rowItem["month-12"];

      rowItem.percentSumAll = getPercent(rowItem.sumAll, rowItem.mosavab);

      return rowItem;
    });

    return formatedData;
  };

  const uinicData = data.reduce(
    (prev: GetSingleSepratorMonthlyItemShape[], curent) => {
      const findedItem = prev.find((item) => item.id === curent.id);

      if (findedItem) {
        return prev;
      } else {
        return [...prev, curent];
      }
    },
    []
  );

  const tableData = formatTableData(
    uinicData.sort(function (a, b) {
      return ("" + a.code).localeCompare(b.code);
    })
  );

  //   footer
  const sumMosavab = sumFieldsInSingleItemData(tableData, "mosavab");
  const sumMonth1 = sumFieldsInSingleItemData(tableData, "month-1");
  const sumMonth2 = sumFieldsInSingleItemData(tableData, "month-2");
  const sumMonth3 = sumFieldsInSingleItemData(tableData, "month-3");
  const sumMonth4 = sumFieldsInSingleItemData(tableData, "month-4");
  const sumMonth5 = sumFieldsInSingleItemData(tableData, "month-5");
  const sumMonth6 = sumFieldsInSingleItemData(tableData, "month-6");
  const sumMonth7 = sumFieldsInSingleItemData(tableData, "month-7");
  const sumMonth8 = sumFieldsInSingleItemData(tableData, "month-8");
  const sumMonth9 = sumFieldsInSingleItemData(tableData, "month-9");
  const sumMonth10 = sumFieldsInSingleItemData(tableData, "month-10");
  const sumMonth11 = sumFieldsInSingleItemData(tableData, "month-11");
  const sumMonth12 = sumFieldsInSingleItemData(tableData, "month-12");
  const sumAll = sumFieldsInSingleItemData(tableData, "sumAll");

  const tableFooter: any = {
    number: "جمع",
    "colspan-number": 3,
    code: null,
    description: null,

    mosavab: sumMosavab,
    "month-1": sumMonth1,
    "month-2": sumMonth2,
    "month-3": sumMonth3,
    "month-4": sumMonth4,
    "month-5": sumMonth5,
    "month-6": sumMonth6,
    "month-7": sumMonth7,
    "month-8": sumMonth8,
    "month-9": sumMonth9,
    "month-10": sumMonth10,
    "month-11": sumMonth11,
    "month-12": sumMonth12,
    sumAll: sumAll,

    "percent-month-1": getPercent(sumMonth1, sumMosavab),
    "percent-month-2": getPercent(sumMonth2, sumMosavab),
    "percent-month-3": getPercent(sumMonth3, sumMosavab),
    "percent-month-4": getPercent(sumMonth4, sumMosavab),
    "percent-month-5": getPercent(sumMonth5, sumMosavab),
    "percent-month-6": getPercent(sumMonth6, sumMosavab),
    "percent-month-7": getPercent(sumMonth7, sumMosavab),
    "percent-month-8": getPercent(sumMonth8, sumMosavab),
    "percent-month-9": getPercent(sumMonth9, sumMosavab),
    "percent-month-10": getPercent(sumMonth10, sumMosavab),
    "percent-month-11": getPercent(sumMonth11, sumMosavab),
    "percent-month-12": getPercent(sumMonth12, sumMosavab),
    percentSumAll: getPercent(sumAll, sumMosavab),
  };

  return (
    <FixedTable
      heads={tableHeads}
      headGroups={tableHeadGroup}
      data={tableData}
      footer={tableFooter}
      notFixed
    />
  );
}

export default SepratorMonthlyModal;
