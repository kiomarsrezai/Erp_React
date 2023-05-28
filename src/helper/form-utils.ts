export const checkHaveValue = (formData: any, names: string[]) => {
  let haveValue = true;
  names.forEach((name) => {
    if (formData[name] === undefined) {
      haveValue = false;
    }
  });

  return haveValue;
};
