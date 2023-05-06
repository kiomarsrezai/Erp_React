import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import IconButton from "@mui/material/IconButton";
import TrazForm from "components/sections/traz/traz-form";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { reactQueryKeys } from "config/react-query-keys-config";
import { TrazItemShape } from "types/data/traz/traz-type";
import { trazApi } from "api/traz/traz-api";
import { trazConfig } from "config/features/traz/traz-config";
import FixedModal from "components/ui/modal/fixed-modal";
import TrazDetailModal from "components/sections/traz/traz-detail-modal";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  description: ReactNode;
  bedehkar: ReactNode;
  bestankar: ReactNode;
  balanceBedehkar: ReactNode;
  balanceBestankar: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

function TrazPage() {
  const [formData, setFormData] = useState({
    [trazConfig.YEAR]: 32,
    [trazConfig.AREA]: 1,
    [trazConfig.kind]: 1,
    [trazConfig.MOEIN]: null,
    [trazConfig.tafsily]: null,
  });

  // form heads
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: <TrazForm formData={formData} setFormData={setFormData} />,
      colspan: 8,
    },
  ];

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
      title: "شرح",
      align: "left",
      name: "description",
    },
    {
      title: "گردش بدهکار",
      name: "bedehkar",
      align: "left",
      split: true,
    },
    {
      title: "گردش بستانکار",
      name: "bestankar",
      align: "left",
      split: true,
    },
    {
      title: "مانده بدهکار",
      name: "balanceBedehkar",
      align: "left",
      split: true,
    },
    {
      title: "مانده بستانکار",
      name: "balanceBestankar",
      align: "left",
      split: true,
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // modal
  const trazDetailMutation = useMutation(trazApi.getData);

  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const handleOpenDetailModal = (row: TableDataItemShape) => {
    trazDetailMutation.mutate({
      ...formData,
      [trazConfig.MOEIN]: +(row.code || 1),
    });
    setIsOpenDetailModal(true);
  };

  // table data
  const actionButtons = (row: TableDataItemShape) => (
    <IconButton
      size="small"
      color="primary"
      onClick={() => handleOpenDetailModal(row)}
    >
      <FormatListBulletedIcon />
    </IconButton>
  );

  const formatTableData = (
    unFormatData: TrazItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        code: item.code,
        description: item.description,
        bedehkar: item.bedehkar,
        bestankar: item.bestankar,
        balanceBedehkar: item.balanceBedehkar,
        balanceBestankar: item.balanceBestankar,
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const proposalQuery = useQuery(
    reactQueryKeys.traz.getData,
    () => trazApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = proposalQuery.data
    ? formatTableData(proposalQuery.data?.data)
    : [];

  return (
    <>
      <AdminLayout>
        <FixedTable
          heads={tableHeads}
          headGroups={tableHeadGroups}
          data={tableData}
        />
      </AdminLayout>

      <FixedModal
        open={isOpenDetailModal}
        handleClose={() => setIsOpenDetailModal(false)}
        loading={trazDetailMutation.isLoading}
      >
        <TrazDetailModal data={trazDetailMutation.data?.data || []} />
      </FixedModal>
    </>
  );
}

export default TrazPage;
