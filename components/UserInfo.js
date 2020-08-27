export class UserInfo {
  constructor({
    nameSelector,
    descriptionSelector
  }) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    const userData = {
      name: this._name.textContent,
      description: this._description.textContent
    };
    return userData;
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

}
