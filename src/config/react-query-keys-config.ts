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
      projectModal1: ["budget-seprator-project-modal1"],
    },
    sepratorCreaditor: {
      getData: ["budget-seprator-creaditor"],
      projectModal1: ["budget-seprator-project-modal1"],
    },
    proposal: {
      getData: ["budget-propsal"],
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
    deviation: ["budget-deviation"],
    projectOpration: ["budget-project-opration"],
  },
  request: {
    suppliers: {
      list: ["suppliers-list"],
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
    },
    mettings: {
      getCommitesModal: ["project-mettings-modals"],
      getCommitesDetailModal: ["project-mettings-detail-modals"],
    },
    program: {
      data: ["project-program-data"],
    },
  },
  // globals
  generals: {
    year: ["general-year"],
    area: ["general-area"],
  },
};
