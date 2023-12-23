import clientAxios from "config/axios-config";
import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import {requestAnalyzeReadUrls} from "../../config/features/budget/report/request-analyze-read";
import {RequestAnalyzeReadItemShape} from "../../types/data/budget/request-analyze-read-type";
import {numberOfDaysPassedSinceJalaliDate} from "../../helper/date-utils";

export const requestAnalyzeReadApi = new (class extends BaseApi {
    getData = async (formdata: any) => {
        const url =
            requestAnalyzeReadUrls.getData + this.joinFilterData(formdata);
        console.log(url);
        
        const response = await clientAxios.get<
            BaseApiResponseShape<RequestAnalyzeReadItemShape[]>
            >(url);
    
        response.data.data.map(item=> {
            if(item.requestDate){
                item.day = numberOfDaysPassedSinceJalaliDate(item.requestDate);
            }else{
                item.day = "";
            }
        });
        
        return response.data;
    };
})();
