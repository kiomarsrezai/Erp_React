export const sumFieldsInSingleItemData = (data: any, key: string) => {
  const reduceCallback = (previousValue: any, currentValue: any) => {
    return previousValue + currentValue[key];
  };

  return data ? data.reduce(reduceCallback, 0) : 0;
};
