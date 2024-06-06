import type { RequestedData } from './messages.types';

class StateManager {
  private messagesDataList: RequestedData[] = [];

  getMessagesDataList(): RequestedData[] {
    return this.messagesDataList;
  }

  setMessagesDataList(newData: RequestedData[]): void {
    this.messagesDataList = newData;
  }
}

export const messagesStateManager = new StateManager();
