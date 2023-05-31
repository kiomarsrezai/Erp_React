export const formatExpenseName = (budgetMethod: number | undefined) => {
  if (budgetMethod === 2 || budgetMethod === 3 || budgetMethod === 4) {
    return "هزینه";
  } else {
    return "عملکرد";
  }
};
