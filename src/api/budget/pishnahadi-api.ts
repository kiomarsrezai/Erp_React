import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";
import { beforeproposalConfig, beforepropsalBudgetUrls } from "config/features/budget/beforeproposal-config";
import { GetSingleBeforeProposalItemShape } from "types/beforeproposal-type";
import { generalFieldsConfig } from "config/features/general-fields-config";

export const beforeproposalapi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const filterData = {
      [beforeproposalConfig.YEAR]: formdata[beforeproposalConfig.YEAR],
      [beforeproposalConfig.AREA]: formdata[beforeproposalConfig.AREA],
      [beforeproposalConfig.BUDGET_METHOD]:
        formdata[beforeproposalConfig.BUDGET_METHOD],
    };


    const url = "BudgetPishnahadiApi/BudgetProposalRead" + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleBeforeProposalItemShape[]>
    >(url);
  
    response.data.data.map((item) => {
        item['percent2'] = item['percent']?? '';
    });
    return response.data;

    
  };


 

 

  insertData = async (formdata: any) => {
    const filterData = {
      [generalFieldsConfig.YEAR]: formdata[generalFieldsConfig.YEAR],
      [generalFieldsConfig.AREA]: formdata[generalFieldsConfig.AREA],
      [generalFieldsConfig.BUDGET_METHOD]:        formdata[generalFieldsConfig.BUDGET_METHOD],
      [beforeproposalConfig.coding]:formdata[beforeproposalConfig.coding]
    };


    const url = "BudgetPishnahadiApi/BudgetProposalInlineInsert" + this.joinFilterData(filterData);
    const response = await clientAxios.post<
      BaseApiResponseShape<GetSingleBeforeProposalItemShape[]>
    >(url);
    return response.status;
  };
  // getTaminData = async (formdata: any) => {
  //   const filterData = {
  //     [sepratorBudgetConfig.YEAR]: formdata[sepratorBudgetConfig.YEAR],
  //     [sepratorBudgetConfig.AREA]: formdata[sepratorBudgetConfig.AREA],
  //     [sepratorBudgetConfig.BUDGET_METHOD]:
  //       formdata[sepratorBudgetConfig.BUDGET_METHOD],
  //   };

  //   const url = SEPRATOR_BUDGET_TAMIN_URL + this.joinFilterData(filterData);
  //   const response = await clientAxios.get<
  //     BaseApiResponseShape<GetSingleSepratorTaminItemShape[]>
  //   >(url);
  //   return response.data;
  // };

  // getDetail = async (formdata: any) => {
  //   const filterData = {
  //     [sepratorBudgetConfig.YEAR]: formdata[sepratorBudgetConfig.YEAR],
  //     [sepratorBudgetConfig.AREA]: formdata[sepratorBudgetConfig.AREA],
  //     [sepratorBudgetConfig.CODING]: formdata[sepratorBudgetConfig.CODING],
  //     [sepratorBudgetConfig.BUDGET_METHOD]:
  //       formdata[sepratorBudgetConfig.BUDGET_METHOD],
  //   };

  //   const url = SEPRATOR_BUDGET_DETAIL_URL + this.joinFilterData(filterData);
  //   const response = await clientAxios.get<
  //     BaseApiResponseShape<GetSingleDetailSepratorItemShape[]>
  //   >(url);
  //   return response.data;
  // };

  // refeshForm = async (formdata: any) => {
  //   const filterData = {
  //     [sepratorBudgetConfig.YEAR]: formdata[sepratorBudgetConfig.YEAR],
  //     [sepratorBudgetConfig.AREA]: formdata[sepratorBudgetConfig.AREA],
  //   };

  //   const url =
  //     SEPRATOR_BUDGET_REFRESH_FORM_URL + this.joinFilterData(filterData);
  //   const response = await clientAxios.get<BaseApiResponseShape<boolean>>(url);
  //   return response.data;
  // };

  // linkTamin = async (formdata: any) => {
  //   const response = await clientAxios.post<BaseApiResponseShape<Boolean>>(
  //     SEPRATOR_BUDGET_TAMIN_INSERT_URL,
  //     formdata
  //   );
  //   return response.data;
  // };

  // removeTamin = async (id: number) => {
  //   const response = await clientAxios.post<BaseApiResponseShape<Boolean>>(
  //     SEPRATOR_BUDGET_TAMIN_DELETE_URL,
  //     { id }
  //   );
  //   return response.data;
  // };

  // // acc
  // areaAcc = async (formdata: any) => {
  //   const url = sepratorBudgetUrl.areaAcc + this.joinFilterData(formdata);

  //   const response = await clientAxios.get<
  //     BaseApiResponseShape<GetSingleSepratorAccItemShape[]>
  //   >(url);
  //   return response.data;
  // };

  // // project
  // areaProject = async (formdata: any) => {
  //   const url = sepratorBudgetUrl.areaProject + this.joinFilterData(formdata);

  //   const response = await clientAxios.get<
  //     BaseApiResponseShape<GetSingleSepratorProjectItemShape[]>
  //   >(url);
  //   return response.data;
  // };

  // updateCoding = async (formdata: any) => {
  //   const url = sepratorBudgetUrl.codingUpdate;

  //   const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
  //     url,
  //     formdata
  //   );
  //   return response.data;
  // };

  // // area
  // areaArea = async (formdata: any) => {
  //   const url =
  //     sepratorBudgetUrl.areaProjectArea + this.joinFilterData(formdata);

  //   const response = await clientAxios.get<
  //     BaseApiResponseShape<GetSingleSepratorAreaItemShape[]>
  //   >(url);
  //   return response.data;
  // };

  // areaAreaUpdate = async (formdata: any) => {
  //   const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
  //     sepratorBudgetUrl.areaProjectAreaUpdate,
  //     formdata
  //   );
  //   return response.data;
  // };

  // // fix
  // fixCodeUpdate = async (formdata: any) => {
  //   const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
  //     "BudSepApi/CodingManualUpdate",
  //     formdata
  //   );
  //   return response.data;
  // };

  // fixMosavabRead = async (formdata: any) => {
  //   const url = "BudSepApi/MosavabManualModal" + this.joinFilterData(formdata);
  //   const response = await clientAxios.get<
  //     BaseApiResponseShape<GetSingleSepratorMosavabItemShape[]>
  //   >(url);
  //   return response.data;
  // };

  // fixMosavabUpdate = async (formdata: any) => {
  //   const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
  //     "BudSepApi/MosavabManualUpdate",
  //     formdata
  //   );
  //   return response.data;
  // };

  // // confirm
  // confrimDataRead = async (formdata: any) => {
  //   const url = sepratorBudgetUrl.confrimData + this.joinFilterData(formdata);
  //   const response = await clientAxios.get<
  //     BaseApiResponseShape<GetSingleSepratorConfrimItemShape[]>
  //   >(url);
  //   return response.data;
  // };

  // confrimUpdate = async (formdata: any) => {
  //   const url = sepratorBudgetUrl.confrimUpdate;
  //   const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
  //     url,
  //     formdata
  //   );
  //   return response.data;
  // };

})();
