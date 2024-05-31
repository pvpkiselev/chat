import { urlTestRegex } from '@/constants/constants';
import { main } from '@elements/domElements';
import type { MessageTemplate } from './messages.types';

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

export { makeTemplateMessage, processWord };
