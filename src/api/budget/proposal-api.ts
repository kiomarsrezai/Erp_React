import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";

import { GetSingleProposalItemShape } from "types/data/budget/proposal-type";
import {
  PROPOSAL_BUDGET_URL,
  proposalConfig,
} from "config/features/budget/proposal-config";

export const proposalBudgetApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const filterData = {
      [proposalConfig.YEAR]: formdata[proposalConfig.YEAR],
      [proposalConfig.AREA]: formdata[proposalConfig.AREA],
      [proposalConfig.BUDGET_METHOD]: formdata[proposalConfig.BUDGET_METHOD],
    };

    const url = PROPOSAL_BUDGET_URL + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleProposalItemShape[]>
    >(url);
    return response.data;
  };
})();
