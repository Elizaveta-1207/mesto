import '../pages/index.css';

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
  PopupConfirm
} from '../components/PopupConfirm.js';

import {
  UserInfo
} from '../components/UserInfo.js';

import {
  validationParams,
  templateId,
  cardListSelector,
} from '../utils/constants.js';

import {
  Api
} from '../components/Api.js';

// деструктуризация объекта validationParams
const {
  submitButtonSelector,
  inactiveButtonClass
} = validationParams;

const main = document.querySelector('.main');

// элементы с нажатием, редактированием и данными о пользователе
const editButton = main.querySelector('.profile__edit-button');
const addButton = main.querySelector('.profile__add-button');
const profileAvatar = main.querySelector('.profile__avatar');
const profileName = main.querySelector('.profile__name');
const profileDescription = main.querySelector('.profile__description');

// popup-элементы
const editPopup = document.querySelector('.popup-edit');
const addPopup = document.querySelector('.popup-add');
const confirmPopup = document.querySelector('.popup-confirm');
const avatarPopup = document.querySelector('.popup-avatar')

// форма редактирования профиля
const editForm = editPopup.querySelector('.popup-edit__form');

// форма добавления карточки
const addForm = addPopup.querySelector('.popup-add__form');

// форма изменения аватарки
const avatarForm = avatarPopup.querySelector('.popup-avatar__form');

// все input из формы редактирования
const nameInput = editForm.querySelector('.popup__input_name');
const descriptionInput = editForm.querySelector('.popup__input_description');

// кнопки внутри попапов: сохранить для информации о пользователе, для добавления карточки, изменения аватарки
const addSaveButton = addForm.querySelector(submitButtonSelector);
const editSaveButton = editForm.querySelector(submitButtonSelector);
const avatarSaveButton = avatarForm.querySelector(submitButtonSelector);



// валидация редактирования профиля
const editFormValidator = new FormValidator(validationParams, editForm);
editFormValidator.enableValidation();

// валидация добавления карточки
const addFormValidator = new FormValidator(validationParams, addForm);
addFormValidator.enableValidation();

// валидация добавления аватарки
const avatarFormValidator = new FormValidator(validationParams, avatarForm);
avatarFormValidator.enableValidation();



// экземпляра класса Api
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: '36046fe7-1e8e-4a22-8e60-7f2eb2d5b2d8',
    'Content-type': 'application/json'
  }
});

const promises = [api.getUserInfo(), api.getInitialCards()];

Promise.all(promises)
  .then((results) => {
    // console.log(results);
    setupUser(results[0]);
    setupCards(results[1]);

    // добавление слушателей на кнопки после получения информации о пользователе и карточках с сервера
    editButton.addEventListener('click', openPopupEdit);
    addButton.addEventListener('click', openPopupAdd);
    profileAvatar.addEventListener('click', openPopupAvatar);
  })
  .catch(err => console.log(`Error ${err}`));


// переменная для запоминания пользователя, который что-то делает на страничке (а именно меня)
let currentUser = null;

// функция установки информации о пользователе, например с сервера
function setupUser(user) {
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  profileAvatar.style.backgroundImage = `url(${user.avatar})`;
  currentUser = user;
}


// экземпляр класса UserInfo для использования информации пользователя при смене данных
const userData = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

// экземпляр класса PopupWithForm для редактирования профиля
const editPopupElement = new PopupWithForm({
  popupSelector: '.popup-edit',
  handleFormSubmit: (item) => {
    const editSave = editPopup.querySelector('.popup__button');
    editSave.textContent = 'Сохранение...';
    api.editProfile(item)
      .then((result) => {
        userData.setUserInfo(result);
        editSave.textContent = 'Сохранить';
        editPopupElement.close();
      })
      .catch(err => console.log(`Error ${err}`));
  },
});

editPopupElement.setEventListeners();


// функция открытия popup редактирования профиля
function openPopupEdit() {
  // очищаю ошибки перед открытием popup
  editFormValidator.clearErrors();

  // при открытии форма всегда содержит актульные данные со странички (имя и инфу)
  const userInfo = userData.getUserInfo();
  nameInput.value = userInfo.name;
  descriptionInput.value = userInfo.about;

  // делаю кнопку сохранить активной при открытии окна с редактированием
  editSaveButton.classList.remove(inactiveButtonClass);
  editSaveButton.disabled = false;

  // открываю popup редактирования
  editPopupElement.open();
}


// экземпляр класса PopupWithForm для редактирования аватарки
const avatarPopupElement = new PopupWithForm({
  popupSelector: '.popup-avatar',
  handleFormSubmit: (item) => {
    const avatarSave = avatarPopup.querySelector('.popup__button');
    avatarSave.textContent = 'Сохранение...';
    api.editAvatar(item)
      .then((result) => {
        userData.setUserInfo(result);
        avatarSave.textContent = 'Сохранить';
        avatarPopupElement.close();
      })
      .catch(err => console.log(`Error ${err}`));
  },
});

