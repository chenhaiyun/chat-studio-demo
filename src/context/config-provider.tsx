import React, { useState, useEffect } from 'react';
import ConfigContext, { Config } from './config-context';
import axios from 'axios';
import { getOIDCRedirectURL } from 'src/assets/utils';

interface ConfigProviderProps {
  children: React.ReactNode;
}

const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        // get system configuration
        const resConfig = await axios.get('/aws-exports.json');
        const configData = resConfig.data as Config;
        await axios
          .get(
            `${configData.aws_oidc_provider}/.well-known/openid-configuration`,
          )
          .then((oidcRes: any) => {
            configData.aws_oidc_logout_url = oidcRes.data.end_session_endpoint;
            configData.aws_oidc_redirect_url = getOIDCRedirectURL(
              configData.aws_cloudfront_url,
              configData.aws_oidc_customer_domain,
            );
            setConfig(resConfig.data);
          });
      } catch (error) {
        console.error('error:', error);
      }
    };
    fetchConfig();
  }, []);

  if (!config) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold mr-3">
              CS
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Chat Studio</h2>
          </div>
          <div className="flex justify-center space-x-2 px-4 py-2">
            <div className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div
              className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export default ConfigProvider;
