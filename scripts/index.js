const main = document.querySelector(".main");
const editButton = main.querySelector(".profile__edit-button");
const addButton = main.querySelector(".profile__add-button");

// let popup = document.querySelector(".popup");
const popup = Array.from(document.querySelectorAll(".popup"));
const editPopup = document.querySelector(".popup-edit");
const addPopup = document.querySelector(".popup-add");

// let closeButton = popup.querySelector(".popup__close-button");
const closeButton = popup.map(item => item.querySelector(".popup__close-button"));


// let formElement = document.querySelector(".popup-edit__form");
const formElement = popup.find(item => item.querySelector(".popup-edit__form"));
// let formElement = popup.forEach(item => item.querySelector(".popup-edit__form"));
// let formElement = popup.map(item => item.querySelector(".popup-edit__form"));

let nameInput = formElement.querySelector(".popup__text_name");
let jobInput = formElement.querySelector(".popup__text_description");

let profileName = main.querySelector(".profile__name");
let profileJob = main.querySelector(".profile__description");

function openPopupEdit() {
  editPopup.classList.add('popup_opened');
  //добавила код, который при открытии формы всегда содержит актульные данные со странички
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openPopupAdd() {
  addPopup.classList.add('popup_opened');
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

editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", openPopupAdd);

closeButton.forEach(item => item.addEventListener("click", closePopup));
// closeButton.addEventListener("click", closePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
