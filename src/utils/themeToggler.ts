import { storageTheme } from '@/constants/constants';
import { settings } from '@/elements/domElements';

const setTheme = (theme: string) => {
  if (theme === storageTheme.dark) {
    document.documentElement.classList.add('dark-theme');
    settings.themeToggle?.setAttribute('checked', '');
    localStorage.setItem(storageTheme.themeTitle, storageTheme.dark);
  } else {
    document.documentElement.classList.remove('dark-theme');
    settings.themeToggle?.removeAttribute('checked');
    localStorage.setItem(storageTheme.themeTitle, storageTheme.light);
  }
};

const toggleTheme = () => {
  const currentTheme = localStorage.getItem(storageTheme.themeTitle);
  currentTheme === storageTheme.dark ? setTheme(storageTheme.light) : setTheme(storageTheme.dark);
};

const setContentLoadedTheme = () => {
  const savedTheme = localStorage.getItem(storageTheme.themeTitle) || storageTheme.light;
  setTheme(savedTheme);
};

settings.themeToggle?.addEventListener('click', toggleTheme);

export { setContentLoadedTheme };
