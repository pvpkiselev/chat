import type { RequestedData } from '@/messages/messagesRenderer';
import { renderNewMessage } from '@/messages/messagesRenderer';
import { ResponseError, StorageError } from '@errors/errors';
import { cookiesKeys, errorMessages, webSocketMessages, wssUrl } from '@constants/constants';
import { showConnectionStatus } from './webSocketUtils';
import { handleMessagesHistoryUpload } from '@/messages/messagesHandlers';
import Cookies from 'js-cookie';
import { showAlert } from '@/utils/alerts';

class WebSocketHandler {
  private webSocket: WebSocket | null = null;
  private wssUrl: string;
  public webSocketStatus: boolean = false;
  private manualClose: boolean = false;

  constructor(wssUrl: string) {
    this.wssUrl = wssUrl;
  }

  public init(token: string | null) {
    if (!token) return;

    this.webSocket = new WebSocket(`${this.wssUrl}?${token}`);
    this.initEventHandlers();
  }

  private initEventHandlers() {
    if (!this.webSocket) return;

    this.webSocket.onopen = () => this.handleOpen();
    this.webSocket.onmessage = (event: MessageEvent<string>) => this.handleMessage(event);
    this.webSocket.onclose = (event: CloseEvent) => this.handleClose(event);

    this.webSocketStatus = true;
  }

  private handleOpen() {
    showAlert('info', webSocketMessages.CONNECT);
    handleMessagesHistoryUpload();

    console.log(`${webSocketHandler.webSocketStatus}: onopen`);

    showConnectionStatus(this.webSocketStatus);
  }

  private handleMessage(event: MessageEvent<string>) {
    try {
      if (!event.data) {
        throw new ResponseError(webSocketMessages.MESSAGE_ERROR);
      }

      const messageData = JSON.parse(event.data) as RequestedData;

      if (!messageData) {
        throw new ResponseError(webSocketMessages.PARSE_ERROR);
      }

      renderNewMessage(messageData);
    } catch (error) {
      const typedError = error as ResponseError;
      if (typedError) {
        showAlert('error', typedError.message);
        console.error(typedError.message);
      }
    }
  }

  private handleClose(event: CloseEvent) {
    showAlert('error', `${webSocketMessages.CONNECTION_CLOSE} ${event.reason}`);

    this.webSocketStatus = false;

    console.log(`${webSocketHandler.webSocketStatus}: onclose`);

    showConnectionStatus(this.webSocketStatus);

    try {
      if (!this.manualClose) {
        const token = Cookies.get(cookiesKeys.token);
        if (!token) {
          throw new StorageError(errorMessages.STORAGE);
        }

        this.init(token);
      }
    } catch (error) {
      const typedError = error as StorageError;
      if (typedError) {
        showAlert('error', typedError.message);
        console.error(typedError.message);
      }
    }
  }

  public sendMessage(message: string) {
    if (!message) return;

    if (!this.webSocketStatus) {
      throw new ResponseError(webSocketMessages.CONNECTION_CLOSE);
    }

    const token = Cookies.get(cookiesKeys.token);
    if (!token) {
      throw new StorageError(errorMessages.MESSAGES);
    }

    this.webSocket?.send(message);
  }

  public closeSocket(isManual: boolean = false) {
    if (!this.webSocket) return;
    this.manualClose = isManual;

    const reasonCode = 1000;
    this.webSocket?.close(reasonCode, webSocketMessages.LOGOUT);
  }
}

export const webSocketHandler = new WebSocketHandler(wssUrl);
