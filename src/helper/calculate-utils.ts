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
  try {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }catch (e){
    return ''
  }
};

export const getPercent = (a: number = 0, b: number = 1) => {
  const result = Math.round((a / b) * 100);
  return isFinite(result) ? result : 0;
};

export const getPercentGrow = (a: number = 0, b: number = 1) => {
  const result = getPercent(a, b) - 100;
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

export function priceFormat(price: any){
  try {
    if(!isNaN(price)){
      return parseInt(price).toLocaleString('en-US');
    }
  }catch (e) {}
  
  return '';
}

export function getRangeColor(value: any, month: any){
  //@ts-ignore
  month = parseInt(month);
  const percentage = (month / 12) * 100;
  
  const minSuccessPercentage = percentage * 0.9;
  const maxSuccessPercentage = percentage * 1.1;
  
  const minYellowPercentage = percentage * 0.7;
  const maxYellowPercentage = percentage * 1.3;
  
  const successColor = 'green';
  const yellowColor = 'yellow';
  const redColor = 'red';
  
  console.log('================');
  console.log(percentage, value)
  
  if(minSuccessPercentage <= value && value <= maxSuccessPercentage){
    return successColor;
  } else if (minYellowPercentage <= value && value <= maxYellowPercentage){
    return yellowColor;
  }
  
  return redColor;
}

export function reFormatAmount(amount: number){
  //@ts-ignore
  return parseInt(amount / 1000);
}
