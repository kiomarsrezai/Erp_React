const changeNumber = (num: number, id: number) => {
  if (id === 2) {
    return +num.toString().slice(0, -3);
  } else if (id === 3) {
    return +num.toString().slice(0, -6);
  } else if (id === 4) {
    return +num.toString().slice(0, -9);
  }

  return num;
};

export const convertNumbers = (
  data: any[],
  fields: string[],
  formatId: number
) => {
  const newData = data.map((item) => {
    let newItem: any = {};

    for (const key in item) {
      if (fields.includes(key)) {
        newItem[key] = changeNumber(item[key], formatId);
      } else {
        newItem[key] = item[key];
      }
    }

    return newItem;
  });

  return newData;
};
