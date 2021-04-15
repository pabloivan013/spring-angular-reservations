import { domain, clientId, audience, serverUrl } from '../../auth_config.json';

export const auth = {
      domain,
      clientId,
      redirectUri: window.location.origin,
      audience,
}