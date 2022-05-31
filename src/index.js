import './pages/index.css';
import {
  cardsGallery
} from "./cardsGallery.js";
import {
  Card
} from "./Card.js";
import {
  FormValidator
} from "./FormValidator.js";
import {
  Section
} from "./Section.js";
import {
  PopupWithImage
} from "./PopupWithImage.js";
import {
  PopupWithForm
} from "./PopupWithForm";
import {
  UserInfo
} from "./UserInfo.js";

const buttonOpenPopupElement = document.querySelector('.profile__add-button');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');

const CONFIG = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  errorClass: '.popup__input-error',
  inputErrorClass: 'popup__input_type-error'
}

const popupWithImage = new PopupWithImage(".popup_type_image-view");
popupWithImage.setEventListeners();

const popupAddedCard = new PopupWithForm('.popup_type_profile-add', handleAddedFormSubmit);
popupAddedCard.setEventListeners();

const popupProfile = new PopupWithForm('.popup_type_profile-edit', handleProfileFormSubmit);
popupProfile.setEventListeners();

function handleAddedFormSubmit(placeValue, linkValue) {
  const card = new Card(placeValue, linkValue, '.elements__template', handleCardClick);
  const cardElement = card.getView();
  cardList.addItem(cardElement);
  popupAddedCard.closePopup();
}

function handleProfileFormSubmit(nameValue, jobValue) {
  userInfo.setUserInfo(nameValue, jobValue);
  popupProfile.closePopup(); 
}

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

function handleCardClick(item) {
  popupWithImage.openPopup(item)
}

const cardList = new Section({
  items: cardsGallery,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '.elements__template', handleCardClick);
    const cardElement = card.getView();
    cardList.addItem(cardElement);
  }
},'.elements__cards');

  cardList.renderItems();

  const initFormAddedCard = new FormValidator(document.querySelector('.popup_type_profile-add .popup__form'), CONFIG);
  initFormAddedCard.enableValidation();
  buttonOpenPopupElement.addEventListener('click', () => {
    popupAddedCard.openPopup();
    initFormAddedCard.reset();
  });

  const initFormProfile = new FormValidator(document.querySelector('.popup_type_profile-edit .popup__form'), CONFIG);
  initFormProfile.enableValidation();

  buttonOpenPopupProfile.addEventListener('click', () => {
    popupProfile.openPopup();
    initFormProfile.reset();
  });
