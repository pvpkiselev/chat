type Settings = {
  modal: HTMLElement | null;
  form: HTMLFormElement | null;
  input: HTMLInputElement | null;
  openButton: HTMLButtonElement | null;
  closeButton: HTMLButtonElement | null;
  themeToggle: HTMLButtonElement | null;
};

type Auth = {
  modal: HTMLElement | null;
  form: HTMLFormElement | null;
  input: HTMLInputElement | null;
  sendButton: HTMLButtonElement | null;
  enterButton: HTMLButtonElement | null;
  LogOutButton: HTMLButtonElement | null;
};

type Confirm = {
  modal: HTMLElement | null;
  form: HTMLFormElement | null;
  input: HTMLInputElement | null;
  enterButton: HTMLButtonElement | null;
  backButton: HTMLButtonElement | null;
};

type Warning = {
  modal: HTMLDialogElement | null;
  messageWarning: HTMLElement | null;
  closeButton: HTMLButtonElement | null;
};

type Main = {
  chatWrapper: HTMLElement | null;
  messagesList: HTMLElement | null;
  form: HTMLFormElement | null;
  formTextArea: HTMLTextAreaElement | null;
  templateMessage: HTMLTemplateElement | null;
  scrollButton: HTMLButtonElement | null;
  connectionStatus: HTMLElement | null;
  connectionUserName: HTMLElement | null;
};

const settings: Settings = {
  modal: document.querySelector('#modalSettings'),
  form: document.querySelector('#modalSettingsForm'),
  input: document.querySelector('#modalSettingsInput'),
  openButton: document.querySelector('#openSettingsButton'),
  closeButton: document.querySelector('#closeSettingsButton'),
  themeToggle: document.querySelector('#ThemeToggle')
};

const auth: Auth = {
  modal: document.querySelector('#modalAuthorization'),
  form: document.querySelector('#modalAuthorizationForm'),
  input: document.querySelector('#modalAuthorizationInput'),
  sendButton: document.querySelector('#modalAuthorizationSendButton'),
  enterButton: document.querySelector('#modalAuthorizationEnterCode'),
  LogOutButton: document.querySelector('#LogOutButton')
};

const confirm: Confirm = {
  modal: document.querySelector('#modalConfirmation'),
  form: document.querySelector('#modalConfirmationForm'),
  input: document.querySelector('#modalConfirmationInput'),
  enterButton: document.querySelector('#modalConfirmationEnterButton'),
  backButton: document.querySelector('#modalConfirmationBackButton')
};

const warning: Warning = {
  modal: document.querySelector('#modalWarning'),
  messageWarning: document.querySelector('#modalWarningMessage'),
  closeButton: document.querySelector('#closeWarningButton')
};

const main: Main = {
  chatWrapper: document.querySelector('.chat'),
  messagesList: document.querySelector('.messages-list'),
  form: document.querySelector('.form'),
  formTextArea: document.querySelector('.form__textarea'),
  templateMessage: document.querySelector('#templateMessage'),
  scrollButton: document.querySelector('#ScrollButton'),
  connectionStatus: document.querySelector('#ConnectionStatus'),
  connectionUserName: document.querySelector('#ConnectionUserName')
};

export type { Warning };
export { settings, auth, confirm, warning, main };
