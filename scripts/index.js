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
const elementTemplate = document.querySelector("#element-template").content;

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

// функция добавления карточки на страницу
function addElement(titleValue, imgValue) {
  //склонировала шаблон
  const cardElement = elementTemplate.cloneNode(true);

  // в склонированном элементе карточки нашла картинку и заголовок
  cardElement.querySelector(".element__img").src = imgValue;
  cardElement.querySelector(".element__title").textContent = titleValue;

  // обработчик события для нажатия лайка
  cardElement.querySelector(".element__like").addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like_active");
  });

  // обработчик события для удаления карточки
  cardElement.querySelector(".element__delete").addEventListener("click", function (evt) {
    evt.target.closest(".element").remove();
  });

  // обработчик события для открытия картинки в полном размере
  cardElement.querySelector(".element__img").addEventListener("click", openPopupImg);

  return cardElement;
}

// добавляем все карточки из объявленного массива
initialCards.forEach((item) =>
  elementsList.append(addElement(item.name, item.link))
);

// функция открытия popup редактирования профиля
function openPopupEdit() {
  // очищаю ошибки перед открытием popup
  hideInputError(editFormElement, nameInput);
  hideInputError(editFormElement, jobInput);

  editPopup.classList.add("popup_opened");
  // при открытии формы всегда содержит актульные данные со странички (имя и инфу)
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  // закрытие popup нажатием на Escape
  document.addEventListener('keydown', keyHandler);
}

// функция открытия popup добавления карточки
function openPopupAdd() {
  //очищаю ошибки перед открытием popup
  hideInputError(addFormElement, titleInput);
  hideInputError(addFormElement, linkInput);

  addPopup.classList.add("popup_opened");
  // открытии формы всегда содержит пустые поля ввода
  titleInput.value = "";
  linkInput.value = "";
  document.addEventListener('keydown', keyHandler);
}

// функция открытия popup картинки в большом размере
function openPopupImg(img) {
  // img - это event, который передался функции. Нахожу ближайший элемент (карточку) с нужным классом
  const element = img.target.closest(".element");

  // в полученной карточке нахожу ссылку на картинку и название
  const cardImg = element.querySelector(".element__img").src;
  const cardTitle = element.querySelector(".element__title").textContent;

  // popup-элементу открытия картинки, в соответсвующие теги, присваиваю полученные значения:
  // ссылку на картинку и название
  imgPopup.querySelector(".popup__full-img").src = cardImg;
  imgPopup.querySelector(".popup__title-img").textContent = cardTitle;

  imgPopup.classList.add("popup_opened");
  document.addEventListener('keydown', keyHandler);
}

// функция закрытия popup для всех popup-элементов
function closePopup() {
  popups.forEach((item) => item.classList.remove("popup_opened"));
}

// function openClosePopupEdit() {
//   editPopup.classList.toggle("popup_opened");
//   if (editPopup.classList.contains("popup_opened")) {
//     nameInput.value = profileName.textContent;
//     jobInput.value = profileJob.textContent;
//   }
// }

// функция отправки формы профиля
function formSubmitHandler(evt) {
  // отмена стандартной отправки формы
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileName.textContent = name;
  profileJob.textContent = job;

  // openClosePopupEdit();
  closePopup();
}

// функция отправки формы добавления карточки
function addFormSubmitHandler(evt) {
  // отмена стандартной отправки формы
  evt.preventDefault();

  const title = titleInput.value;
  const link = linkInput.value;

  elementsList.prepend(addElement(title, link));

  // openClosePopupEdit();
  closePopup();
}

// функция для закрытия модального окна с помощью esc
function keyHandler(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}


editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", openPopupAdd);

closeButtons.forEach((item) => item.addEventListener("click", closePopup));

// закрытие popup нажатием мышки вне контейнера с формой
popups.forEach((item) => item.addEventListener("click", (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup();
  }
}));


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener("submit", formSubmitHandler);
addFormElement.addEventListener("submit", addFormSubmitHandler);
