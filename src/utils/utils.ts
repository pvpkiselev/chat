const showElement = (element: HTMLElement | null) => {
  if (!element) return;

  element.classList.remove('hide');
  element.classList.add('show');
};

const hideElement = (element: HTMLElement | null) => {
  if (!element) return;

  element.classList.remove('show');
  element.classList.add('hide');
};

const openModal = (modalElement: HTMLElement | null) => {
  if (!modalElement) return;
  showElement(modalElement);
};

const closeModal = (modalElement: HTMLElement | null) => {
  if (!modalElement) return;
  hideElement(modalElement);
};

const createTimeStamp = (dateString?: string) => {
  const now = dateString ? new Date(dateString) : new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const minValue = 10;

  const formattedHour = hours < minValue ? `0${hours}` : hours;
  const formattedMin = minutes < minValue ? `0${minutes}` : minutes;

  return `${formattedHour}:${formattedMin}`;
};

const generateId = () => {
  const dateNow = new Date();
  const numberId = dateNow.getTime();

  const hexadecimal = 36;
  const id = numberId.toString(hexadecimal);
  return id;
};

export { createTimeStamp, generateId, openModal, closeModal, showElement, hideElement };
