import {beforeproposalConfig} from "../../config/features/budget/beforeproposal-config";
import clientAxios from "../../config/axios-config";
import {BaseApiResponseShape} from "../../types/base-type";
import {getPercent, getPercentGrow} from "../../helper/calculate-utils";
import {BaseApi} from "../base-api";
import {GetSingleSuggestedEditItemShape, SuggestedEditModalRead} from "../../types/beforeproposal-type";
import {propsalBudgetUrls} from "../../config/features/budget/proposal-config";
import {BudgetProposalModalRead} from "../../types/data/budget/proposal-type";

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
    suggestedEditModalRead = async (formdata: any) => {
        const url = "BudgetEditApi/EditDetailModal" + this.joinFilterData(formdata);
        const response = await clientAxios.get<
            BaseApiResponseShape<SuggestedEditModalRead[]>
            >(url);
    
        response.data.data.map((item) => {
            item['percent2'] = getPercent(item['supply'], item['mosavab']);
            item['sumSupplyNeedEditYearNow'] = item['supply'] + item['needEditYearNow'];
        });
    
        return response.data;
    };
})();
