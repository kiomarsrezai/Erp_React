import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";

import {budgetShareAreaUrls} from "config/features/budget/budget-connect-config";
import {GetSingleBudgetShareAreaItemShape} from "../../types/data/budget/budget-share-area-type";

export const budgetAreaShare = new (class extends BaseApi {
    getData = async (formdata: any) => {
        const url = budgetShareAreaUrls.getData + this.joinFilterData(formdata);
        const response = await clientAxios.get<
            BaseApiResponseShape<GetSingleBudgetShareAreaItemShape[]>
        >(url);
        
        return response.data;
    };
    
    update = async (formdata: any) => {
        const response = await clientAxios.post(budgetShareAreaUrls.update, formdata);
        return response.data;
    };
})();
