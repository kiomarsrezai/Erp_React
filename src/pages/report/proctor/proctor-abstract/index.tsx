import AdminLayout from "components/layout/admin-layout";
import DataTable from "components/data/data-table";

import { TableHeadShape, TableSubHeadShape } from "types/table-type";

function ReportProctorAbstructPage() {
  const tableHeads: TableHeadShape = [
    {
      title: "salam 1",
      colspan: 2,
    },
    {
      title: "salam 2",
      colspan: 3,
    },
  ];

  const tableSubHeads: TableSubHeadShape = [
    {
      title: "salam 3",
    },
    {
      title: "salam 4",
    },
    {
      title: "salam 5",
    },
    {
      title: "salam 6",
    },
    {
      title: "salam 7",
    },
  ];

  return (
    <AdminLayout>
      <DataTable heads={tableHeads} subHeads={tableSubHeads} />
    </AdminLayout>
  );
}

export default ReportProctorAbstructPage;
