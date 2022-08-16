export class RestrictedURLGroup {
  constructor(restrictedUrls, currentPath) {
    this.restrictedUrls = restrictedUrls;
    this.currentPath = currentPath;
    this.info = null;
    this.plans = null;
    this.init();
  }
  init() {
    let restrictedUrl = this.getRestrictedUrlInfo();
    this.info = restrictedUrl;
    this.plans = restrictedUrl?.plans.map((plan) => plan.id);
  }

  getStatusByFilter(filter, url) {
    let formattedUrl = `/${url}`;
    return filter === "EQUALS"
      ? formattedUrl === this.currentPath
      : this.currentPath.startsWith(formattedUrl);
  }

  getRestrictedUrlInfo() {
    return this.restrictedUrls.find((urlGroup) => {
      const urlMatch = urlGroup.urls.find(({ filter, url }) => {
        return this.getStatusByFilter(filter, url);
      });
      return urlMatch;
    });
  }

  isRestricted() {
    return this.restrictedUrls.some((restrictedUrl) => {
      return restrictedUrl.urls.some(({ filter, url }) => {
        return this.getStatusByFilter(filter, url);
      });
    });
  }
}

export const memberHasPlans = (member, plans) => {
  console.log(member);
  console.log(plans);
  return plans.some((planId) =>
    member?.planConnections?.find((con) => con.planId === planId)
  );
};
