import Popup  from "./Popup";

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleDeleteItem) {
        super(popupSelector);
        this._handleDeleteItem = handleDeleteItem;
}
setEventListeners() {
    super.setEventListeners();
    document.querySelector('.popup__btn-save-deleteImg').addEventListener("click", (evt) => {
        evt.preventDefault();
        this._handleDeleteItem(this._item);
    });
 }

openPopup(card) {
    this._item = card;
    super.openPopup();
  }
}