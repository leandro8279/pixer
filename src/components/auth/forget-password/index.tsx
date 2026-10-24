import { Observer } from "mobx-react-lite";
import React from "react";
import { useTranslation } from "react-i18next";

import { RenderComponent } from "@/components/common/render-component";
import { Alert } from "@/components/ui/alert";
import { useRootStore } from "@/contexts/root";

import { EnterEmailView } from "../enter-email-view";
import { useForgotPasswordForm } from "./useForgotPasswordForm";

export function ForgotPasswordForm() {
  const { t } = useTranslation();
  const auth = useRootStore("auth");
  const state = useForgotPasswordForm();

  return (
    <React.Fragment>
      <Observer>
        {() => (
          <RenderComponent conditional={auth.errorMessage}>
            <Alert variant="error" message={t(auth.errorMessage)} className="mb-6" closeable={true} onClose={() => auth.setErrorMessage("")} />
          </RenderComponent>
        )}
      </Observer>

      <Observer>
        {() => (
          <RenderComponent conditional={!auth.verifiedEmail}>
            <EnterEmailView loading={auth.forgetPassword.isLoading} onSubmit={state.handleEmailSubmit} />
          </RenderComponent>
        )}
      </Observer>

      {/* <RenderComponent conditional={auth.verifiedEmail && !auth.verifiedToken}>
        <EnterTokenView loading={verifying} onSubmit={state.handleTokenSubmit} />
      </RenderComponent>

      <RenderComponent conditional={verifiedEmail && verifiedToken}>
        <EnterNewPasswordView loading={resetting} onSubmit={state.handleResetPassword} />
      </RenderComponent> */}
    </React.Fragment>
  );
}
