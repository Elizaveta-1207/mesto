import {
  Card
} from '../components/Card.js';

import {
  FormValidator
} from '../components/FormValidator.js';

import {
  Section
} from '../components/Section.js';

import {
  PopupWithForm
} from '../components/PopupWithForm.js';

import {
  PopupWithImage
} from '../components/PopupWithImage.js';

import {
  UserInfo
} from '../components/UserInfo.js';

import {
  initialCards,
  validationParams,
  templateId,
  cardListSelector
} from '../utils/constants.js';

// деструктуризация объекта validationParams
const {
  submitButtonSelector,
  inactiveButtonClass,
} = validationParams;

const main = document.querySelector('.main');
const editButton = main.querySelector('.profile__edit-button');
const addButton = main.querySelector('.profile__add-button');

// создала массив из popup-элементов
const popups = Array.from(document.querySelectorAll('.popup'));
const editPopup = document.querySelector('.popup-edit');
const addPopup = document.querySelector('.popup-add');

// нашла форму редактирования профиля из всего массива popup
const editFormElement = popups.find((item) =>
  item.querySelector('.popup-edit__form')
);
// нашла форму добавления карточки из всего массива popup
const addFormElement = popups.find((item) =>
  item.querySelector('.popup-add__form')
);

// нашла все input из формы редактирования
const nameInput = editFormElement.querySelector('.popup__input_name');
const descriptionInput = editFormElement.querySelector('.popup__input_description');



// валидация редактирования профиля
const editForm = editPopup.querySelector('.popup-edit__form')
const editFormValidator = new FormValidator(validationParams, editForm);
editFormValidator.enableValidation();

// валидация добавления карточки
const addForm = addPopup.querySelector('.popup-add__form')
const addFormValidator = new FormValidator(validationParams, addForm);
addFormValidator.enableValidation();

// создала экземпляр класса PopupWithImage
const imgPopup = new PopupWithImage('.popup-img');
imgPopup.setEventListeners();

// создаём экземпляр класса Section для добавления всех карточек из массива
const cardList = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, templateId, () => {
      imgPopup.open(item.name, item.link);
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);

  }
}, cardListSelector);

cardList.renderItems();

// создала экземпляр класса Section для добавления карточек, которые будет добавлять пользователь
const addCardsList = new Section({
  data: []
}, cardListSelector);

// создала экземпляр класса PopupWithForm для добавления карточки
const addPopupElement = new PopupWithForm({
  popupSelector: '.popup-add',
  handleFormSubmit: (item) => {
    const card = new Card(item, templateId, () => {
      // console.log(item.link);
      imgPopup.open(item.name, item.link);
    });

    const cardElement = card.generateCard();

    addCardsList.setItem(cardElement);
  }
});

addPopupElement.setEventListeners();

// функция открытия popup добавления карточки
function openPopupAdd() {
  // очищаю ошибки перед открытием popup
  addFormValidator.clearErrors();

  // делаю кнопку сохранить неактивной при открытии окна с добавлением карточки
  const addSaveButton = addFormElement.querySelector(submitButtonSelector);
  addSaveButton.classList.add(inactiveButtonClass);
  addSaveButton.disabled = true;

  // открываю popup добавления карточки
  addPopupElement.open();
}

// создала экземпляр класса UserInfo для использования информации пользователя при смене данных
const userData = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

// создала экземпляр класса PopupWithForm для редактирования профиля
const editPopupElement = new PopupWithForm({
  popupSelector: '.popup-edit',
  handleFormSubmit: (item) => {

    userData.setUserInfo(item.name, item.description);

  }
});

editPopupElement.setEventListeners();


// функция открытия popup редактирования профиля
function openPopupEdit() {
  // очищаю ошибки перед открытием popup
  editFormValidator.clearErrors();

  // при открытии форма всегда содержит актульные данные со странички (имя и инфу)
  const userInfo = userData.getUserInfo();
  nameInput.value = userInfo.name;
  descriptionInput.value = userInfo.description;

  // делаю кнопку сохранить активной при открытии окна с редактированием
  const editSaveButton = editFormElement.querySelector(submitButtonSelector);
  editSaveButton.classList.remove(inactiveButtonClass);
  editSaveButton.disabled = false;

  // открываю popup редактирования
  editPopupElement.open();
}


editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
