import { errorMessages, apiUrl } from '@constants/constants';
import { ResponseError } from '@errors/errors';
import { Request } from '@requestHandlers/requestHandler';

class AuthorizationRequests extends Request {
  async makeAuthorizationRequest(emailToSendCode: string) {
    const objectToRequest = { email: emailToSendCode };

    const authRequest = await this.sendRequest(`${apiUrl}/user`, 'POST', objectToRequest);

    if (!authRequest.isResponseOk) {
      throw new ResponseError(`${errorMessages.REQUEST}`);
    }
  }
}

export const authorizationRequests = new AuthorizationRequests();
