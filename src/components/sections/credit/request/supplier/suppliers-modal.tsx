import { ReactNode } from "react";

interface SuppliersModalCreditRequestProps {
  onDoneTask: (id: number, name: string) => void;
}

function SuppliersModalCreditRequest(props: SuppliersModalCreditRequestProps) {
  const { onDoneTask } = props;

  return <>select user</>;
}

export default SuppliersModalCreditRequest;
