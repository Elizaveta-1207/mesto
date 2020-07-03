let main = document.querySelector(".main");
let editButton = main.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = popup.querySelector(".popup__close-button");
let formElement = popup.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__text_name");
let jobInput = formElement.querySelector(".popup__text_description");
let profileName = main.querySelector(".profile__name");
let profileJob = main.querySelector(".profile__description");

// function openPopup() {
//   popup.classList.add('popup_opened');
//   //добавила код, который при открытии формы всегда содержит актульные данные со странички
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
// }

// function closePopup() {
//   popup.classList.remove('popup_opened');
// }

function openClosePopup() {
  popup.classList.toggle("popup_opened");
  if (popup.classList.contains("popup_opened")) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}

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

  openClosePopup();
}

editButton.addEventListener("click", openClosePopup);
closeButton.addEventListener("click", openClosePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
