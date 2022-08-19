import { useState, useEffect } from "react";
import useApp from "@/app/hooks/useApp";
import { RestrictedURLGroup } from "@/app/helpers/restrictedUrlGroup";

export default function useRestrictedURLs(currentPath) {
  const app = useApp();
  const [isRestricted, setIsRestricted] = useState(false);
  const [plans, setPlans] = useState([]);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (!app) return;
    let restrictedUrls = app?.contentGroups;
    let urlGroup = new RestrictedURLGroup(restrictedUrls, currentPath);
    setIsRestricted(urlGroup?.isRestricted() ? true : false);
    setPlans(urlGroup?.plans || []);
    setInfo(urlGroup?.info || null);
  }, [app]);

  return [
    isRestricted,
    {
      ...info,
      plans,
    },
  ];
}
