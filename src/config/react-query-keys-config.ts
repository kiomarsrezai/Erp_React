import { QueryClient } from "@tanstack/react-query";

export const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0,
      cacheTime: 0,
    },
  },
});

export const reactQueryKeys = {
  budget: {
    seprator: {
      getData: ["budget-seprator"],
      getConfrimData: ["budget-seprator-confrim-data"],
      projectModal1: ["budget-seprator-project-modal1"],
    },
    sepratorCreaditor: {
      getData: ["budget-seprator-creaditor"],
      projectModal1: ["budget-seprator-project-modal1"],
    },
    proposal: {
      getData: ["budget-propsal"],
      getChartModelData: ["budget-propsal-get-chart-model-data"],
      getModal1Data: ["budget-propsal-modal1"],
      getModal2Data: ["budget-propsal-modal2"],
      getModal3Data: ["budget-propsal-modal3"],

      getAccData: ["budget-propsal-acc"],
    },
    connect: {
      getData: ["budget-connect"],
    },
    coding: {
      getData: ["budget-coding"],
    },
    sort: {
      getData: ["budget-sort"],
    },
    edit: {
      getData: ["budget-edit"],
    },
    deviation: ["budget-deviation"],
    expense: ["budget-expense"],
    projectOpration: ["budget-project-opration"],
    requestAnalyzeRead: ["request-analyze-read"],
  },
  request: {
    budgetRow: {
      list: ["request-budget-row"],
    },
    contract: {
      list: ["request-contracts"],
    },
    suppliers: {
      list: ["suppliers-list"],
    },
    table: {
      list: ["request-table-list"],
    },
  },
  traz: {
    getData: ["data-traz"],
  },
  report: {
    chart: {
      revenue: ["revenuse-chart"],
      ravand: ["ravand-chart"],
      revenueMoreDetail: ["revenuse-chart-more-detail"],
    },
    proctor: {
      abstract: ["abstract-proctor"],
      abstractProctorModal1: ["abstract-proctor-modal1"],
      getDetailData: ["abstract-proctor-detail"],
    },
    abstruct: {
      getData: ["abstruct-budget-list"],
    },
  },
  transfer: {
    getData: ["transfer"],
    getModalData: ["transfer-modal"],
  },
  orginization: {
    posts: {
      getPosts: ["getOrginizationPosts"],
    },
  },
  project: {
    org: {
      getProject: ["project-org-item"],
      insertProject: ["project-org-item-add"],
      getTable: ["project-org-table"],
    },
    mettings: {
      getCommitesModal: ["project-mettings-modals"],
      getCommitesDetailModal: ["project-mettings-detail-modals"],
      getCommitesConfirmationModal: ["project-mettings-confirmation"],
      getCommitesWbsModal: ["project-mettings-confirmation"],
      getCommitesEstimateModal: ["project-mettings-estimate"],
    },
    program: {
      data: ["project-program-data"],
    },
  },
  contracts: {
    tasks: {
      getData: ["contracts-tasks-data"],
      getArea: ["contracts-areas-data"],
    },
    motaleb: {
      getData: ["all-motaleb"],
    },
  },

  departman: {
    aceptor: {
      getData: ["departman-acceptor-read"],
      getEmploye: ["departman-acceptor-employe"],
    },
  },
  // globals
  generals: {
    year: ["general-year"],
    area: ["general-area"],
  },
};
