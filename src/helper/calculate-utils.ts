export const sumFieldsInSingleItemData = (data: any, key: string) => {
  const reduceCallback = (previousValue: any, currentValue: any) => {
    return +previousValue + +currentValue[key];
  };

  return data ? data.reduce(reduceCallback, 0) : 0;
};

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "/");
};
