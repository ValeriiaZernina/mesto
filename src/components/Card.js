export class Card {
    _name;
    _link;
    _querySelectorTemplate;
    _element;
    _handleCardClick;
    _handleDeleteCardClick;

    constructor(name, link, querySelectorTemplate, handleCardClick, handleDeleteCardClick) {
        this._name = name;
        this._link = link;
        this._querySelectorTemplate = querySelectorTemplate;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
    }

    _getTemplate() {
        const itemTemplateContent = document
            .querySelector(this._querySelectorTemplate)
            .content
            .cloneNode(true)
            .querySelector('.elements__card');

        return itemTemplateContent;
    }

    _likeClickHandler = (evt) => {
        evt.target.classList.toggle('elements__btn_active');
    }

    // _delClickHandler = () => {
    //     this._element.remove();
    //     this._element = null;
    // }


    _setEventListeners() {
        this._element.querySelector(".elements__btn").addEventListener('click', (evt) => {
            this._likeClickHandler(evt)
        });

        this._element.querySelector(".elements__trash-icon").addEventListener('click', () => {
            this._handleDeleteCardClick()
        });

        this._imageCard = this._element.querySelector(".elements__image")

        this._imageCard.addEventListener('click', () =>
            this._handleCardClick({
                link: this._link,
                name: this._name
            }));
    }

    getView = () => {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._imageCard.alt = this._name;;
        this._imageCard.src = this._link;
        this._element.querySelector(".elements__location").textContent = this._name;
        return this._element;

    }
}