import { messageClassType, cookiesKeys, renderMessages, errorMessages } from '@constants/constants';
import { generateId, createTimeStamp, scrollToBottom } from '@utils/utils';
import { main } from '@elements/domElements';
import { makeTemplateMessage, processWord } from './messagesUtils';
import Cookies from 'js-cookie';
import { StorageError } from '@/errors/errors';
import { showAlert } from '@/utils/alerts';
import type { RequestedData, MessageRenderData, RenderState, RenderMessagesOptions } from './messages.types';

const createMessageItem = (messagesRenderData: MessageRenderData): HTMLElement | null => {
  try {
    const { messageItem, messageName, messageText, messageTime } = makeTemplateMessage();

    const isMessageTemplate = messageItem && messageName && messageText && messageTime;

    if (isMessageTemplate) {
      const { name, email, message, time } = messagesRenderData;

      const userEmail = Cookies.get(cookiesKeys.email);
      if (!userEmail) {
        throw new StorageError(errorMessages.MESSAGES);
      }

      const messageItemClassName = email === userEmail ? messageClassType.OUT : messageClassType.IN;

      messageItem.classList.add(messageItemClassName);
      messageItem.setAttribute('data-id', generateId());
      messageName.textContent = name;
      messageTime.textContent = time;

      const words = message.split(' ');

      words.forEach((word) => processWord(word, messageText));

      return messageItem;
    }
  } catch (error) {
    const typedError = error as StorageError;
    if (typedError) {
      showAlert('error', typedError.message);
      console.error(typedError.message);
    }
  }

  return null;
};

const renderMessagesHistory = (messagesDataList: RequestedData[], messagesList: HTMLElement) => {
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

const initRenderMessagesInParts = (messagesDataList: RequestedData[], messagesList: HTMLElement) => {
  const partSize = 20;

  const renderState: RenderState = {
    currentStart: 0,
    loading: false
  };

  const renderMessagesOptions: RenderMessagesOptions = {
    messagesDataList,
    messagesList,
    partSize,
    renderState
  };

  if (messagesList) {
    messagesList.innerHTML = '';

    const initialPart = messagesDataList.slice(renderState.currentStart, renderState.currentStart + partSize).reverse();
    renderMessagesHistory(initialPart, messagesList);
    renderState.currentStart += partSize;

    messagesList.scrollTop = messagesList.scrollHeight;

    const lazyLoadingMessages = createClosureLazyLoading(renderMessagesOptions);

    messagesList.addEventListener('scroll', lazyLoadingMessages);
  }
};

const createClosureLazyLoading = ({ messagesDataList, messagesList, partSize, renderState }: RenderMessagesOptions) => {
  return function lazyLoadingMessages() {
    if (renderState.loading) return;

    const isNeedToLoadMore = messagesList.scrollTop <= 0 && renderState.currentStart < messagesDataList.length;

    if (isNeedToLoadMore) {
      renderState.loading = true;

      const nextPartSize = renderState.currentStart + partSize;
      const nextPart = messagesDataList.slice(renderState.currentStart, nextPartSize).reverse();

      const previousHeight = messagesList.scrollHeight;
      renderMessagesHistory(nextPart, messagesList);
      const newHeight = messagesList.scrollHeight;
      messagesList.scrollTop = newHeight - previousHeight;

      renderState.currentStart += partSize;
      renderState.loading = false;

      showAlert('info', renderMessages.LOADING);
    } else if (renderState.currentStart >= messagesDataList.length) {
      messagesList.removeEventListener('scroll', lazyLoadingMessages);
      showAlert('success', renderMessages.END);
    }
  };
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
export { renderNewMessage, initRenderMessagesInParts };
