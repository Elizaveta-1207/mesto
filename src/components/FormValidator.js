export class FormValidator {
  constructor({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
  }, validatingForm) {
    this._formSelector = formSelector;
    this._inputSelector = inputSelector;
    this._submitButtonSelector = submitButtonSelector;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputErrorClass = inputErrorClass;
    this._errorClass = errorClass;

    this._validatingForm = validatingForm;
  }

  enableValidation() {
    this._setEventListeners();
    this._validatingForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }

  // публичный метод очистки ошибок валидации
  clearErrors() {
    const inputList = Array.from(this._validatingForm.querySelectorAll(this._inputSelector));

    inputList.forEach((inputElement) => {
      if (inputElement.classList.contains(this._inputErrorClass)) {
        this._hideInputError(this._validatingForm, inputElement);
      }
    });
  };

  _setEventListeners() {
    const inputList = Array.from(this._validatingForm.querySelectorAll(this._inputSelector));
    const buttonElement = this._validatingForm.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this._validatingForm, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElements) => {
      return !inputElements.validity.valid;
    })
  }

  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

}
