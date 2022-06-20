export class Card {
    _id;
    _name;
    _link;
    _counter;
    _querySelectorTemplate;
    _element;
    _handleCardClick;
    _handleDeleteCardClick;
    _handleLikeClick;


    constructor(id, name, link, querySelectorTemplate, handleCardClick, handleDeleteCardClick, handleLikeClick) {
        this._id = id;
        this._name = name;
        this._link = link;
        this._querySelectorTemplate = querySelectorTemplate;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._handleLikeClick = handleLikeClick;
    }

    _getTemplate() {
        const itemTemplateContent = document
            .querySelector(this._querySelectorTemplate)
            .content
            .cloneNode(true)
            .querySelector('.elements__card');

        return itemTemplateContent;
    }

    _toogleLike (evt) {
        evt.target.classList.toggle('elements__btn_active');
    }

    getId() {
        return this._id;
      }

    remove () {
        this._element.remove();
        this._element = null;
    }

    chengeLikeCounter(counter){
        this._likeCounter.textContent  = counter;
    }

    _setEventListeners() {
        this._element.querySelector(".elements__btn").addEventListener('click', (evt) => {
            const like = !evt.target.classList.value.includes('elements__btn_active');
            this._handleLikeClick(this, like)
            this._toogleLike(evt);
        });

        this._element.querySelector(".elements__trash-icon").addEventListener('click', () => {
            this._handleDeleteCardClick(this)
        });

        this._imageCard = this._element.querySelector(".elements__image")

        this._imageCard.addEventListener('click', () =>
            this._handleCardClick({
                link: this._link,
                name: this._name
            }));
    }

    getView = (counter, isLike, canEdit) => {
        this._element = this._getTemplate();
        this._setEventListeners();
        if (!canEdit) {
            this._element.querySelector(".elements__trash-icon").remove();
          }
        this._likeCounter = this._element.querySelector(".elements__counter");
        this._likeCounter.textContent = counter;
        if(isLike){
            this._element.querySelector(".elements__btn").classList.toggle('elements__btn_active');
        }
        this._imageCard.alt = this._name;;
        this._imageCard.src = this._link;
        this._element.querySelector(".elements__location").textContent = this._name;
        return this._element;

    }
}