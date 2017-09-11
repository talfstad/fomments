export default (env) => {
  switch (env) {
    case 'production':
      return ({
        MARKETING_URL: 'https://fomments.com',
        CDN_ROOT_URL: 'https://cdn.fomments.com',
        SECTIONS_ROOT_URL: 'https://sections.fomments.com',
        EXTERNAL_MESSAGE_NAMESPACE: 'fomments-external-message',
        EXTERNAL_RESPONSE_NAMESPACE: 'fomments-external-message-response',
      });
    default:
      return ({
        MARKETING_URL: 'https://fomments.com',
        CDN_ROOT_URL: 'http://localhost:3000',
        SECTIONS_ROOT_URL: 'http://localhost:3000',
        EXTERNAL_MESSAGE_NAMESPACE: 'fomments-external-message',
        EXTERNAL_RESPONSE_NAMESPACE: 'fomments-external-message-response',
      });
  }
};
