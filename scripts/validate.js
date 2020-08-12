const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};


class FormValidator {
  constructor(data, validatingForm) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;

    this._validatingForm = validatingForm;
  }

  enableValidation() {
    this._setEventListeners();
    this._validatingForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }

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

  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput = (inputList) => {
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

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

}

// const showInputError = (formElement, inputElement, errorMessage, obj) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.add(obj.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(obj.errorClass);
// };

// const hideInputError = (formElement, inputElement, obj) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   inputElement.classList.remove(obj.inputErrorClass);
//   errorElement.classList.remove(obj.errorClass);
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement, obj) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, obj);
//   } else {
//     hideInputError(formElement, inputElement, obj);
//   }
// };

// const setEventListeners = (formElement, obj) => {
//   const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
//   const buttonElement = formElement.querySelector(obj.submitButtonSelector);

//   toggleButtonState(inputList, buttonElement, obj);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement, obj);
//       toggleButtonState(inputList, buttonElement, obj);
//     });
//   });
// };

// const enableValidation = (obj) => {
//   const formList = Array.from(document.querySelectorAll(obj.formSelector));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, obj);
//   });
// }

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElements) => {
//     return !inputElements.validity.valid;
//   })
// };

// const toggleButtonState = (inputList, buttonElement, obj) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(obj.inactiveButtonClass);
//     buttonElement.disabled = true;
//   } else {
//     buttonElement.classList.remove(obj.inactiveButtonClass);
//     buttonElement.disabled = false;
//   }
// }

// enableValidation(validationParams);

const editForm = editPopup.querySelector('.popup-edit__form')
const editFormCheck = new FormValidator(validationParams, editForm);
const editFormEl = editFormCheck.enableValidation();

const addForm = addPopup.querySelector('.popup-add__form')
const addFormCheck = new FormValidator(validationParams, addForm);
const addFormEl = addFormCheck.enableValidation();
