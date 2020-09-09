export class Card {
  constructor({
    name,
    link,
    likes
  }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardSelector = cardSelector;
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
    this._element.querySelector('.element__like-amount').textContent = this._likes.length;

    return this._element;
  }

  _setEventListeners() {
    // обработчик события для открытия картинки в полном размере
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
