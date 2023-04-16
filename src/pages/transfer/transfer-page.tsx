import AdminLayout from "components/layout/admin-layout";
import FixedTable from "components/data/table/fixed-table";
import TransferForm from "components/sections/forms/transfer-form";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import BalanceIcon from "@mui/icons-material/Balance";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { TableHeadShape, TableHeadGroupShape } from "types/table-type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { transferApi } from "api/transfer/transfer-api";
import { GetSingleTransferItemShape } from "types/data/transfer/transfer-type";
import { reactQueryKeys } from "config/react-query-keys-config";
import { ReactNode, useState } from "react";
import { sumFieldsInSingleItemData } from "helper/calculate-utils";
import FixedModal from "components/ui/modal/fixed-modal";

interface TableDataItemShape {
  id: ReactNode;
  code: ReactNode;
  description: ReactNode;
  mosavab: ReactNode;
  codeAcc: ReactNode;
  titleAcc: ReactNode;
  actions: ReactNode;
}

function TransferPage() {
  // modal
  const [openModal, setOpenModal] = useState(false);
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // table heads
  const tableHeadGroups: TableHeadGroupShape = [
    {
      title: <TransferForm />,
      colspan: 7,
    },
  ];

  const tableHeads: TableHeadShape = [
    {
      title: "ردیف",
      name: "id",
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
      title: "مصوب",
      align: "left",
      name: "mosavab",
      split: true,
    },
    {
      title: "کد حسابداری",
      name: "codeAcc",
    },
    {
      title: "شرح حسابداری",
      align: "left",
      name: "titleAcc",
    },
    {
      title: "عملیات",
      name: "actions",
    },
  ];

  // table data
  const insertCodeAccMutation = useMutation(transferApi.insertCodeAcc, {
    // onSuccess: (data) => {
    //   queryClient.setQueryData(reactQueryKeys.transfer.getData, data);
    // },
  });

  const DeleteCodeAccMutation = useMutation(transferApi.deleteCodeAcc, {
    // onSuccess: (data) => {
    //   queryClient.setQueryData(reactQueryKeys.transfer.getData, data);
    // },
  });

  const actionButtons = (
    <Box display="flex">
      <IconButton color="primary" size="small" onClick={handleOpenModal}>
        <BalanceIcon />
      </IconButton>

      <IconButton
        color="success"
        size="small"
        // onClick={() => insertCodeAccMutation.mutate(1)}
        // disabled={insertCodeAccMutation.isLoading}
      >
        <AddIcon />
      </IconButton>

      <IconButton
        color="error"
        size="small"
        // onClick={() => DeleteCodeAccMutation.mutate(1)}
        // disabled={DeleteCodeAccMutation.isLoading}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );

  const formatTableData = (
    unFormatData: GetSingleTransferItemShape[]
  ): TableDataItemShape[] => {
    const formatedData: TableDataItemShape[] = unFormatData.map((item, i) => ({
      id: i + 1,
      code: item.code,
      description: item.description,
      mosavab: item.mosavab,
      codeAcc: item.codeAcc,
      titleAcc: item.titleAcc,
      actions: actionButtons,
    }));

    return formatedData;
  };

  const transferQuery = useQuery(
    reactQueryKeys.transfer.getData,
    () => transferApi.getData({}),
    {
      enabled: false,
    }
  );

  const tableData = transferQuery.data
    ? formatTableData(transferQuery.data?.data)
    : [];

  // table footer
  const tableFooter: TableDataItemShape = {
    id: "جمع",
    code: "",
    description: "",
    mosavab: sumFieldsInSingleItemData(transferQuery.data?.data, "mosavab"),
    codeAcc: "",
    titleAcc: "",
    actions: "",
  };

  return (
    <AdminLayout>
      <FixedTable
        heads={tableHeads}
        headGroups={tableHeadGroups}
        data={tableData}
        footer={tableFooter}
      />

      <FixedModal open={openModal} handleClose={handleCloseModal}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi ab
        odio vero doloremque, molestias voluptatibus fugiat temporibus
        consequatur accusamus, eaque laborum aperiam a ratione vitae excepturi
        dignissimos assumenda distinctio voluptatem! Lorem ipsum, dolor sit amet
        consectetur adipisicing elit. Harum vel nisi animi ratione nemo
        assumenda eum eveniet in? Inventore iste sunt commodi quisquam
        voluptatem beatae unde minus? Ratione quam rerum excepturi amet, maxime
        cupiditate unde quaerat error illo minus iure, commodi neque,
        exercitationem pariatur nobis perspiciatis sapiente beatae mollitia
        obcaecati modi dolor nam eos. Nam porro est dolorum et esse laudantium.
        Iste odio ducimus eligendi pariatur unde doloribus facilis accusamus
        earum dolorum adipisci deserunt rem nihil temporibus voluptate labore,
        ipsum hic ab. Adipisci minima maxime inventore reiciendis! Quisquam
        voluptatem corporis architecto doloremque? Quos, explicabo architecto
        inventore expedita minima, porro, eaque deleniti voluptatibus molestias
        nam ut fugiat molestiae quidem. Dolor quia reiciendis illo vero
        voluptatibus. Molestias alias voluptatem veritatis quaerat non
        voluptatum, accusamus distinctio provident error necessitatibus, dolores
        nemo ratione ipsum! Similique, quibusdam quae doloribus quos impedit
        dicta debitis veniam, quo aliquid tenetur modi, deserunt sapiente
        dolorem. Consectetur, eum voluptate dolor magni tempore quasi atque.
        Similique sint eligendi labore, voluptatem architecto molestias quod
        veniam quam explicabo natus quis ipsum qui culpa quia distinctio dolores
        quas, temporibus ratione saepe odio in repellendus nisi voluptatum
        sequi! Nesciunt eveniet, doloremque eum perferendis quaerat voluptatem
        voluptate ipsum, fugiat earum voluptates quam quod consequatur
        temporibus atque, eius totam reprehenderit? Sequi qui repellat non
        quibusdam vel suscipit tempora maiores alias, esse labore at iure sint
        laudantium dignissimos in voluptates odio ratione asperiores accusantium
        dolorum accusamus perspiciatis? Odit voluptatem quaerat similique
        aliquid sequi amet recusandae optio, obcaecati itaque cumque assumenda
        ipsam aut aliquam nemo distinctio labore provident reiciendis fugiat
        sapiente expedita officiis accusantium mollitia saepe ullam? Eligendi
        totam sit, voluptatem debitis dolorum consectetur qui corrupti iste
        magni minus reiciendis sequi. Sed, vitae cumque eos at modi error veniam
        ea, omnis saepe voluptatibus temporibus natus et minus non rem
        distinctio aut voluptatum quo dolorum cum deleniti! Fugiat perspiciatis
        quos vel? Tempora voluptatum nisi labore, est veniam optio omnis, vero
        incidunt, numquam ea asperiores maiores. Fuga doloribus nihil delectus
        dolores ipsam! Earum accusantium cupiditate deserunt rerum fugit
        inventore, quam unde tempore ab quia? Odio, necessitatibus odit? Facere
        provident at porro cum dicta maxime nisi odit officiis, qui praesentium
        impedit quis laudantium sapiente? Sint accusantium laudantium amet omnis
        fuga, dolorem placeat consequatur pariatur aperiam reiciendis officiis,
        minus ab distinctio iure accusamus sed perferendis labore impedit culpa
        earum quae temporibus quia. Libero eligendi corrupti eum? Illo
        repudiandae neque nulla harum molestias voluptatibus explicabo assumenda
        inventore beatae similique perferendis cum error corrupti impedit, natus
        perspiciatis commodi! Sit asperiores dolore ipsam unde quod magni
        accusantium, aut placeat vitae quae facilis sint dolor. Doloribus nisi
        modi facilis veritatis libero unde pariatur magnam magni, esse totam
        fugiat enim, expedita quis laudantium obcaecati perferendis saepe,
        explicabo veniam maiores reprehenderit consequuntur atque? Dicta itaque
        quam, recusandae dolorum eum dignissimos placeat sit veniam officia
        provident nihil eaque qui, laboriosam aspernatur voluptas eligendi
        repellat et excepturi omnis. Placeat, nostrum! Vel maxime eum veniam
        tempore obcaecati enim debitis reprehenderit ipsa maiores magni
        architecto velit impedit, repellendus cumque tempora mollitia quam
        laborum dolores nostrum ut, quibusdam sint, dolorem aspernatur. Facilis,
        atque porro!
      </FixedModal>
    </AdminLayout>
  );
}

export default TransferPage;
