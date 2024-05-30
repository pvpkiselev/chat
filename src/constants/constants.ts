const messageClassType = {
  IN: 'message-in',
  OUT: 'message-out'
};

const successMessages = {
  CODE_SUCCESS: 'Код успешно отправлен на адрес',
  AUTH_SUCCESS: 'Успешная Авторизация',
  SIGN_OUT: 'Выход из системы выполнен',
  MESSAGE_HISTORY: 'История загружена',
  NAME_SUCCESS: 'Имя успешно изменено на',
  PENDING: 'Делаем запрос…',
  REQUEST_SUCCESS: 'Запрос выполнен успешно'
};

const errorMessages = {
  UNKNOWN: 'Произошла неизвестная ошибка',
  REQUEST: 'Ошибка запроса',
  EMPTY: 'Значение не может быть пустым',
  MESSAGES: 'Ошибка загрузки сообщений',
  CHANGE_NAME_REQUEST: 'Ошибка при смене имени',
  UNKNOWN_USER: 'Данные о пользователе отсутствуют',
  STORAGE: 'Значение не найдено в хранилище'
};

const cookiesKeys = {
  name: 'name',
  email: 'email',
  token: 'token'
};

const webSocketMessages = {
  CONNECT: 'Соединение установлено',
  CONNECTION_CLOSE: 'Соединение закрыто',
  LOGOUT: 'Выход',
  MESSAGE_ERROR: 'Ошибка загрузки сообщения',
  PARSE_ERROR: 'Ошибка парсинга сообщения',
  ONLINE: 'connect',
  OFFLINE: 'disconnect'
};

const renderMessages = {
  LOADING: 'Загружаем ещё сообщения',
  END: 'Все сообщения загружены'
};

const storageTheme = {
  themeTitle: 'theme',
  dark: 'dark',
  light: 'light'
};

const urlTestRegex = {
  link: /(https?:\/\/[^\s]+)/g,
  image: /\.(jpg|jpeg|png|gif|svg)$/i
};

const apiUrl = import.meta.env.VITE_API_URL as string;
const wssUrl = import.meta.env.VITE_WSS_URL as string;

export {
  messageClassType,
  successMessages,
  errorMessages,
  apiUrl,
  wssUrl,
  cookiesKeys,
  webSocketMessages,
  renderMessages,
  storageTheme,
  urlTestRegex
};
