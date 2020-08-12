// функция открытия popup для всех popup-элементов
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  // закрытие popup нажатием на Escape
  document.addEventListener('keydown', keyHandler);
}

// функция закрытия popup для всех popup-элементов
export function closePopup(popup) {
  // popups.forEach((item) => item.classList.remove("popup_opened"));
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', keyHandler);
}

// функция для закрытия модального окна с помощью esc
function keyHandler(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === "Escape") {
    closePopup(popupOpened);
  }
}
