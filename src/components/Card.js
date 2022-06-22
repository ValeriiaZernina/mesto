export class Card {
    _id;
    _name;
    _link;
    _likes;
    _ownerId;
    _userId;
    _querySelectorTemplate;
    _element;
    _handleCardClick;
    _handleDeleteCardClick;
    _handleLikeClick;
   
    constructor(id, name, link, likes, ownerId, userId, querySelectorTemplate, handleCardClick, handleDeleteCardClick, handleLikeClick) {
        this._id = id;
        this._name = name;
        this._link = link;
        this._likes = likes;
        this._ownerId = ownerId;
        this._userId = userId;
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

    _canEdit(){
        return this._ownerId === this._userId;
    }

    _isLike(){
        return this._likes.some(item => item._id === this._userId);
    }

    _getCounter(){
        return this._likes.length;
    }

    getId() {
        return this._id;
    }

    remove() {
        this._element.remove();
        this._element = null;
    }

    setLikes(likes) {
        this._likes = likes;
    }

    _setEventListeners() {
        this._element.querySelector(".elements__btn").addEventListener('click', () => {
            this._handleLikeClick(this, !this._isLike());
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


    viewLikes = () => {
        this._likeCounter = this._element.querySelector(".elements__counter");
        this._likeCounter.textContent = this._getCounter();
        if (this._isLike()) {
            this._element.querySelector(".elements__btn").classList.add('elements__btn_active');
        }
        else{
            this._element.querySelector(".elements__btn").classList.remove('elements__btn_active');
        }
    }

    getView = () => {
        this._element = this._getTemplate();
        this._setEventListeners();
        if (!this._canEdit()) {
            this._element.querySelector(".elements__trash-icon").remove();
        }
        this.viewLikes();
        this._imageCard.alt = this._name;;
        this._imageCard.src = this._link;
        this._element.querySelector(".elements__location").textContent = this._name;
        return this._element;

    }
}