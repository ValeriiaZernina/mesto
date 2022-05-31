export class Card {
    _name;
    _link;
    _querySelectorTemplate;
    _element;
    _handleCardClick;

    constructor(name, link, querySelectorTemplate, handleCardClick) {
      this._name = name;
      this._link = link;
      this._querySelectorTemplate = querySelectorTemplate;
      this._handleCardClick = handleCardClick;
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

    _delClickHandler = () => {
      this._element.remove();
      this._element = null;
      }

    getView = () => {
      this._element = this._getTemplate();
      const imageCard = this._element.querySelector(".elements__image"); 
      imageCard.alt = this._name;;
      imageCard.src = this._link;
      this._element.querySelector(".elements__location").textContent = this._name;
      const likeButton = this._element.querySelector(".elements__btn");
      likeButton.addEventListener('click', this._likeClickHandler);
      
      this._element.querySelector(".elements__trash-icon").addEventListener('click', this._delClickHandler);
      this._element.querySelector(".elements__image").addEventListener('click', () => this._handleCardClick({link: this._link, name: this._name}));
    
      return this._element;

    }
    }


    