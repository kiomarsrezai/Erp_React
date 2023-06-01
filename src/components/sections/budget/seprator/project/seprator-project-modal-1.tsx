import FixedTable from "components/data/table/fixed-table";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import WindowLoading from "components/ui/loading/window-loading";
import ConfrimProcessModal from "components/ui/modal/confrim-process-modal";
import FixedModal from "components/ui/modal/fixed-modal";
import SectionGuard from "components/auth/section-guard";

import { TableHeadShape } from "types/table-type";
import { ReactNode, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { sepratorBudgetApi } from "api/budget/seprator-api";
import { joinPermissions } from "helper/auth-utils";
import { accessNamesConfig } from "config/access-names-config";
import {
  GetSingleDetailSepratorItemShape,
  GetSingleSepratorProjectItemShape,
} from "types/data/budget/seprator-type";
import { sepratorBudgetConfig } from "config/features/budget/seprator-config";
import { reactQueryKeys } from "config/react-query-keys-config";
import { enqueueSnackbar } from "notistack";
import { globalConfig } from "config/global-config";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import SepratorProjectModal2 from "./seprator-project-modal-2";

interface TableDataItemShape {
  number: ReactNode;
  areaNameShort: ReactNode;
  projectCode: ReactNode;
  projectName: ReactNode;
  actions: ((row: TableDataItemShape) => ReactNode) | ReactNode;
}

interface SepratorProjectModal1props {
  data: any[];
  formData: any;
  baseModal1Title: string;
  baseCodingId: number;
}
function SepratorProjectModal1(props: SepratorProjectModal1props) {
  const { data, formData, baseModal1Title, baseCodingId } = props;

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "number",
    },
    {
      title: "کد پروژه",
      name: "projectCode",
    },
    {
      title: "نام پروژه",
      name: "projectName",
      align: "left",
    },
    {
      title: "مصوب",
      name: "mosavab",
      split: true,
      align: "left",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // modal project
  const sepratorAreaMutation = useMutation(sepratorBudgetApi.areaArea);
  const [isOpenAreaModal, setIsOpenAreaModal] = useState(false);
  const [modal1ProjectId, setModal1ProjectId] = useState<null | number>(null);

  const handleClickAreaModal = (
    row: TableDataItemShape & GetSingleSepratorProjectItemShape
  ) => {
    setModal1ProjectId(row.id);
    sepratorAreaMutation.mutate(formData);
    setIsOpenAreaModal(true);
  };

  // actions
  const actionButtons = (row: TableDataItemShape | any) => (
    <IconButton
      color="primary"
      size="small"
      onClick={() => handleClickAreaModal(row)}
    >
      ar
    </IconButton>
  );

  // data
  const formatTableData = (
    unFormatData: GetSingleSepratorProjectItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] | any = unFormatData.map(
      (item, i) => ({
        ...item,
        number: i + 1,
        actions: actionButtons,
      })
    );

    return formatedData;
  };

  const modal1Query = useQuery(
    reactQueryKeys.budget.seprator.projectModal1,
    sepratorBudgetApi.areaProject,
    {
      enabled: false,
    }
  );

  const tableData = formatTableData(modal1Query.data?.data || data);

  return (
    <>
      <FixedTable heads={tableHeads} data={tableData} notFixed />

      {/* area modal */}
      <FixedModal
        open={isOpenAreaModal}
        handleClose={() => setIsOpenAreaModal(false)}
        loading={sepratorAreaMutation.isLoading}
        title={baseModal1Title}
        maxWidth="sm"
        maxHeight="70%"
      >
        <SepratorProjectModal2
          data={sepratorAreaMutation.data?.data || []}
          modal1ProjectId={modal1ProjectId}
          baseCodingId={baseCodingId}
          formData={formData}
          onClose={() => setIsOpenAreaModal(false)}
        />
      </FixedModal>
    </>
  );
}

export default SepratorProjectModal1;
