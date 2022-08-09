import { useEffect, useState } from "react";
import { useMemberstack } from "@memberstack/react";

export default function useRestrictedUrls(currentPath) {
  const memberstack = useMemberstack();
  const [isRestricted, setIsRestricted] = useState(true);
  const [urlInfo, setUrlInfo] = useState({});

  const getStatusByFilter = (filter, url, currentPath) => {
    let formattedUrl = `/${url}`;
    return filter === "EQUALS"
      ? formattedUrl === currentPath
      : currentPath.startsWith(formattedUrl);
  };

  const getRestrictedUrlInfo = (restrictedUrls, currentPath) => {
    const restrictedUrlInfo = restrictedUrls.find((urlGroup) => {
      const urlMatch = urlGroup.urls.find((url) => {
        return getStatusByFilter(url.filter, url.url, currentPath);
      });
      return urlMatch;
    });
    return restrictedUrlInfo;
    // let plans = restrictedUrlInfo?.plans.map((plan) => plan.id);
    // setPlansRequired(plans);
  };

  const checkIsRestricted = (restrictedUrls, currentPath) => {
    return restrictedUrls.some((restrictedUrl) => {
      return restrictedUrl.urls.some((url) => {
        return getStatusByFilter(url.filter, url.url, currentPath);
      });
    });
  };

  useEffect(() => {
    memberstack.getRestrictedUrlGroups().then(({ data: restrictedUrls }) => {
      console.log(restrictedUrls);
      let pageRestricted = checkIsRestricted(restrictedUrls, currentPath);
      let info = getRestrictedUrlInfo(restrictedUrls, currentPath);
      console.log(info, pageRestricted);
      setIsRestricted(pageRestricted);
      setUrlInfo(info);
    });
  }, [currentPath]);

  return { isRestricted, urlInfo };
}
