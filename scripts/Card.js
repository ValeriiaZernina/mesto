export class Card {
    _name;
    _link;
    _querySelectorTemplate;
    _element;
    _clickHandler;

    constructor(name, link, querySelectorTemplate, clickHandler) {
      this._name = name;
      this._link = link;
      this._querySelectorTemplate = querySelectorTemplate;
      this._clickHandler = clickHandler;
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
      }


    getView = () => {
      this._element = this._getTemplate();
      this._element.querySelector(".elements__location").textContent = this._name;
      this._element.querySelector(".elements__image").alt = this._name;;
      this._element.querySelector(".elements__image").src = this._link;
      const likeButton = this._element.querySelector(".elements__btn");
      likeButton.addEventListener('click', this._likeClickHandler);
      
  // imageCards.addEventListener("click", openPopupHandler);
      this._element.querySelector(".elements__trash-icon").addEventListener('click', this._delClickHandler);
      this._element.querySelector(".elements__image").addEventListener('click', () => this._clickHandler(this._link, this._name));

      return this._element;

    }
    }


    