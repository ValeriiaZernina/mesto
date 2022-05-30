import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelector('.popup__input');
    this._submitButton =  this._popup.querySelector('.popup__btn-save');
  }


  _getInputValues() {
    // this._inputList.forEach(
    //     (input) =>  
}

  setEventListeners() {
    super.setEventListeners();

}

  closePopup() {
    super.closePopup();
    this._popupForm.reset();
 }
}