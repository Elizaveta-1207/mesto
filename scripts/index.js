import {
  Card
} from './Card.js';

import {
  FormValidator
} from './FormValidator.js';

const main = document.querySelector(".main");
const editButton = main.querySelector(".profile__edit-button");
const addButton = main.querySelector(".profile__add-button");

// создала массив из popup-элементов
const popups = Array.from(document.querySelectorAll(".popup"));
const editPopup = document.querySelector(".popup-edit");
const addPopup = document.querySelector(".popup-add");
const imgPopup = document.querySelector(".popup-img");

// создала массив из кнопок закрытия для всех popup-элементов
const closeButtons = popups.map((item) =>
  item.querySelector(".popup__close-button")
);
// нашла форму редактирования профиля из всего массива popup
const editFormElement = popups.find((item) =>
  item.querySelector(".popup-edit__form")
);
// нашла форму добавления карточки из всего массива popup
const addFormElement = popups.find((item) =>
  item.querySelector(".popup-add__form")
);

// нашла все input из форм
const nameInput = editFormElement.querySelector(".popup__input_name");
const jobInput = editFormElement.querySelector(".popup__input_description");
const titleInput = addFormElement.querySelector(".popup__input_title");
const linkInput = addFormElement.querySelector(".popup__input_link");

const profileName = main.querySelector(".profile__name");
const profileJob = main.querySelector(".profile__description");

// нашла блок в html, куда далее будут вставляться все карточки с местами
const elementsList = document.querySelector(".elements__list");

// нашла шаблон
const elementTemplate = document.querySelector("#element").content;

// массив карточек
const initialCards = [{
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// объект настроек с селекторами и классами формы
const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// валидация редактирования профиля
const editForm = editPopup.querySelector('.popup-edit__form')
const editFormCheck = new FormValidator(validationParams, editForm);
const editFormEl = editFormCheck.enableValidation();

// валидация добавления карточки
const addForm = addPopup.querySelector('.popup-add__form')
const addFormCheck = new FormValidator(validationParams, addForm);
const addFormEl = addFormCheck.enableValidation();


// добавляем все карточки из объявленного массива
initialCards.forEach((item) => {
  const card = new Card(item, "#element");
  const cardEl = card.generateCard();
  elementsList.append(cardEl);
});

// функция очистки ошибок после валидации
const hideErrors = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__error_visible');
  errorElement.textContent = '';
};

// функция открытия popup редактирования профиля
function openPopupEdit() {
  // делаю кнопку сохранить неактивной при открытии окна с редактированием
  const editSaveButton = editFormElement.querySelector('.popup__button');
  editSaveButton.classList.add('popup__button_disabled');
  editSaveButton.disabled = true;

  // очищаю ошибки перед открытием popup
  hideErrors(editFormElement, nameInput);
  hideErrors(editFormElement, jobInput);

  // при открытии формы всегда содержит актульные данные со странички (имя и инфу)
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(editPopup);

}

// функция открытия popup добавления карточки
function openPopupAdd() {
  // делаю кнопку сохранить неактивной при открытии окна с добавлением карточки
  const addSaveButton = addFormElement.querySelector('.popup__button');
  addSaveButton.classList.add('popup__button_disabled');
  addSaveButton.disabled = true;

  // очищаю ошибки перед открытием popup
  hideErrors(addFormElement, titleInput);
  hideErrors(addFormElement, linkInput);

  // открытии формы всегда содержит пустые поля ввода
  titleInput.value = "";
  linkInput.value = "";

  openPopup(addPopup);
}

// функция открытия popup для всех popup-элементов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  // закрытие popup нажатием на Escape
  document.addEventListener('keydown', keyHandler);
}


// функция закрытия popup для всех popup-элементов
function closePopup(popup) {
  // popups.forEach((item) => item.classList.remove("popup_opened"));
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', keyHandler);
}

// функция отправки формы профиля
function formSubmitHandler(evt) {
  // отмена стандартной отправки формы
  evt.preventDefault();

  const popupOpened = document.querySelector('.popup_opened');

  const name = nameInput.value;
  const job = jobInput.value;

  profileName.textContent = name;
  profileJob.textContent = job;

  // openClosePopupEdit();
  closePopup(popupOpened);
}

// функция отправки формы добавления карточки
function addFormSubmitHandler(evt) {
  // отмена стандартной отправки формы
  evt.preventDefault();

  const popupOpened = document.querySelector('.popup_opened');

  // const title = titleInput.value;
  // const link = linkInput.value;

  const data = {
    name: titleInput.value,
    link: linkInput.value,
  };

  const card = new Card(data, "#element");
  const cardEl = card.generateCard();

  elementsList.prepend(cardEl);

  // openClosePopupEdit();
  closePopup(popupOpened);
}

// функция для закрытия модального окна с помощью esc
function keyHandler(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === "Escape") {
    closePopup(popupOpened);
  }
}


editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", openPopupAdd);

closeButtons.forEach((item) => item.addEventListener("click", () => closePopup(item.closest('.popup'))));

// закрытие popup нажатием мышки вне контейнера с формой
popups.forEach((item) => item.addEventListener("click", (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(item);
  }
}));


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener("submit", formSubmitHandler);
addFormElement.addEventListener("submit", addFormSubmitHandler);
