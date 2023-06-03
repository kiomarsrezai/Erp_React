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

  const result = data ? data.reduce(reduceCallback, 0) : 0;
  return isNaN(result) ? 0 : result;
};

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getPercent = (a: number = 0, b: number = 1) => {
  const result = Math.round((a / b) * 100);
  return isFinite(result) ? result : 0;
};

export const getPercentFloat = (
  a: number = 0,
  b: number = 1,
  count: number
) => {
  const result = ((a / b) * 100).toFixed(count);
  return result;
};
