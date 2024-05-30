import { messagesRequests } from './messagesRequests';
import { ResponseError, EmptyValueError } from '@errors/errors';
import { main } from '@elements/domElements';
import type { RequestedData } from '@/messages/messagesRenderer';
import { initRenderMessagesInParts } from '@/messages/messagesRenderer';
import { successMessages } from '@constants/constants';
import { webSocketHandler } from '@/webSocket/webSocketHandler';
import { showAlert } from '@/utils/alerts';

const handleMessagesHistoryUpload = async () => {
  try {
    const messagesDataList: RequestedData[] = await messagesRequests.LoadMessageHistory();
    const { messagesList } = main;

    if (!messagesList) return;

    initRenderMessagesInParts(messagesDataList, messagesList);
    showAlert('success', successMessages.MESSAGE_HISTORY);
  } catch (error) {
    const typedError = error as ResponseError;
    if (typedError) {
      showAlert('error', typedError.message);
      console.error(typedError.message);
    }
  }
};

const handleSendMessage = (event: SubmitEvent) => {
  event.preventDefault();

  try {
    const newMessage = main.formTextArea?.value.trim();
    if (!newMessage) {
      throw new EmptyValueError();
    }

    const messageToSend = JSON.stringify({ text: newMessage });
    webSocketHandler.sendMessage(messageToSend);

    main.formTextArea?.focus();
  } catch (error) {
    const typedError = error as EmptyValueError | ResponseError;
    if (typedError) {
      showAlert('error', typedError.message);
      console.error(typedError.message);
    }
  } finally {
    main.form?.reset();
  }
};

const dispatchSendMessageEvent = (event: KeyboardEvent) => {
  const isEnterKey = event.key === 'Enter' && !event.shiftKey;
  if (isEnterKey) {
    event.preventDefault();
    const submitEvent = new Event('submit');
    main.form?.dispatchEvent(submitEvent);
  }
};

export const initMessageEvents = () => {
  main.form?.addEventListener('submit', handleSendMessage);
  main.form?.addEventListener('keydown', dispatchSendMessageEvent);
};

export { handleMessagesHistoryUpload };
