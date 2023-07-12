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
      name: "rowIndex",
    },
    {
      title: "شماره",
      name: "number",
    },
    {
      title: "تاریخ",
      name: "dateShamsi",
      align: "left",
    },
    {
      title: "شرح",
      name: "description",
      align: "left",
    },
    {
      title: "مبلغ",
      name: "estimateAmount",
      align: "left",
      split: true,
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
  ];

  // table data
  const formatTableData = (
    unFormatData: GetSingleAbstructProctorModal1InfoItemShape[]
  ): any[] => {
    const formatedData: any[] = unFormatData.map((item, i) => ({
      ...item,
      rowIndex: i + 1,
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
  const sumEstimateAmount = sumFieldsInSingleItemData(data, "estimateAmount");

  const tableFooters: any = {
    rowIndex: "جمع",
    "colspan-rowIndex": 4,
    title: "",
    description: null,
    dateShamsi: null,
    number: null,
    code: "",
    estimateAmount: sumEstimateAmount,
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
