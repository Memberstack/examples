import React from "react";
import { useMemberstackModal, useAuth } from "@memberstack/react";

const modalFactory = ({ type }) => {
  return function ModalComponent(props) {
    const { isLoggedIn } = useAuth();
    const { openModal, hideModal } = useMemberstackModal();

    React.useEffect(() => {
      openModal({
        type,
        planId: props.planId,
        priceId: props.priceId,
      }).then(({ data, type }) => {
        console.log(data);
        // analytics.identify("12091906-01011992", {
        //   name: "Grace Hopper",
        //   email: "grace@usnavy.gov",
        // });
        hideModal();
      });
    }, []);

    React.useEffect(() => {
      isLoggedIn && hideModal();
    }, [isLoggedIn]);

    return null;
  };
};

export const SignInModal = modalFactory({ type: "LOGIN" });
export const SignUpModal = modalFactory({ type: "SIGNUP" });
export const ProfileModal = modalFactory({ type: "PROFILE" });
