import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";

import { GetSingleProposalItemShape } from "types/data/budget/proposal-type";
import {
  proposalConfig,
  propsalBudgetUrls,
} from "config/features/budget/proposal-config";

export const proposalBudgetApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const filterData = {
      [proposalConfig.YEAR]: formdata[proposalConfig.YEAR],
      [proposalConfig.AREA]: 10, // formdata[proposalConfig.AREA],
      [proposalConfig.BUDGET_METHOD]: formdata[proposalConfig.BUDGET_METHOD],
    };

    const url = propsalBudgetUrls.getData + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleProposalItemShape[]>
    >(url);
    return response.data;
  };
})();
