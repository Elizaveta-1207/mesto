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

// import {
//   openPopup,
//   closePopup
// } from '../scripts/utils.js';

import {
  initialCards,
  validationParams,
  templateId,
  cardListSelector
} from '../utils/constants.js';

// деструктуризация объекта validationParams
const {
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
} = validationParams;

const main = document.querySelector('.main');
const editButton = main.querySelector('.profile__edit-button');
const addButton = main.querySelector('.profile__add-button');

// создала массив из popup-элементов
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const popups = Array.from(document.querySelectorAll('.popup'));
const editPopup = document.querySelector('.popup-edit');
const addPopup = document.querySelector('.popup-add');
// перенесла в файл с классом Card, и прописала внутри класса. Обращаюсь к этому элементу только там
// const imgPopup = document.querySelector('.popup-img');

// создала массив из кнопок закрытия для всех popup-элементов
const closeButtons = popups.map((item) =>
  item.querySelector('.popup__close-button')
);
// нашла форму редактирования профиля из всего массива popup
const editFormElement = popups.find((item) =>
  item.querySelector('.popup-edit__form')
);
// нашла форму добавления карточки из всего массива popup
const addFormElement = popups.find((item) =>
  item.querySelector('.popup-add__form')
);

// нашла все input из форм
const nameInput = editFormElement.querySelector('.popup__input_name');
const jobInput = editFormElement.querySelector('.popup__input_description');
const titleInput = addFormElement.querySelector('.popup__input_title');
const linkInput = addFormElement.querySelector('.popup__input_link');

const profileName = main.querySelector('.profile__name');
const profileJob = main.querySelector('.profile__description');

// нашла блок в html, куда далее будут вставляться все карточки с местами
const elementsList = document.querySelector('.elements__list');

// валидация редактирования профиля
const editForm = editPopup.querySelector('.popup-edit__form')
const editFormValidator = new FormValidator(validationParams, editForm);
editFormValidator.enableValidation();

// валидация добавления карточки
const addForm = addPopup.querySelector('.popup-add__form')
const addFormValidator = new FormValidator(validationParams, addForm);
addFormValidator.enableValidation();

// добавляем все карточки из объявленного массива
// initialCards.forEach((item) => {
//   // передаем селектор шаблона карточки в класс Card
//   elementsList.append(createCard(item));
// });




// const editPopup1 = new Popup('.popup-edit');


const imgPopup = new PopupWithImage('.popup-img');

// создаём экземпляр класса Section
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

// const editPopup1 = new PopupWithForm({
//   popupSelector: '.popup-edit',
//   handleFormSubmit: (item) => {

//   }
// });

const addCardsList = new Section({
  data: []
}, cardListSelector);

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
  addFormValidator.clearErrors();
  addPopupElement.open();
}

addButton.addEventListener('click', openPopupAdd);




// функция открытия popup редактирования профиля
function openPopupEdit() {
  // делаю кнопку сохранить активной при открытии окна с редактированием
  const editSaveButton = editFormElement.querySelector(submitButtonSelector);
  editSaveButton.classList.remove(inactiveButtonClass);
  editSaveButton.disabled = false;

  // очищаю ошибки перед открытием popup
  editFormValidator.clearErrors();

  // при открытии формы всегда содержит актульные данные со странички (имя и инфу)
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  // openPopup(editPopup);
  editPopup1.open();

}

// // функция открытия popup добавления карточки
// function openPopupAdd() {
//   // делаю кнопку сохранить неактивной при открытии окна с добавлением карточки
//   // const addSaveButton = addFormElement.querySelector(submitButtonSelector);
//   // addSaveButton.classList.add(inactiveButtonClass);
//   // addSaveButton.disabled = true;

//   // // очищаю ошибки перед открытием popup
//   addFormValidator.clearErrors();

//   // // открытии формы всегда содержит пустые поля ввода
//   // titleInput.value = '';
//   // linkInput.value = '';

//   // openPopup(addPopup);
//   addPopupElement.open();
// }

// функция отправки формы профиля
function editFormSubmitHandler(evt) {
  // отмена стандартной отправки формы
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileName.textContent = name;
  profileJob.textContent = job;

  // closePopup(editPopup);
  editPopup1.close();
}

// функция добавления карточки в DOM
// function addCardToDOM(card) {
//   elementsList.prepend(card);
// }

// function createCard(data) {
//   const card = new Card(data, templateId);
//   const cardElement = card.generateCard();
//   return cardElement;
// }

// функция отправки формы добавления карточки
// function addCardFormSubmitHandler(evt) {
//   // отмена стандартной отправки формы
//   evt.preventDefault();
//   const data = {
//     name: titleInput.value,
//     link: linkInput.value,
//   };

//   addCardToDOM(createCard(data));

//   // openClosePopupEdit();
//   // closePopup(addPopup);
//   addPopupElement.close();
// }


editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);

// closeButtons.forEach((item) => item.addEventListener('click', () => closePopup(item.closest('.popup'))));

//устанавливаю слушатели для попапов
// editPopup1.setEventListeners();
imgPopup.setEventListeners();

// закрытие popup нажатием мышки вне контейнера с формой
// popups.forEach((item) => item.addEventListener('click', (evt) => {
//   if (evt.target.classList.contains('popup')) {
//     closePopup(item);
//   }
// }));


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener('submit', editFormSubmitHandler);
// addFormElement.addEventListener('submit', addCardFormSubmitHandler);
