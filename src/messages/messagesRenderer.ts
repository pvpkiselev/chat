import { createTimeStamp } from '@utils/utils';
import { main } from '@elements/domElements';
import { createMessageItem, scrollToBottom } from './messagesUtils';
import type { RequestedData, MessageRenderData } from './messages.types';

export const renderMessagesHistory = (messagesDataList: RequestedData[], messagesList: HTMLElement) => {
  const messagesListToRender = messagesDataList.map((messagesDataItem: RequestedData) => {
    const messagesRenderData = {
      name: messagesDataItem.user.name,
      email: messagesDataItem.user.email,
      message: messagesDataItem.text,
      time: createTimeStamp(messagesDataItem.createdAt)
    } as MessageRenderData;

    const message = createMessageItem(messagesRenderData);
    return message;
  }) as HTMLElement[];

  messagesList.prepend(...messagesListToRender);
};

const renderNewMessage = (messageData: RequestedData): void => {
  const { messagesList } = main;
  if (!messagesList) return;

  const messageRenderData = {
    name: messageData.user.name,
    email: messageData.user.email,
    message: messageData.text,
    time: createTimeStamp(messageData.createdAt)
  } as MessageRenderData;

  const message = createMessageItem(messageRenderData);
  if (message) {
    messagesList.append(message);
  }

  scrollToBottom();
};

export type { RequestedData };
export { renderNewMessage };
