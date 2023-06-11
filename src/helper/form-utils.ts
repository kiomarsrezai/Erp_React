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
  const value = e.target.value;

  if (name) setFormData((state: any) => ({ ...state, [name]: value }));
};
