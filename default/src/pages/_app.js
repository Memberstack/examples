import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  MemberstackProtected,
  MemberstackProvider,
  SignInModal,
} from "@memberstack/react";
import useRestrictedUrls from "../hooks/useRestrictedUrls";
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
  let { isRestricted, urlInfo } = useRestrictedUrls(router.pathname);

  useEffect(() => {
    console.log(isRestricted, urlInfo);
    // isRestricted && router.push(`/${redirectPath}`);
  }, []);

  if (!isRestricted) {
    return <Component {...pageProps} />;
  }

  return (
    <MemberstackProtected
      // allow={
      //   allowAllMembers
      //     ? undefined
      //     : {
      //         plans: plansRequired,
      //       }
      // }
      onUnauthorized={<SignInModal />}
    >
      <Component {...pageProps} />
    </MemberstackProtected>
  );
};

export default withProviders(App);
