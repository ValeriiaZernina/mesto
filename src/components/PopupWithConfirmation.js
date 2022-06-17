import Popup  from "./Popup";

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
}

setEventListeners() {
    super.setEventListeners();
//     this._popup.addEventListener("submit", (evt) => {
//         evt.preventDefault();
//         this._handleFormSubmit(this._item);
//     });
}

openPopup() {
    // this._item = item._id;
    super.openPopup();
  }
}