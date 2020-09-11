import "../pages/index.css";

import {
  Card
} from "../components/Card.js";

import {
  FormValidator
} from "../components/FormValidator.js";

import {
  Section
} from "../components/Section.js";

import {
  PopupWithForm
} from "../components/PopupWithForm.js";

import {
  PopupWithImage
} from "../components/PopupWithImage.js";

import {
  PopupConfirm
} from "../components/PopupConfirm.js";

import {
  UserInfo
} from "../components/UserInfo.js";

import {
  initialCards,
  validationParams,
  templateId,
  cardListSelector,
} from "../utils/constants.js";

import {
  Api
} from "../components/Api.js";

// деструктуризация объекта validationParams
const {
  submitButtonSelector,
  inactiveButtonClass
} = validationParams;

const main = document.querySelector(".main");
const editButton = main.querySelector(".profile__edit-button");
const addButton = main.querySelector(".profile__add-button");
const profileName = main.querySelector(".profile__name");
const profileDescription = main.querySelector(".profile__description");

// создала массив из popup-элементов
const popups = Array.from(document.querySelectorAll(".popup"));
const editPopup = document.querySelector(".popup-edit");
const addPopup = document.querySelector(".popup-add");
const confirmPopup = document.querySelector(".popup-confirm");

// нашла форму редактирования профиля из всего массива popup
const editFormElement = popups.find((item) =>
  item.querySelector(".popup-edit__form")
);
// нашла форму добавления карточки из всего массива popup
const addFormElement = popups.find((item) =>
  item.querySelector(".popup-add__form")
);

// нашла все input из формы редактирования
const nameInput = editFormElement.querySelector(".popup__input_name");
const descriptionInput = editFormElement.querySelector(
  ".popup__input_description"
);

// кнопки сохранить для информации о пользователе и для добавления карточки
const addSaveButton = addFormElement.querySelector(submitButtonSelector);
const editSaveButton = editFormElement.querySelector(submitButtonSelector);

// валидация редактирования профиля
const editForm = editPopup.querySelector(".popup-edit__form");
const editFormValidator = new FormValidator(validationParams, editForm);
editFormValidator.enableValidation();

// валидация добавления карточки
const addForm = addPopup.querySelector(".popup-add__form");
const addFormValidator = new FormValidator(validationParams, addForm);
addFormValidator.enableValidation();

// создала экземпляр класса PopupWithImage
const imgPopup = new PopupWithImage(".popup-img");
imgPopup.setEventListeners();

// функция создания экземпляра класса Api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-15",
  headers: {
    authorization: "36046fe7-1e8e-4a22-8e60-7f2eb2d5b2d8",
    "Content-Type": "application/json",
  },
});

// создала экземпляр класса PopupConfirm для подтверждения удаления карточки
const confirmPopupElement = new PopupConfirm({
  popupSelector: ".popup-confirm",
  handleSubmit: (item) => {
    api.deleteCard(item._id)
      .then(() => {
        // console.log(item);
        item._element.remove();
        item._element = null;
      })
      .finally(() => confirmPopupElement.close());
  },
});
confirmPopupElement.setEventListeners();
// editPopupElement.setEventListeners();
// // функция открытия popup подтверждение удаления
// function openPopupConfirm() {

//   // открываю popup добавления карточки
//   addPopupElement.open();
// }

// функция создания экземпляра класса Card
function createCard(item, templateId) {
  const card = new Card(
    item,
    templateId,
    () => {
      imgPopup.open(item.name, item.link);
    },
    () => {
      //добавляем объекту карточки свойство содержащее её id
      card._id = item._id;
      confirmPopupElement.open(card);
      console.log(card._id);
    },
    (evt) => {
      evt.target.classList.toggle('element__like_active');
      const elementLikeAmount = evt.target.closest('.element__likes').querySelector('.element__like-amount');
      if (evt.target.classList.contains('element__like_active')) {
        api.addLike(item._id)
          .then(() => {
            api.getUserInfo()
              .then((result) => {
                // console.log(result);
                item.likes.push(result);
                elementLikeAmount.textContent = item.likes.length;
              });
            // item.likes.push(item.owner);

            // console.log(item.likes);
          })
      } else {
        api.deleteLike(item._id)
          .then(() => {
            api.getUserInfo()
              .then((result) => {
                // console.log(item.likes);
                // console.log(result);
                // item.likes.pop(result);

                // удаление своего лайка из карточки
                // нахожу в массиве лайков индек своего лайка и вырезаю его из массива лайков
                item.likes.forEach((user) => {
                  if (user._id == 'bbdbf9a9d7d77861a60fb2e7') {
                    const userIndex = item.likes.indexOf(user);
                    // console.log(userIndex);
                    // console.log(user);
                    if (userIndex !== -1) {
                      item.likes.splice(userIndex, 1);
                      elementLikeAmount.textContent = item.likes.length;
                    }
                  }
                });

                // console.log(item.likes.indexOf(result));
              });
            // item.likes.pop(item.owner);

          })
      }
      // console.log(card._likes);
    }
  );
  // console.log(item);
  // console.log(item._id);
  return card;
}

