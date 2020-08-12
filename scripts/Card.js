import {
  openPopup
} from './utils.js';

import {
  imgPopup
} from './constants.js';

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._openPopupImg = this._openPopupImg.bind(this);
  }

  _getTemplate() {
    const cardEl = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

    return cardEl;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__img').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  // функция открытия popup картинки в большом размере
  _openPopupImg() {
    imgPopup.querySelector('.popup__full-img').src = this._link;
    imgPopup.querySelector('.popup__title-img').textContent = this._name;
    openPopup(imgPopup);
  }

  _setEventListeners() {
    // обработчик события для открытия картинки в полном размере
    // this._element.querySelector(".element__img").addEventListener('click', () => {
    //   this._openPopupImg();
    // });
    this._element.querySelector(".element__img").addEventListener('click', this._openPopupImg);

    // обработчик события для удаления карточки
    this._element.querySelector(".element__delete").addEventListener("click", function (evt) {
      evt.target.closest(".element").remove();
    });

    // обработчик события для нажатия лайка
    this._element.querySelector(".element__like").addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });
  }

}
