import FixedTable from "components/data/table/fixed-table";
import PrintIcon from "@mui/icons-material/Print";
import IconButton from "@mui/material/IconButton";

import { getPercent, sumFieldsInSingleItemData } from "helper/calculate-utils";
import { getGeneralFieldItemYear } from "helper/export-utils";
import { ReactNode, useState } from "react";
import {
  GetSingleAbstructProctorModal1InfoItemShape,
  GetSingleAbstructProctorModalRowDataItemShape,
} from "types/data/report/abstruct-proctor-type";
import { TableHeadGroupShape, TableHeadShape } from "types/table-type";
import { abstructProctorModal2Stimul } from "stimul/budget/report/proctor/abstruct-proctor-modal2-stimul";
import AbstractProctorModal1Form from "./abstruct-proctor-modal1-form";
import { abstructProctorConfig } from "config/features/report/proctor/abstruct-config";
import { useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { abstructProctorApi } from "api/report/abstruct-proctor-api";

interface AbstructModal2Props {
  formdata: any;
}

function AbstructProctorModal1(props: AbstructModal2Props) {
  const { formdata } = props;

  const [modalFormData, setModalFormData] = useState({
    [abstructProctorConfig.AREA]: undefined,
    [abstructProctorConfig.PROCTOR]: undefined,
  });

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
    unFormatData: GetSingleAbstructProctorModal1InfoItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      number: i + 1,
    }));

    return formatedData;
  };

  const abstractQuery = useQuery(
    reactQueryKeys.report.proctor.abstractProctorModal1,
    () => abstructProctorApi.getProctorInfoModal1({}),
    {
      enabled: false,
    }
  );

  const data = abstractQuery.data?.data || [];
  const tableData = formatTableData(data);

  // table footer
  const sumMosavab = sumFieldsInSingleItemData(data, "mosavab");
  const sumHazine = sumFieldsInSingleItemData(data, "expense");
  const sumSupply = sumFieldsInSingleItemData(data, "supply");

  const tableFooters: any = {
    number: "جمع",
    "colspan-number": 3,
    title: null,
    code: null,
    mosavab: sumMosavab,
    hazine: sumHazine,
    supply: sumSupply,
    jazb: getPercent(sumHazine, sumMosavab),
  };

  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <AbstractProctorModal1Form
          formData={formdata}
          modalFormData={modalFormData}
          setModalFormData={setModalFormData}
        />
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

export default AbstructProctorModal1;
