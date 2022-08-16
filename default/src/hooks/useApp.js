import { useState, useEffect } from "react";
import { useMemberstack } from "@memberstack/react";

export default function useApp() {
  const memberstack = useMemberstack();
  const [app, setApp] = useState(null);

  useEffect(() => {
    memberstack.getApp().then(({ data }) => setApp(data ? data : null));
  }, []);

  return app;
}
