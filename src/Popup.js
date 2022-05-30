export default class Popup {
    constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    }

    openPopup() {
        this._popup.classList.add('popup_opened');
        this._popup.addEventListener('keydown', this._handleEscClose);
    }

    closePopup() {
        this._popup.classList.remove('popup_opened');
        this._popup.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.closePopup();
        }
    }
    setEventListeners() {
        this._popup.addEventListener("mousedown", (evt) => {
            if (evt.target === evt.currentTarget) {
              this.closePopup();
            }
        });

        this._popup.querySelector('.popup__btn-close').addEventListener('click', (evt) => {
            if (evt.target.classList.contains("popup__close")) {
                this.closePopup();
            }
        });
}
}