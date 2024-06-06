import { main } from '@/elements/domElements';
import { messagesStateManager } from './messagesStateManager';
import type { RequestedData } from './messages.types';
import { searchMessages } from '@/constants/constants';
import { renderMessagesHistory } from './messagesRenderer';
import { hideElement, showElement } from '@/utils/utils';
import { debounce } from '@/utils/decorators';

const searchByMessages = () => {
  const searchValue = main.searchInput?.value.trim();

  const messagesDataList: RequestedData[] = messagesStateManager.getMessagesDataList();

  const { searchList, searchTitle } = main;

  const isSearchReady = messagesDataList && searchValue && searchList && searchTitle;
  if (!isSearchReady) return;

  searchList.innerHTML = '';

  const filteredMessagesList = messagesDataList.filter((messagesDataItem: RequestedData) => {
    const regex = new RegExp(searchValue, 'i');
    return regex.test(messagesDataItem.text);
  });

  const messagesListToRender = filteredMessagesList.reverse();

  const searchTitleText = filteredMessagesList.length > 0 ? searchMessages.found : searchMessages.none;

  searchTitle.textContent = searchTitleText;

  renderMessagesHistory(messagesListToRender, searchList);
};

const getSearchBlockCoordinates = (searchInput: HTMLElement) => {
  const inputWidthDivisionFactor = 2;
  const inputHalfWidth = searchInput.offsetWidth / inputWidthDivisionFactor;
  const spacing = 8;

  const searchInputCoordinates = searchInput.getBoundingClientRect();
  const left = searchInputCoordinates.left + inputHalfWidth;
  const top = searchInputCoordinates.bottom + spacing;

  return { left, top };
};

const toggleSearchBlock = (isVisible: boolean) => {
  const { searchBlock, searchInput } = main;

  if (!searchBlock || !searchInput) return;

  const { left, top } = getSearchBlockCoordinates(searchInput);

  searchBlock.style.left = `${left}px`;
  searchBlock.style.top = `${top}px`;

  isVisible ? showElement(main.searchBlock) : hideElement(main.searchBlock);
};

const searchInputHandler = () => {
  const searchValue = main.searchInput?.value.trim();
  if (!searchValue) {
    toggleSearchBlock(false);
  } else {
    toggleSearchBlock(true);
    debouncedSearchByMessages();
  }
};

const debounceTimeMs = 300;
const debouncedSearchByMessages = debounce(searchByMessages, debounceTimeMs);

export const initSearchEvents = () => {
  main.searchInput?.addEventListener('input', searchInputHandler);
  main.searchInput?.addEventListener('focus', searchInputHandler);
  main.searchInput?.addEventListener('blur', () => toggleSearchBlock(false));
};
