import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._viewImage = this._popup.querySelector(".popup__pic");
        this._namePlace = this._popup.querySelector(".popup__name-place");
    }

    openPopup(item) {
        this._viewImage.src = item.link;
        this._viewImage.alt = item.name;
        this._namePlace.textContent = item.name;

        super.openPopup();
    }
}