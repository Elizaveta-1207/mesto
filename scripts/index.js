const main = document.querySelector(".main");
const editButton = main.querySelector(".profile__edit-button");
const addButton = main.querySelector(".profile__add-button");

// let popup = document.querySelector(".popup");
const popup = Array.from(document.querySelectorAll(".popup"));
const editPopup = document.querySelector(".popup-edit");
const addPopup = document.querySelector(".popup-add");

// let closeButton = popup.querySelector(".popup__close-button");
const closeButton = popup.map(item => item.querySelector(".popup__close-button"));


// let editFormElement = document.querySelector(".popup-edit__form");
const editFormElement = popup.find(item => item.querySelector(".popup-edit__form"));
// let editFormElement = popup.forEach(item => item.querySelector(".popup-edit__form"));
// let editFormElement = popup.map(item => item.querySelector(".popup-edit__form"));
const addFormElement = popup.find(item => item.querySelector(".popup-add__form"));

let nameInput = editFormElement.querySelector(".popup__text_name");
let jobInput = editFormElement.querySelector(".popup__text_description");
let titleInput = addFormElement.querySelector(".popup__text_title");
let linkInput = addFormElement.querySelector(".popup__text_link");

let profileName = main.querySelector(".profile__name");
let profileJob = main.querySelector(".profile__description");

const elementsList = document.querySelector(".elements__list");

const initialCards = [{
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function addElement(titleValue, imgValue) {
  const elementTemplate = document.querySelector('#element-template').content;
  const cardElement = elementTemplate.cloneNode(true);
  cardElement.querySelector('.element__img').src = imgValue;
  cardElement.querySelector('.element__title').textContent = titleValue;

  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  cardElement.querySelector('.element__delete').addEventListener('click', function (evt) {
    evt.target.closest(".element").remove();
  });

  return cardElement;
  // elementsList.prepend(cardElement);
}

initialCards.forEach(function (item) {
  // addElement(item.name, item.link);
  elementsList.append(addElement(item.name, item.link));
});

function openPopupEdit() {
  editPopup.classList.add('popup_opened');
  //добавила код, который при открытии формы всегда содержит актульные данные со странички
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openPopupAdd() {
  addPopup.classList.add('popup_opened');
  titleInput.value = '';
  linkInput.value = '';
}


function closePopup() {
  popup.forEach(item => item.classList.remove("popup_opened"));
  // popup.classList.remove("popup_opened");
}

// function openClosePopup() {
//   popup.classList.toggle("popup_opened");
//   if (popup.classList.contains("popup_opened")) {
//     nameInput.value = profileName.textContent;
//     jobInput.value = profileJob.textContent;
//   }
// }

// function openClosePopupEdit() {
//   editPopup.classList.toggle("popup_opened");
//   if (editPopup.classList.contains("popup_opened")) {
//     nameInput.value = profileName.textContent;
//     jobInput.value = profileJob.textContent;
//   }
// }

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей из свойства value
  let name = nameInput.value;
  let job = jobInput.value;

  // Вставьте новые значения с помощью textContent
  profileName.textContent = name;
  profileJob.textContent = job;

  // openClosePopupEdit();
  closePopup();
}

function addFormSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей из свойства value
  let title = titleInput.value;
  let link = linkInput.value;

  // addElement(title, link);
  elementsList.prepend(addElement(title, link));

  // openClosePopupEdit();
  closePopup();
}

editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", openPopupAdd);

closeButton.forEach(item => item.addEventListener("click", closePopup));
// closeButton.addEventListener("click", closePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener("submit", formSubmitHandler);
addFormElement.addEventListener("submit", addFormSubmitHandler);