// console.log(api.getInitialCards());
// api.getUserInfo();
// api.editProfile();
// api.deleteCard();
// api.addNewCard();
// .then((result) => {
//   // обрабатываем результат
// })
// .catch((err) => {
//   console.log(err); // выведем ошибку в консоль
// });

// добавление всех карточек с сервера
api
  .getInitialCards()
  .then((result) => {
    // console.log(result);
    // создаём экземпляр класса Section для добавления карточек
    const cardList = new Section({
        data: result,
        renderer: (item) => {
          // console.log(item.link.slice(0, 6) == 'https:');
          // проверяю, что с сервера приходит верный link
          if (item.link.slice(0, 6) == "https:") {
            const card = createCard(item, templateId);
            const cardElement = card.generateCard();
            // console.log(item);
            // console.log(cardElement);

            cardList.addItem(cardElement, true);
          }
        },
      },
      cardListSelector
    );
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

// создала экземпляр класса Section для добавления карточек, которые будет добавлять пользователь
const addCardsList = new Section({
    data: [],
  },
  cardListSelector
);

// создала экземпляр класса PopupWithForm для добавления карточки
const addPopupElement = new PopupWithForm({
  popupSelector: ".popup-add",
  handleFormSubmit: (item) => {
    api.addNewCard(item).then((result) => {
      // обрабатываем результат
      const card = createCard(result, templateId);
      const cardElement = card.generateCard();
      addCardsList.addItem(cardElement, false);
    });
  },
});

addPopupElement.setEventListeners();

// const cardList = new Section({
//   data: api.getInitialCards(),
//   renderer: (item) => {
//     const card = createCard(item, templateId);
//     const cardElement = card.generateCard();
//     cardList.addItem(cardElement, true);

//   }
// }, cardListSelector);

// создаём экземпляр класса Section для добавления всех карточек из массива
// const cardList = new Section({
//   data: initialCards,
//   renderer: (item) => {
//     const card = createCard(item, templateId);
//     const cardElement = card.generateCard();
//     cardList.addItem(cardElement, true);

//   }
// }, cardListSelector);

// cardList.renderItems();

// создала экземпляр класса Section для добавления карточек, которые будет добавлять пользователь
// const addCardsList = new Section({
//   data: []
// }, cardListSelector);

// // создала экземпляр класса PopupWithForm для добавления карточки
// const addPopupElement = new PopupWithForm({
//   popupSelector: '.popup-add',
//   handleFormSubmit: (item) => {
//     const card = createCard(item, templateId);
//     const cardElement = card.generateCard();
//     addCardsList.addItem(cardElement, false);
//   }
// });

// addPopupElement.setEventListeners();

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

api.getUserInfo().then((result) => {
  profileName.textContent = result.name;
  profileDescription.textContent = result.about;
});

// создала экземпляр класса UserInfo для использования информации пользователя при смене данных
const userData = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

// создала экземпляр класса PopupWithForm для редактирования профиля
const editPopupElement = new PopupWithForm({
  popupSelector: ".popup-edit",
  handleFormSubmit: (item) => {
    api.editProfile(item).then((result) => {
      // обрабатываем результат
      userData.setUserInfo(result.name, result.about);
      // console.log(result);
    });
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
  descriptionInput.value = userInfo.description;

  // делаю кнопку сохранить активной при открытии окна с редактированием
  editSaveButton.classList.remove(inactiveButtonClass);
  editSaveButton.disabled = false;

  // открываю popup редактирования
  editPopupElement.open();
}

// создала экземпляр класса PopupConfirm для подтверждения удаления карточки
// const confirmPopupElement = new PopupConfirm({
//   popupSelector: '.popup-confirm',
//   handleSubmit: (item) => {
//     api.deleteCard(item);
//       // .then((result) => {
//       //   // обрабатываем результат
//       //   userData.setUserInfo(result.name, result.about);
//       // });
//   }
// });

// editPopupElement.setEventListeners();
// // функция открытия popup подтверждение удаления
// function openPopupConfirm() {

//   // открываю popup добавления карточки
//   addPopupElement.open();
// }

editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", openPopupAdd);
