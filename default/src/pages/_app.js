import { useRouter } from "next/router";
import { MemberstackProtected, MemberstackProvider } from "@memberstack/react";
import { AnalyticsProvider } from "@/app/context/AnalyticsProvider";
import { SignInModal } from "@/app/components/modalFactory";
import useRestrictedURLs from "@/app/hooks/useRestrictedURLs";
import "@/app/css/tailwind.css";

const msConfig = { publicKey: process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY };

export function withProviders(AppComponent) {
  return function WrappedApp(props) {
    return (
      <MemberstackProvider config={msConfig}>
        <AnalyticsProvider>
          <AppComponent {...props} />
        </AnalyticsProvider>
      </MemberstackProvider>
    );
  };
}

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isRestricted, config] = useRestrictedURLs(router.pathname);

  return (
    <>
      {isRestricted ? (
        <MemberstackProtected onUnauthorized={<SignInModal />}>
          {!config?.allowAllMembers && config?.plans.length > 0 ? (
            <Component
              {...pageProps}
              accessLevel={"specific_plans"}
              requiredPlans={config?.plans}
            />
          ) : (
            <Component {...pageProps} accessLevel={"authenticated_members"} />
          )}
        </MemberstackProtected>
      ) : (
        <Component {...pageProps} accessLevel={"public"} />
      )}
    </>
  );
};

export default withProviders(App);
