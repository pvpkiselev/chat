import { main, settings } from '@elements/domElements';
import { openModal, closeModal } from '@utils/utils';
import { userSettingsRequests } from './userSettingsRequests';
import { successMessages, errorMessages, cookiesKeys } from '@constants/constants';
import { EmptyValueError, ResponseError } from '@errors/errors';
import { webSocketHandler } from '@/webSocket/webSocketHandler';
import Cookies from 'js-cookie';
import { showAlert } from '@/utils/alerts';

const handleSettingsOpenButton = () => {
  if (!settings.modal) return;
  openModal(settings.modal);
};

const handleSettingsClose = (event: MouseEvent) => {
  const { target } = event;
  const closeModalTarget = target === settings.modal || target === settings.closeButton;
  if (!closeModalTarget || !settings.modal) return;
  closeModal(settings.modal);
};

const handleSettingsChangeName = async (event: SubmitEvent) => {
  event.preventDefault();

  try {
    const newName = settings.input?.value?.trim() as string;
    if (!newName) {
      throw new EmptyValueError();
    }

    await userSettingsRequests.updateUserName(newName);
    await userSettingsRequests.getUserInfo();

    checkUserNameUI();
    webSocketHandler.closeSocket();

    showAlert('success', `${successMessages.NAME_SUCCESS} ${newName}`);
  } catch (error) {
    const typedError = error as EmptyValueError | ResponseError;
    if (typedError) {
      showAlert('error', typedError.message);
      console.error(typedError.message);
    } else {
      showAlert('error', errorMessages.UNKNOWN);
      console.error(errorMessages.UNKNOWN);
    }
  } finally {
    settings.form?.reset();
  }
};

export const checkUserNameUI = () => {
  const userName = Cookies.get(cookiesKeys.name);
  if (!userName || !main.connectionUserName) return;

  main.connectionUserName.textContent = userName;
};

export const initChangeNameEvents = () => {
  settings.openButton?.addEventListener('click', handleSettingsOpenButton);
  settings.modal?.addEventListener('click', handleSettingsClose);
  settings.form?.addEventListener('submit', handleSettingsChangeName);
};
