import {
  Popup
} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

  }

  open(name, link) {
    const imgPopupFull = this._popup.querySelector('.popup__full-img');
    imgPopupFull.src = link;
    imgPopupFull.alt = `Фото: ${name}`;
    this._popup.querySelector('.popup__title-img').textContent = name;

    super.open();
  }

}
