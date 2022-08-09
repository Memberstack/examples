import React from "react";
import { useMemberstackModal } from "@memberstack/react";

const modalFactory = ({ type }) => {
  return function ModalComponent(props) {
    const { openModal, hideModal } = useMemberstackModal();
    React.useEffect(() => {
      openModal({
        type,
        planId: props.planId,
        priceId: props.priceId,
      }).then(({ data, type }) => hideModal());
    }, []);

    return null;
  };
};

export const SignInModal = modalFactory({ type: "LOGIN" });
export const SignUpModal = modalFactory({ type: "SIGNUP" });
export const ProfileModal = modalFactory({ type: "PROFILE" });
