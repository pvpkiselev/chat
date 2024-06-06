import { initAuthorizationEvents, handleLogIn } from './authorization/authorizationHandlers';
import { initChangeNameEvents } from './userSettings/userSettingsHandlers';
import { initMessageEvents } from './messages/messagesHandlers';
import { setContentLoadedTheme } from './utils/themeToggler';
import { initSearchEvents } from './messages/messagesSearch';

document.addEventListener('DOMContentLoaded', async () => {
  handleLogIn();
  initAuthorizationEvents();
  initChangeNameEvents();
  initMessageEvents();
  setContentLoadedTheme();
  initSearchEvents();
});
