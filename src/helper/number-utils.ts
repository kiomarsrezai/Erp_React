const changeNumber = (num: number, id: number) => {
  let result = 0;
  if (id === 2) {
    result = +num.toString().slice(0, -3);
  } else if (id === 3) {
    result = +num.toString().slice(0, -6);
  } else if (id === 4) {
    result = +num.toString().slice(0, -9);
  } else {
    result = num;
  }

  return isNaN(result) ? 0 : result;
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
