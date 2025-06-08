import axios from 'axios';
import { User } from 'oidc-client-ts';
import { useContext } from 'react';
import ConfigContext from '../context/config-context';

function getUser(authority?: string, clientId?: string) {
  const oidcStorage = localStorage.getItem(
    `oidc.user:${authority}:${clientId}`,
  );
  if (!oidcStorage) {
    return null;
  }
  return User.fromStorageString(oidcStorage);
}

const useAxiosRequest = () => {
  const config = useContext(ConfigContext);
  const user = getUser(config?.aws_oidc_provider, config?.aws_oidc_client_id);
  const token = user?.id_token;
  const sendRequest = async ({
    url = '',
    method = 'get',
    data = null,
    headers = {},
    params = {},
  }: {
    url: string;
    method: 'get' | 'post' | 'put' | 'delete';
    data?: any;
    headers?: any;
    params?: any;
  }) => {
    try {
      const response = await axios({
        method: method,
        url: `${config?.aws_apigateway_endpoint}${url}`,
        data: data,
        params: params,
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(error)
      }
      throw error;
    }
  };
  return sendRequest;
};

export default useAxiosRequest;
