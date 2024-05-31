// messagesRenderer Types

interface RequestedData {
  createdAt: string;
  text: string;
  user: User;
}

interface User {
  email: string;
  name: string;
}

interface MessageRenderData {
  name: string;
  message: string;
  time: string;
  email: string;
}

interface RenderState {
  currentStart: number;
  loading: boolean;
}

interface RenderMessagesOptions {
  messagesDataList: RequestedData[];
  messagesList: HTMLElement;
  partSize: number;
  renderState: RenderState;
}

// messagesRequests Types

type MessagesData = {
  messages: [];
};

// messagesUtils Types

interface MessageTemplate {
  messageItem: HTMLElement | null;
  messageName: HTMLElement | null;
  messageText: HTMLElement | null;
  messageTime: HTMLElement | null;
}

export type {
  RequestedData,
  User,
  MessageRenderData,
  RenderState,
  RenderMessagesOptions,
  MessagesData,
  MessageTemplate
};
