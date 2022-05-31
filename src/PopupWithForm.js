import Popup  from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButton =  this._popup.querySelector('.popup__btn-save');
  }

  _getInputValues() {
    return this._popupForm.querySelectorAll('.popup__input');
}

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const valuesList = this._getInputValues();
      // TODO: fixed me please;
      this._handleFormSubmit(valuesList[0].value, valuesList[1].value);
    });
}

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
 }
}