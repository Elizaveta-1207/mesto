export class UserInfo {
  constructor({
    nameSelector,
    descriptionSelector,
    avatarSelector
  }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      about: this._description.textContent,
      avatar: this._avatar.style.backgroundImage
    };
    return userData;
  }

  setUserInfo({
    name,
    about,
    avatar
  }) {
    this._name.textContent = name;
    this._description.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }

}