avatarPopupElement.setEventListeners();

// функция открытия popup редактирования профиля
function openPopupAvatar() {
  // очищаю ошибки перед открытием popup
  avatarFormValidator.clearErrors();

  // делаю кнопку сохранить неактивной при открытии окна с изменение аватарки
  avatarSaveButton.classList.add(inactiveButtonClass);
  avatarSaveButton.disabled = true;

  // открываю popup редактирования
  avatarPopupElement.open();
}



// экземпляр класса PopupWithImage
const imgPopup = new PopupWithImage('.popup-img');
imgPopup.setEventListeners();


// экземпляр класса PopupConfirm для подтверждения удаления карточки
const confirmPopupElement = new PopupConfirm({
  popupSelector: '.popup-confirm',
  handleSubmit: (item) => {
    const deleteButton = confirmPopup.querySelector('.popup__button');
    deleteButton.textContent = 'Удаление...';
    api.deleteCard(item._id)
      .then(() => {
        item._element.remove();
        item._element = null;
        deleteButton.textContent = 'Да';
        confirmPopupElement.close();
      })
      .catch(err => console.log(`Error ${err}`));
  },
});
confirmPopupElement.setEventListeners();


// экземпляр класса Card
function createCard(item, templateId) {
  const card = new Card(
    item,
    templateId,
    currentUser._id,
    // функция открытия картинки в большом размере
    () => {
      imgPopup.open(item.name, item.link);
    },
    // функция открытия попапа удаления карточки
    () => {
      // добавляем объекту карточки свойство содержащее её id
      card._id = item._id;
      confirmPopupElement.open(card);
    },
    // функция работы с проставление и удалением лайка
    (evt) => {
      evt.target.classList.toggle('element__like_active');
      // элемент с количеством лайков
      const elementLikeAmount = evt.target.closest('.element__likes').querySelector('.element__like-amount');

      if (evt.target.classList.contains('element__like_active')) {
        api.addLike(item._id)
          .then(() => {
            // в массив с лайками добавляю объект-пользователя,
            // который запомнили в currentUser при получении инфы о пользователе с сервера
            item.likes.push(currentUser);
            elementLikeAmount.textContent = item.likes.length;
          })

          .catch(err => console.log(`Error ${err}`))
      } else {
        api.deleteLike(item._id)
          .then(() => {
            // проверка и удаление конкретно моего лайка (лайка пользователя)
            item.likes.forEach((user) => {
              if (user._id == currentUser._id) {
                const userIndex = item.likes.indexOf(user);
                if (userIndex !== -1) {
                  item.likes.splice(userIndex, 1);
                  elementLikeAmount.textContent = item.likes.length;
                }
              }
            });
          })

          .catch(err => console.log(`Error ${err}`));
      }
    }
  );
  return card;
}

// функция добавления всех карточек по информации, например с сервера
function setupCards(cards) {
  const cardList = new Section({
      data: cards,
      renderer: (item) => {
        // проверка, что с сервера приходит верный link
        if (item.link.slice(0, 6) == 'https:') {
          const card = createCard(item, templateId);
          const cardElement = card.generateCard();
          cardList.addItem(cardElement, true);
        }
      },
    },
    cardListSelector
  );
  cardList.renderItems();
}


// экземпляр класса Section для добавления карточек, которые будет добавлять пользователь
const addCardsList = new Section({
    data: [],
  },
  cardListSelector
);

// экземпляр класса PopupWithForm для добавления карточки
const addPopupElement = new PopupWithForm({
  popupSelector: '.popup-add',
  handleFormSubmit: (item) => {
    const addSave = addPopup.querySelector('.popup__button');
    addSave.textContent = 'Сохранение...';
    api.addNewCard(item)
      .then((result) => {
        const card = createCard(result, templateId);
        const cardElement = card.generateCard();
        addCardsList.addItem(cardElement, false);
        addSave.textContent = 'Сохранить';
        addPopupElement.close();
      })
      .catch(err => console.log(`Error ${err}`));
  },
});

addPopupElement.setEventListeners();


// функция открытия popup добавления карточки
function openPopupAdd() {
  // очищаю ошибки перед открытием popup
  addFormValidator.clearErrors();

  // делаю кнопку сохранить неактивной при открытии окна с добавлением карточки
  addSaveButton.classList.add(inactiveButtonClass);
  addSaveButton.disabled = true;

  // открываю popup добавления карточки
  addPopupElement.open();
}
