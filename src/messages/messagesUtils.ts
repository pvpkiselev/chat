import { cookiesKeys, errorMessages, messageClassType, urlTestRegex } from '@/constants/constants';
import { main } from '@elements/domElements';
import type { MessageRenderData, MessageTemplate } from './messages.types';
import { generateId, hideElement, showElement } from '@/utils/utils';
import { StorageError } from '@/errors/errors';
import { showAlert } from '@/utils/alerts';
import Cookies from 'js-cookie';

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

const makeTemplateMessage = (): MessageTemplate => {
  const templateMessage = main.templateMessage?.content.cloneNode(true) as DocumentFragment | null;

  const messageItem = templateMessage?.querySelector('.message') as HTMLElement | null;
  const messageName = templateMessage?.querySelector('.message__name') as HTMLElement | null;
  const messageText = templateMessage?.querySelector('.message__text') as HTMLElement | null;
  const messageTime = templateMessage?.querySelector('.message__time') as HTMLElement | null;

  return { messageItem, messageName, messageText, messageTime };
};

const getUrlType = (word: string): 'image' | 'link' | null => {
  const urlType = urlTestRegex.image.test(word) ? 'image' : urlTestRegex.link.test(word) ? 'link' : null;
  return urlType;
};

const processWord = (word: string, messageText: HTMLElement) => {
  const urlType = getUrlType(word);

  if (urlType === 'image') {
    const img = document.createElement('img');
    img.src = word;
    img.alt = 'Image';
    img.style.maxWidth = '100%';
    img.style.objectFit = 'cover';
    messageText.append(img);
  } else if (urlType === 'link') {
    const link = document.createElement('a');
    link.href = word;
    link.textContent = word;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    messageText.append(link);
  } else {
    messageText.append(document.createTextNode(word + ' '));
  }
};

const scrollToBottom = () => {
  const { messagesList } = main;
  messagesList?.scrollTo({
    top: messagesList.scrollHeight,
    behavior: 'smooth'
  });
};

const isNeedToScroll = () => {
  const { messagesList, scrollButton } = main;
  if (!messagesList || !scrollButton) return;

  const SCROLL_THRESHOLD = 0.1;

  const threshold = messagesList.scrollHeight * SCROLL_THRESHOLD;

  const isScrolledToBottom =
    messagesList.scrollTop + messagesList.clientHeight >= messagesList.scrollHeight - threshold;

  if (isScrolledToBottom) {
    hideElement(scrollButton);
  } else {
    showElement(scrollButton);
  }
};

main.scrollButton?.addEventListener('click', scrollToBottom);
main.messagesList?.addEventListener('scroll', isNeedToScroll);

export { createMessageItem, makeTemplateMessage, processWord, scrollToBottom, isNeedToScroll };
