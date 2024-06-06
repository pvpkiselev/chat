import { main } from '@/elements/domElements';
import { messagesStateManager } from './messagesStateManager';
import { showAlert } from '@/utils/alerts';
import { renderMessages } from '@/constants/constants';
import type { RequestedData } from './messages.types';
import { renderMessagesHistory } from './messagesRenderer';
import { messagesRequests } from './messagesRequests';

let currentStart = 0;
const partSize = 20;

const handleScrollForLazyLoading = () => {
  const { messagesList } = main;
  if (!messagesList) return;

  const messagesDataList = messagesStateManager.getMessagesDataList();

  const isNeedToLoadMore = messagesList.scrollTop <= 0 && currentStart < messagesDataList.length;

  if (isNeedToLoadMore) {
    loadMoreMessages(messagesDataList, messagesList);
  } else if (currentStart >= messagesDataList.length) {
    messagesList.removeEventListener('scroll', handleScrollForLazyLoading);
    showAlert('success', renderMessages.END);
  }
};

const loadMoreMessages = (messagesDataList: RequestedData[], messagesList: HTMLElement | null) => {
  if (!messagesList) return;

  const nextPartSize = currentStart + partSize;
  const nextPart = messagesDataList.slice(currentStart, nextPartSize).reverse();

  const previousHeight = messagesList.scrollHeight;
  renderMessagesHistory(nextPart, messagesList);
  const newHeight = messagesList.scrollHeight;
  messagesList.scrollTop = newHeight - previousHeight;

  currentStart += partSize;

  showAlert('info', renderMessages.LOADING);
};

const fetchAndLazyLoadMessages = async () => {
  messagesStateManager.setMessagesDataList(await messagesRequests.LoadMessageHistory());
  handleScrollForLazyLoading();
};

main.messagesList?.addEventListener('scroll', handleScrollForLazyLoading);

export { fetchAndLazyLoadMessages };
