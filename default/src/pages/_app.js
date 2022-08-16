import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  MemberstackProtected,
  MemberstackProvider,
  SignInModal,
} from "@memberstack/react";
import useRestrictedURLs from "@/app/hooks/useRestrictedURLs";
import "@/app/styles.css";

const msConfig = { publicKey: process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY };

export function withProviders(AppComponent) {
  return function WrappedApp(props) {
    return (
      <MemberstackProvider config={msConfig}>
        <AppComponent {...props} />
      </MemberstackProvider>
    );
  };
}

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isRestricted, config] = useRestrictedURLs(router.pathname);

  useEffect(() => {
    console.log(config);
  }, [config]);

  if (!isRestricted) {
    return <Component {...pageProps} />;
  }

  if (isRestricted && config?.allowAllMembers) {
    return (
      <MemberstackProtected onUnauthorized={<SignInModal />}>
        <Component {...pageProps} />
      </MemberstackProtected>
    );
  }

  return (
    <MemberstackProtected onUnauthorized={<SignInModal />}>
      <Component {...pageProps} />
    </MemberstackProtected>
  );
};

export default withProviders(App);
