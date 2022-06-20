import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = this._popupForm.querySelectorAll('.popup__input');
        this._popupButtonSubmit = this._popup.querySelector('.popup__btn-save');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const valuesList = this._getInputValues();
            this._handleFormSubmit(valuesList);
        });
    }

    closePopup() {
        super.closePopup();
        this._popupForm.reset();
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._popupButtonSubmit.textContent = "Сохранение...";
        } else {
            this._popupButtonSubmit.textContent = this._popupButtonSubmit.title;
        }
    }

}