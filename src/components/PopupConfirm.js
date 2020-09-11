import {
  Popup
} from './Popup.js';

export class PopupConfirm extends Popup {
  constructor({
    popupSelector,
    handleSubmit
  }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    this._popup.querySelector('.popup__button').addEventListener('click', function (evt) {
      evt.preventDefault();
      this._handleSubmit(this._card);
    }.bind(this));
    super.setEventListeners();
  }
}
