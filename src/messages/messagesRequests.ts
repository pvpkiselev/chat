import { Request } from '@requestHandlers/requestHandler';
import { apiUrl, errorMessages } from '@constants/constants';
import { ResponseError } from '@errors/errors';
import type { MessagesData } from './messages.types';

class MessagesRequests extends Request {
  async LoadMessageHistory() {
    const messagesHistoryPromise = await this.sendRequest(`${apiUrl}/messages`, 'GET');

    if (!messagesHistoryPromise.isResponseOk) {
      throw new ResponseError(`${errorMessages.MESSAGES}`);
    }

    const messagesData = (await messagesHistoryPromise.responseData) as MessagesData;
    const messagesDataList = messagesData.messages;

    return messagesDataList;
  }
}

export const messagesRequests = new MessagesRequests();
