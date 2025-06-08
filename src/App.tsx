import "./App.css";
import { useContext } from "react";
import ConfigContext from "./context/config-context";
import { WebStorageStateStore } from "oidc-client-ts";
import { getOIDCRedirectURL } from "./assets/utils";
import { AuthProvider } from "react-oidc-context";
import AppRouter from "./Router";

function App() {
  const config = useContext(ConfigContext);
  const oidcConfig = {
    userStore: new WebStorageStateStore({ store: window.localStorage }),
    scope: "openid email profile",
    automaticSilentRenew: true,
    authority: config?.aws_oidc_provider,
    client_id: config?.aws_oidc_client_id,
    redirect_uri: getOIDCRedirectURL(
      config?.aws_cloudfront_url ?? "",
      config?.aws_oidc_customer_domain
    ),
  };
  return (
    <AuthProvider {...oidcConfig}>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;
