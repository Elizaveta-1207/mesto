export class Card {
  constructor({
    name,
    link,
    likes,
    owner
  }, cardSelector, currentUserId, handleCardClick, handleDeleteIconClick, handleLikeClick) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._cardSelector = cardSelector;
    this._currentUserId = currentUserId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;
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


    if (this._owner._id !== this._currentUserId) {
      this._element.querySelector('.element__delete').remove();
    };

    this._likes.forEach((item) => {
      if (item._id == this._currentUserId) {
        this._element.querySelector('.element__like').classList.add('element__like_active');
      }
    });

    return this._element;
  }

  _setEventListeners() {
    // обработчик события для открытия картинки в полном размере
    this._element.querySelector('.element__img').addEventListener('click', this._handleCardClick);

    // обработчик события для удаления карточки
    this._element.querySelector('.element__delete').addEventListener('click', this._handleDeleteIconClick);

    // обработчик события для нажатия лайка
    this._element.querySelector('.element__like').addEventListener('click', this._handleLikeClick);
  }

}
