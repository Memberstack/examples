import React from "react";
import { useRouter } from "next/router";
import {
  MemberstackProtected,
  MemberstackProvider,
  SignInModal,
} from "@memberstack/react";
import useRestrictedUrls from "@/app/hooks/useRestrictedUrls";

const GatedURLContext = React.createContext(null);

// Hook that enables any component to subscribe to auth state
export const useAuth = () => {
  return React.useContext(GatedURLContext);
};

// AUTH CONTEXT PROVIDER //
export const GatedURLProvider = ({ children }) => {
  const memberstack = useMemberstack();
  const [auth, setAuth] = useState(null);

  const updateAuth = (member) => setAuth(member?.data);

  const signOut = useCallback(
    async () => await memberstack.logout(),
    [memberstack]
  );

  useEffect(() => {
    const authListener = memberstack.onAuthChange(updateAuth);
    memberstack.getCurrentMember().then((member) => {
      console.log(member);
      updateAuth(member);
    });
    return () => authListener.unsubscribe();
  }, []);

  const value = useMemo(() => ({ auth, signOut }), [auth, signOut]);

  return (
    <GatedURLContext.Provider value={value}>
      {children}
    </GatedURLContext.Provider>
  );
};
