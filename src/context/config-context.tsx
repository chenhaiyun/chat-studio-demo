import React from 'react';

export interface Config {
  aws_apigateway_endpoint: string;
  aws_region: string;
  aws_oidc_provider: string;
  aws_oidc_client_id: string;
  aws_oidc_customer_domain: string;
  aws_cloudfront_url: string;
  aws_oidc_redirect_url: string;
  aws_oidc_logout_url: string;
}
const ConfigContext = React.createContext<Config | null>(null);
export default ConfigContext;
