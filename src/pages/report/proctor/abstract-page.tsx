import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import AbstractProctorForm from "components/sections/forms/report/proctor/abstract-proctor-form";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { useState } from "react";
import { abstructProctorConfig } from "config/features/report/proctor/abstruct-config";

function ReportProctorAbstructPage() {
  const [formData, setFormData] = useState({
    [abstructProctorConfig.YEAR]: 32,
    [abstructProctorConfig.AREA]: 1,
  });

  const tableTopHeadGroups: TableHeadGroupShape = [
    {
      title: (
        <AbstractProctorForm formData={formData} setFormData={setFormData} />
      ),
      colspan: 9,
    },
  ];

  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: "",
      colspan: 1,
    },
    {
      title: "",
      colspan: 1,
    },
    {
      title: "هزینه ای",
      colspan: 3,
    },
    {
      title: "سرمایه ای",
      colspan: 3,
    },
    {
      title: "",
      colspan: 1,
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "عنوان",
      name: "code",
    },
    {
      title: "مصوب",
      align: "left",
      name: "description",
    },
    {
      title: "عملکرد",
      align: "left",
      name: "mosavab",
      split: true,
    },
    {
      title: "جذب %",
      name: "codeAcc",
    },
    {
      title: "مصوب",
      align: "left",
      name: "titleAcc",
    },
    {
      title: "عملکرد",
      name: "actions",
    },
    {
      title: "عملکرد",
      name: "جذب %",
    },
    {
      title: "جذب کل %",
      name: "actions",
    },
  ];

  return (
    <AdminLayout>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroups}
        topHeadGroups={tableTopHeadGroups}
        data={[]}
      />
    </AdminLayout>
  );
}

export default ReportProctorAbstructPage;
