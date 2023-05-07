export const reactQueryKeys = {
  budget: {
    seprator: {
      getData: ["budget-seprator"],
    },
    proposal: {
      getData: ["budget-propsal"],
    },
    coding: {
      getData: ["budget-coding"],
    },
  },
  traz: {
    getData: ["data-traz"],
  },
  report: {
    chart: {
      revenue: ["revenuse-chart"],
      revenueMoreDetail: ["revenuse-chart-more-detail"],
    },
    proctor: {
      abstract: ["abstract-proctor"],
      getDetailData: ["abstract-proctor-detail"],
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
  },
};
