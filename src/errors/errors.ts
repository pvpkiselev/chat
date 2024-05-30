import { cookiesKeys, errorMessages } from '@constants/constants';

class EmptyValueError extends Error {
  constructor() {
    super(`${errorMessages.EMPTY}`);
    this.name = 'EmptyValueError';
  }
}

class ResponseError extends Error {
  constructor(message: string) {
    super(`${errorMessages.REQUEST} ${message}`);
    this.name = 'ResponseError';
  }
}

class StorageError extends Error {
  constructor(message: string = cookiesKeys.token) {
    super(`${errorMessages.STORAGE} ${message}`);
    this.name = 'StorageError';
  }
}

export { EmptyValueError, ResponseError, StorageError };
