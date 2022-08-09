import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import moment from "moment";
import {
  MemberstackProtected,
  MemberstackProvider,
  SignInModal,
  useMember,
} from "@memberstack/react";
import { IntercomProvider, useIntercom } from "react-use-intercom";
import "@/app/styles.css";

const publicPages = ["/signup"];
const msConfig = { publicKey: process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY };

export function withProviders(AppComponent) {
  return function WrappedApp(props) {
    return (
      <IntercomProvider appId={process.env.NEXT_PUBLIC_INTERCOM_ID} autoBoot>
        <MemberstackProvider config={msConfig}>
          <AppComponent {...props} />
        </MemberstackProvider>
      </IntercomProvider>
    );
  };
}

const App = ({ Component, pageProps }) => {
  const { boot, hide, show, startTour, update } = useIntercom();
  const router = useRouter();
  const { member } = useMember();

  const isAdminRoute = router.pathname.startsWith("/admin");

  const updateWithProps = () =>
    update({
      app_id: process.env.NEXT_PUBLIC_INTERCOM_ID,
      name: "Nicolas", // Full name
      email: member.auth.email,
      user_id: member.id,
      created_at: moment().unix(),
    });

  useEffect(() => {
    member && updateWithProps();
  }, [member]);

  if (publicPages.includes(router.pathname)) {
    return <Component {...pageProps} />;
  }

  return (
    <MemberstackProtected onUnauthorized={<SignInModal />}>
      {isAdminRoute ? (
        <MemberstackProtected
          allow={{
            permissions: ["is:admin"],
          }}
          onUnauthorized={<p>You are not authorized to view this page.</p>}
        >
          <Component {...pageProps} />
        </MemberstackProtected>
      ) : (
        <Component {...pageProps} />
      )}
    </MemberstackProtected>
  );
};

export default withProviders(App);
