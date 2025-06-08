export const LAST_VISIT_URL =
  'chat-studio-last-visit-url';

export const getOIDCRedirectURL = (
  cloudFrontUrl: string,
  customDomain?: string,
) => {
  if (customDomain) {
    return customDomain?.toLocaleLowerCase()?.startsWith('localhost')
      ? `http://${customDomain}/signin`
      : `https://${customDomain}/signin`;
  } else {
    return cloudFrontUrl?.toLocaleLowerCase()?.startsWith('localhost')
      ? `http://${cloudFrontUrl}/signin`
      : `https://${cloudFrontUrl}/signin`;
  }
};