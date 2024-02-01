import {beforeproposalConfig} from "../../config/features/budget/beforeproposal-config";
import clientAxios from "../../config/axios-config";
import {BaseApiResponseShape} from "../../types/base-type";
import {getPercent} from "../../helper/calculate-utils";
import {BaseApi} from "../base-api";
import {GetSingleSuggestedEditItemShape} from "../../types/beforeproposal-type";

export const suggestedEditApi = new (class extends BaseApi {
    getData = async (formdata: any) => {
        const filterData = {
            [beforeproposalConfig.YEAR]: formdata[beforeproposalConfig.YEAR],
            [beforeproposalConfig.AREA]: formdata[beforeproposalConfig.AREA],
            [beforeproposalConfig.BUDGET_METHOD]:
                formdata[beforeproposalConfig.BUDGET_METHOD],
        };
        
        
        const url = "BudgetEditApi/Edit" + this.joinFilterData(filterData);
        const response = await clientAxios.get<BaseApiResponseShape<GetSingleSuggestedEditItemShape[]>>(url);
        
        response.data.data.map((item) => {
            item['percent2'] = getPercent(item['supply'], item['mosavab']);
            item['sumSupplyNeedEditYearNow'] = item['supply'] + item['needEditYearNow'];
        });
        
        return response.data;
    };
})();
