let main = document.querySelector('.main');
let editButton = main.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let formElement = popup.querySelector('.popup__form');


function openPopup() {
  popup.classList.add('popup_opened');

  //добавила код, который при открытии формы всегда содержит актульные данные со странички
  let nameInput = formElement.querySelector('.popup__name');
  let jobInput = formElement.querySelector('.popup__description');

  let profileName = main.querySelector('.profile__name');
  let profileJob = main.querySelector('.profile__description');

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Находим поля формы в DOM
  let nameInput = formElement.querySelector('.popup__name'); // Воспользуйтесь инструментом .querySelector()
  let jobInput = formElement.querySelector('.popup__description'); // Воспользуйтесь инструментом .querySelector()

  // Получите значение полей из свойства value
  let name = nameInput.value;
  let job = jobInput.value;
  // console.log(nameInput.value);
  // console.log(jobInput.value);

  // Выберите элементы, куда должны быть вставлены значения полей
  let profileName = main.querySelector('.profile__name');
  let profileJob = main.querySelector('.profile__description');
  // Вставьте новые значения с помощью textContent
  profileName.textContent = name;
  profileJob.textContent = job;

  closePopup();

}
// let nameInput = formElement.querySelector('.popup__name');
// console.log(nameInput.value);

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
// console.log(2 + 2);
