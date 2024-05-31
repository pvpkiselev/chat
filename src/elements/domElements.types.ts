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

export type { Settings, Auth, Confirm, Warning, Main };
