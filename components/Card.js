import {
  openPopup
} from '../scripts/utils.js';


export class Card {
  constructor({
    name,
    link
  }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    // чтобы корректно отображалось на айфоне, т.к. нельзя применять стрелочные функции в Safari
    // this._openPopupImg = this._openPopupImg.bind(this);
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const elementImg = this._element.querySelector('.element__img');
    elementImg.src = this._link;
    elementImg.alt = `Фото: ${this._name}`;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  // функция открытия popup картинки в большом размере
  _openPopupImg() {
    const imgPopup = document.querySelector('.popup-img');
    const imgPopupFull = imgPopup.querySelector('.popup__full-img')
    imgPopupFull.src = this._link;
    imgPopupFull.alt = `Фото: ${this._name}`;
    imgPopup.querySelector('.popup__title-img').textContent = this._name;

    openPopup(imgPopup);
  }

  _setEventListeners() {
    // обработчик события для открытия картинки в полном размере (пока оставлю этот код)
    // this._element.querySelector('.element__img').addEventListener('click', () => {
    //   this._openPopupImg();
    // });
    this._element.querySelector('.element__img').addEventListener('click', this._handleCardClick);

    // обработчик события для удаления карточки
    this._element.querySelector('.element__delete').addEventListener('click', function (evt) {
      evt.target.closest('.element').remove();
    });

    // обработчик события для нажатия лайка
    this._element.querySelector('.element__like').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__like_active');
    });
  }

}
