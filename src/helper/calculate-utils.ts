export const sumFieldsInSingleItemData = (
  data: any,
  key: string,
  condition?: (item: any) => boolean
) => {
  const reduceCallback = (previousValue: any, currentValue: any) => {
    return (
      +previousValue +
      (condition?.(currentValue) !== false ? +currentValue[key] : 0)
    );
  };

  return data ? data.reduce(reduceCallback, 0) : 0;
};

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "/");
};
