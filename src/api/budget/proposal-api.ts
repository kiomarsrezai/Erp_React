import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";

import {
  BudgetProposalModalRead,
  GetModalBaseData,
  GetSearchPropsalModal1Data,
  GetSearchPropsalModal2Data,
  GetSingleLevel5DetailProposalItemShape,
  GetSingleMoreDetailProposalItemShape,
  GetSingleProposalInfoItemShape,
  GetSingleProposalItemShape,
  GetSingleProposalProjectInsertCodeItemShape, ProposalBalance,
} from "types/data/budget/proposal-type";
import {
  proposalConfig,
  propsalBudgetUrls,
} from "config/features/budget/proposal-config";
import {getPercentGrow} from "../../helper/calculate-utils";

export const proposalBudgetApi = new (class extends BaseApi {
  getData = async (formdata: any) => {
    const filterData = {
      [proposalConfig.YEAR]: formdata[proposalConfig.YEAR],
      [proposalConfig.AREA]: formdata[proposalConfig.AREA],
      [proposalConfig.BUDGET_METHOD]: formdata[proposalConfig.BUDGET_METHOD],
    };

    const url = propsalBudgetUrls.getData + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleProposalItemShape[]>
    >(url);
    return response.data;
  };

  getDetailData = async (formdata: any) => {
    const filterData = {
      [proposalConfig.YEAR]: formdata[proposalConfig.YEAR],
      [proposalConfig.AREA]: formdata[proposalConfig.AREA],
      [proposalConfig.coding]: formdata[proposalConfig.coding],
    };

    const url = propsalBudgetUrls.getDetail + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleProposalItemShape[]>
    >(url);
    return response.data;
  };

  getMoreDetailData = async (formdata: any) => {
    const filterData = {
      [proposalConfig.coding]: formdata[proposalConfig.coding],
      [proposalConfig.AREA]: formdata[proposalConfig.AREA],
      [proposalConfig.YEAR]: formdata[proposalConfig.YEAR],
    };

    const url =
      propsalBudgetUrls.getMoreDetail + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleMoreDetailProposalItemShape[]>
    >(url);
    return response.data;
  };

  getLevel5DetailData = async (formdata: any) => {
    const url = propsalBudgetUrls.getModal3 + this.joinFilterData(formdata);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleLevel5DetailProposalItemShape[]>
    >(url);
    return response.data;
  };

  // modal base
  getModalBaseData = async (formdata: any) => {
    const url =
      propsalBudgetUrls.getModalBaseData + this.joinFilterData(formdata);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetModalBaseData[]>
    >(url);
    return response.data;
  };

  // modal 1
  getSearchModal1Data = async (formdata: any) => {
    const url =
      propsalBudgetUrls.getSearchModal1 + this.joinFilterData(formdata);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSearchPropsalModal1Data[]>
    >(url);
    return response.data;
  };

  insertModal1 = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      propsalBudgetUrls.insertModal1,
      formdata
    );
    return response.data;
  };

  editModal1 = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      propsalBudgetUrls.editModal1,
      formdata
    );
    return response.data;
  };

  deleteModal1 = async (id: number) => {
    const url = propsalBudgetUrls.deleteModal1;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      { id }
    );
    return response.data;
  };

  // modal 2
  getSearchModal2Data = async (formdata: any) => {
    const url =
      propsalBudgetUrls.getSearchModal2 + this.joinFilterData(formdata);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSearchPropsalModal2Data[]>
    >(url);
    return response.data;
  };

  insertModal2 = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      propsalBudgetUrls.insertModal2,
      formdata
    );
    return response.data;
  };

  editModal2 = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      propsalBudgetUrls.editModal2,
      formdata
    );
    return response.data;
  };

  deleteModal2 = async (id: number) => {
    const url = propsalBudgetUrls.deleteModal2;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      { id }
    );
    return response.data;
  };

  // modal 3
  editModal3 = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      propsalBudgetUrls.editModal3,
      formdata
    );
    return response.data;
  };

  insertModal3 = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      propsalBudgetUrls.insertModal3,
      formdata
    );
    return response.data;
  };

  deleteModal3 = async (id: number) => {
    const url = propsalBudgetUrls.deleteModal3;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      { id }
    );
    return response.data;
  };

  // info modal
  getInfoData = async (formdata: any) => {
    const url = propsalBudgetUrls.getInfo + this.joinFilterData(formdata);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleProposalInfoItemShape[]>
    >(url);
    return response.data;
  };

  // insert code
  codingInsert = async (formdata: any) => {
    const url = propsalBudgetUrls.insertCode;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      url,
      formdata
    );
    return response.data;
  };

  getProjectsModalData = async (formdata: any) => {
    const url =
      propsalBudgetUrls.projectsCodeData + this.joinFilterData(formdata);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleProposalProjectInsertCodeItemShape[]>
    >(url);
    return response.data;
  };

  editItem = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
        propsalBudgetUrls.edit,
        formdata
    );

    return response.data;
  };


  ////sajjad
  BudgetProposalRead = async (formdata: any) => {
    const url = propsalBudgetUrls.getProData + this.joinFilterData(formdata);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleProposalInfoItemShape[]>
    >(url);
    return response.data;
  };
  
  balanceTextBoxRead = async (formdata: any) => {
    const url = propsalBudgetUrls.balanceTextBoxRead + this.joinFilterData(formdata);
    const response = await clientAxios.get<
      BaseApiResponseShape<ProposalBalance>
    >(url);
    return response.data;
  };
  
  budgetProposalModalRead = async (formdata: any) => {
    const url = propsalBudgetUrls.budgetProposalModalRead + this.joinFilterData(formdata);
    const response = await clientAxios.get<
        BaseApiResponseShape<BudgetProposalModalRead[]>
        >(url);
  
    response.data.data.map(item => {
      item.present2 = getPercentGrow(item.budgetNext, item.mosavab);
    });
    
    return response.data;
  };
  
  budgetProposalModalChart = async (formdata: any) => {
    const url = propsalBudgetUrls.budgetProposalModalChart + this.joinFilterData(formdata);
    const response = await clientAxios.get<
        BaseApiResponseShape<any[]>
        >(url);
    return response.data;
  };
})();
