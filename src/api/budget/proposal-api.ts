import clientAxios from "config/axios-config";

import { BaseApi } from "api/base-api";
import { BaseApiResponseShape } from "types/base-type";

import {
  GetSearchPropsalModal1Data,
  GetSearchPropsalModal2Data,
  GetSingleLevel5DetailProposalItemShape,
  GetSingleMoreDetailProposalItemShape,
  GetSingleProposalItemShape,
} from "types/data/budget/proposal-type";
import {
  proposalConfig,
  propsalBudgetUrls,
} from "config/features/budget/proposal-config";

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
    const filterData = {
      [proposalConfig.project]: formdata[proposalConfig.project],
      [proposalConfig.AREA]: formdata[proposalConfig.AREA],
      [proposalConfig.YEAR]: formdata[proposalConfig.YEAR],
      [proposalConfig.coding]: formdata[proposalConfig.coding],
    };

    const url =
      propsalBudgetUrls.getLevel5Detail + this.joinFilterData(filterData);
    const response = await clientAxios.get<
      BaseApiResponseShape<GetSingleLevel5DetailProposalItemShape[]>
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
    const url = propsalBudgetUrls.deleteModal1 + id;
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(url);
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

  // modal 3
  editModal3 = async (formdata: any) => {
    const response = await clientAxios.post<BaseApiResponseShape<boolean>>(
      propsalBudgetUrls.editModal3,
      formdata
    );
    return response.data;
  };
})();
