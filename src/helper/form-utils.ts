import { ChangeEvent } from "react";

export const checkHaveValue = (formData: any, names: string[]) => {
  let haveValue = true;
  names.forEach((name) => {
    if (formData[name] === undefined) {
      haveValue = false;
    }
  });

  return haveValue;
};

export const changeInputHandler = (
  e: ChangeEvent<HTMLInputElement>,
  setFormData: (state: any) => void
) => {
  const name = e.target.name;
  const type = e.target.type;
  const value = type === "number" ? Number(e.target.value) : e.target.value;

  if (name) setFormData((state: any) => ({ ...state, [name]: value }));
};

export const onlyNumberKey = (evt: any) => {
  // Only ASCII character in that range allowed
  var ASCIICode = evt.which ? evt.which : evt.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
    evt.preventDefault();
    return false;
  }
  return true;
};
