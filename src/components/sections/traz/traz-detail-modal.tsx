import FixedTable from "components/data/table/fixed-table";
import IconButton from "@mui/material/IconButton";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import { ReactNode, useState } from "react";
import { TableHeadShape } from "types/table-type";
import { TrazItemShape } from "types/data/traz/traz-type";
import TrazDetailMoreModal from "./traz-detail-more-modal";
import FixedModal from "components/ui/modal/fixed-modal";
import { useMutation } from "@tanstack/react-query";
import { trazApi } from "api/traz/traz-api";
import { trazConfig } from "config/features/traz/traz-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";

interface TableDataItemShape {
  number: ReactNode;
  code: ReactNode;
  description: ReactNode;
  bedehkar: ReactNode;
  bestankar: ReactNode;
  balanceBedehkar: ReactNode;
  balanceBestankar: ReactNode;
  revenueCenter: ReactNode;
  descriptionCenter: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

interface TrazDetailModalProps {
  data: any[];
  formData: any;
  moein: number;
}

function TrazDetailModal(props: TrazDetailModalProps) {
  const { data, formData, moein } = props;

  //   table heads
  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "شرح مرکز هزینه",
      name: "descriptionCenter",
      align: "left",
    },
    {
      title: "مرکز هزینه",
      name: "revenueCenter",
    },
    {
      title: "کد تفضیل",
      name: "code",
    },
    {
      title: "شرح تفضیل",
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
  const trazMoreDetailMutation = useMutation(trazApi.getData);
  const [modalTitle, setModalTitle] = useState<string | ReactNode>("");

  const [isOpenMoreDetailModal, setIsOpenMoreDetailModal] = useState(false);
  const handleOpenDetailModal = (row: TableDataItemShape & TrazItemShape) => {
    const title = (
      <div>
        {row.code} - {row.description}
        <div>
          {row.markazHazine} - {row.markazHazineName}
        </div>
      </div>
    );

    setModalTitle(title);

    trazMoreDetailMutation.mutate({
      ...formData,
      [trazConfig.MOEIN]: moein,
      [trazConfig.tafsily]: +(row.code as string),
      [trazConfig.markaz_hazine]: row.markazHazine,
    });
    setIsOpenMoreDetailModal(true);
  };

  //   table data
  const actionButtons = (row: TableDataItemShape) => (
    <IconButton
      size="small"
      color="primary"
      onClick={() => handleOpenDetailModal(row as any)}
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
        revenueCenter: item.markazHazine,
        descriptionCenter: item.markazHazineName,
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const tableData = data ? formatTableData(data) : [];

  // footer
  const tableFooter: TableDataItemShape | any = {
    number: "جمع",
    "colspan-number": 3,
    code: null,
    description: null,
    balanceBedehkar: sumFieldsInSingleItemData(data, "balanceBedehkar"),
    bedehkar: sumFieldsInSingleItemData(data, "bedehkar"),
    balanceBestankar: sumFieldsInSingleItemData(data, "balanceBestankar"),
    bestankar: sumFieldsInSingleItemData(data, "bestankar"),
    actions: "",
  };

  return (
    <>
      <FixedTable
        heads={tableHeads}
        data={tableData}
        footer={tableFooter}
        notFixed
      />
      <FixedModal
        open={isOpenMoreDetailModal}
        handleClose={() => setIsOpenMoreDetailModal(false)}
        loading={trazMoreDetailMutation.isLoading}
        title={modalTitle}
        maxWidth="lg"
        isNested
      >
        <TrazDetailMoreModal data={trazMoreDetailMutation.data?.data || []} />
      </FixedModal>
    </>
  );
}

export default TrazDetailModal;
