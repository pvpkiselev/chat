import { authorizationRequests } from './authorizationRequests';
import { userSettingsRequests } from '@userSettings/userSettingsRequests';
import { EmptyValueError, ResponseError, StorageError } from '@errors/errors';
import { successMessages, errorMessages, cookiesKeys } from '@constants/constants';
import { openModal, closeModal } from '@utils/utils';
import { auth, confirm } from '@elements/domElements';
import { webSocketHandler } from '@/webSocket/webSocketHandler';
import { checkUserNameUI } from '@/userSettings/userSettingsHandlers';
import Cookies from 'js-cookie';
import { showAlert } from '@/utils/alerts';

export const handleLogIn = async () => {
  try {
    const token = Cookies.get(cookiesKeys.token);

    if (!token) {
      throw new StorageError();
    }

    initializeUserSession(token);
  } catch (error) {
    const typedError = error as ResponseError | StorageError;
    if (typedError) {
      showAlert('error', typedError.message);
      openModal(auth.modal);
      console.error(typedError.message);
    } else {
      showAlert('error', errorMessages.UNKNOWN);
      console.error(errorMessages.UNKNOWN);
    }
  }
};

const handleAuthorizationRequest = async (event: SubmitEvent) => {
  event.preventDefault();
  try {
    const emailToSendCode = auth.input?.value?.trim();

    if (!emailToSendCode) {
      throw new EmptyValueError();
    }

    await authorizationRequests.makeAuthorizationRequest(emailToSendCode);

    showAlert('success', `${successMessages.CODE_SUCCESS} ${emailToSendCode}`);
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
    auth.form?.reset();
  }
};

const handleConfirmation = async (event: SubmitEvent) => {
  event.preventDefault();
  try {
    const newToken = confirm.input?.value?.trim();

    if (!newToken) {
      throw new EmptyValueError();
    }

    Cookies.set(cookiesKeys.token, newToken);

    initializeUserSession(newToken);

    if (confirm.modal) {
      closeModal(confirm.modal);
    }

    showAlert('success', successMessages.AUTH_SUCCESS);
  } catch (error) {
    const typedError = error as EmptyValueError | ResponseError;
    if (typedError) {
      Cookies.remove(cookiesKeys.token);
      showAlert('error', typedError.message);
      openModal(auth.modal);
      console.error(typedError.message);
    } else {
      showAlert('error', errorMessages.UNKNOWN);
      console.error(errorMessages.UNKNOWN);
    }
  } finally {
    confirm.form?.reset();
  }
};

const handleLogOut = () => {
  Cookies.remove(cookiesKeys.token);
  Cookies.remove(cookiesKeys.email);
  Cookies.remove(cookiesKeys.name);

  const isManual = true;
  webSocketHandler.closeSocket(isManual);

  showAlert('success', successMessages.SIGN_OUT);

  if (auth.modal) openModal(auth.modal);
};

const handleModalChange = () => {
  if (!auth.modal || !confirm.modal) return;

  if (auth.modal?.classList.contains('show')) {
    closeModal(auth.modal);
    openModal(confirm.modal);
  } else {
    closeModal(confirm.modal);
    openModal(auth.modal);
  }
};

const initializeUserSession = async (token: string) => {
  try {
    await userSettingsRequests.getUserInfo();
    webSocketHandler.init(token);
    checkUserNameUI();
  } catch (error) {
    const typedError = error as ResponseError;
    if (typedError) {
      Cookies.remove(cookiesKeys.token);
      showAlert('error', typedError.message);
      openModal(auth.modal);
      console.error(typedError.message);
    }
  }
};

export const initAuthorizationEvents = () => {
  auth.LogOutButton?.addEventListener('click', handleLogOut);
  auth.form?.addEventListener('submit', handleAuthorizationRequest);
  auth.enterButton?.addEventListener('click', handleModalChange);
  confirm.backButton?.addEventListener('click', handleModalChange);
  confirm.form?.addEventListener('submit', handleConfirmation);
};
