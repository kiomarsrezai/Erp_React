import clientAxios from "config/axios";

// revenue chart
export const revenueChartApi = new (class {
  getChart = async () => {
    const response = await clientAxios.get(
      "BudSepApi/ChartApi?yearId=32&centerId=2&budgetProcessId=1&structureId=1&revenue=true&sale=true&loan=true&niabati=true"
    );
    return response.data;
  };
})();
