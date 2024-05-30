import { main } from '@/elements/domElements';

const showConnectionStatus = (status: boolean) => {
  if (!main.connectionStatus) return;

  const connectionStatusClass = status ? 'connect' : 'disconnect';
  const connectionStatusText = status ? 'Онлайн' : 'Оффлайн';

  main.connectionStatus.classList.remove('connect', 'disconnect');
  main.connectionStatus.classList.add(connectionStatusClass);
  main.connectionStatus.textContent = connectionStatusText;
};

export { showConnectionStatus };
