export const getBgColorBudget = (levelNumber: number, budgetMethod: number) => {
  // budget method 1
  if (levelNumber === 1 && (budgetMethod === 1 || budgetMethod === 9)) {
    return "rgb(248,203,173)";
  }

  if (levelNumber === 2 && (budgetMethod === 1 || budgetMethod === 9)) {
    return "rgb(198,224,180)";
  }

  if (levelNumber === 3 && (budgetMethod === 1 || budgetMethod === 9)) {
    return "rgb(189,215,238)";
  }

  if (levelNumber === 4 && (budgetMethod === 1 || budgetMethod === 9)) {
    return "rgb(255,255,153)";
  }

  if (levelNumber === 5 && (budgetMethod === 1 || budgetMethod === 9)) {
    return "#fff";
  }

  if (levelNumber === 6 && (budgetMethod === 1 || budgetMethod === 9)) {
    return "rgb(243 243 202)";
  }

  // budget method 2
  if (budgetMethod === 2 && levelNumber === 1) {
    return "rgb(198,224,180)";
  }

  if (budgetMethod === 2 && levelNumber === 2) {
    return "rgb(248,203,173)";
  }

  if (budgetMethod === 2 && levelNumber === 3) {
    return "rgb(255,255,153)";
  }

  if (budgetMethod === 2 && levelNumber === 4) {
    return "#fff";
  }

  // budget method 3
  if (levelNumber === 1 && budgetMethod === 3) {
    return "rgb(248,203,173)";
  }

  if (levelNumber === 2 && budgetMethod === 3) {
    return "rgb(198,224,180)";
  }

  if (levelNumber === 3 && budgetMethod === 3) {
    return "rgb(189,215,238)";
  }

  if (levelNumber === 4 && budgetMethod === 3) {
    return "rgb(255,255,153)";
  }

  if (levelNumber === 5 && budgetMethod === 3) {
    return "#fff";
  }

  if (levelNumber === 6 && budgetMethod === 3) {
    return "rgb(243 243 202)";
  }

  // budget method 4
  if (levelNumber === 1 && budgetMethod === 4) {
    return "rgb(248,203,173)";
  }

  if (levelNumber === 2 && budgetMethod === 4) {
    return "rgb(198,224,180)";
  }

  if (levelNumber === 3 && budgetMethod === 4) {
    return "rgb(189,215,238)";
  }

  if (levelNumber === 4 && budgetMethod === 4) {
    return "#fff";
  }
};
