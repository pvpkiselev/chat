import { showAlert } from '@/utils/alerts';
import { cookiesKeys, successMessages } from '@constants/constants';
import Cookies from 'js-cookie';

type PostData = {
  email?: string;
  name?: string;
  message?: string;
};

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
