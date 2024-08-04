import {BaseApi} from "../base-api";
import clientAxios from "../../config/axios-config";
import {BaseApiResponseShape} from "../../types/base-type";
import {DashboardApiRead} from "../../types/beforeproposal-type";

export const mainRequestApi = new (class extends BaseApi {
    getData = async (formdata: any) => {
        const url = "DashboardApi/DashboardCharts" + this.joinFilterData({...formdata, structureId: 1});
        const response = await clientAxios.get<BaseApiResponseShape<DashboardApiRead[]>>(url);
        
        return response.data;
    };
    
    getData2 = async (formdata: any) => {
        const url = "DashboardApi/DashboardCharts" + this.joinFilterData({...formdata, structureId: 2});
        const response = await clientAxios.get<BaseApiResponseShape<DashboardApiRead[]>>(url);
        
        return response.data;
    };
})();
