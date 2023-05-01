export const reactQueryKeys = {
  budget: {
    seprator: {
      getData: ["budget-seprator"],
    },
    proposal: {
      getData: ["budget-propsal"],
    },
  },
  report: {
    chart: {
      revenue: ["revenuse-chart"],
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
