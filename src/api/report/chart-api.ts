import clientAxios from "config/axios";

interface BaseApiResponseShape<T> {
  data: T;
}
// revenue chart
type GetChartShape = [string[], number[], number[], number[]];

export const revenueChartApi = new (class {
  getChart = async () => {
    const response = await clientAxios.get<BaseApiResponseShape<GetChartShape>>(
      "BudSepApi/ChartApi?yearId=32&centerId=2&budgetProcessId=1&structureId=1&revenue=true&sale=true&loan=true&niabati=true"
    );
    return response.data;
  };
})();
