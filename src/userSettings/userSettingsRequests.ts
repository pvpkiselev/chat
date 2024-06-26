import { apiUrl, errorMessages, cookiesKeys } from '@constants/constants';
import { ResponseError } from '@errors/errors';
import { Request } from '@requestHandlers/requestHandler';
import type { UserInfo } from './userSettings.types';
import Cookies from 'js-cookie';

class UserSettingsRequests extends Request {
  async updateUserName(newName: string) {
    const objectToRequest = { name: newName };

    const updateNamePromise = await this.sendRequest(`${apiUrl}/user`, 'PATCH', objectToRequest);

    if (!updateNamePromise.isResponseOk) {
      throw new ResponseError(`${errorMessages.CHANGE_NAME_REQUEST}`);
    }
  }

  async getUserInfo() {
    const userInfoPromise = await this.sendRequest(`${apiUrl}/user/me`, 'GET');

    if (!userInfoPromise.isResponseOk) {
      throw new ResponseError(`${errorMessages.UNKNOWN_USER}`);
    }

    const userInfo = (await userInfoPromise.responseData) as UserInfo;

    this.setUserInfoToCookies(userInfo);
  }

  setUserInfoToCookies(userInfo: UserInfo) {
    const { name, email, token } = userInfo;
    const isDataExist = userInfo && name && email && token;
    if (!isDataExist) return;

    Cookies.set(cookiesKeys.name, name, { expires: 1 });
    Cookies.set(cookiesKeys.email, email, { expires: 1 });
    Cookies.set(cookiesKeys.token, token, { expires: 1 });
  }
}

export const userSettingsRequests = new UserSettingsRequests();
