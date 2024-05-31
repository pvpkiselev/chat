import { showAlert } from '@/utils/alerts';
import { cookiesKeys, successMessages } from '@constants/constants';
import type { PostData } from './requestHandler.types';
import Cookies from 'js-cookie';

class Request {
  async sendRequest(url: string, method: string, data?: PostData) {
    showAlert('info', successMessages.PENDING);

    const token = Cookies.get(cookiesKeys.token);

    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined
    });

    const isResponseOk = response.ok;
    const responseData = response.json();

    return { isResponseOk, responseData };
  }
}

export { Request };
