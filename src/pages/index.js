import '../pages/index.css';
import {
    cardsGallery
} from "../utils/cardsGallery.js";
import {
    Card
} from "../components/Card.js";
import {
    FormValidator
} from "../components/FormValidator.js";
import {
    Section
} from "../components/Section.js";
import {
    PopupWithImage
} from "../components/PopupWithImage.js";
import {
    PopupWithForm
} from "../components/PopupWithForm";
import {
    UserInfo
} from "../components/UserInfo.js";
import {
    buttonOpenPopupElement,
    buttonOpenPopupProfile,
    CONFIG,
} from "../utils/constants.js";
import { 
    Api    
} from "../components/Api.js";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-43',
    headers: {
      authorization: '4c628538-281e-4966-940f-27dfe004ed12',
      'Content-Type': 'application/json'
    }
  });

  

function createCard(name, link) {
    const card = new Card(name, link, '.elements__template', handleCardClick);
    const cardElement = card.getView();
    return cardElement;
}

function prependCard(name, link) {
    const cardElement = createCard(name, link);
    cardList.addItem(cardElement);
}


const popupWithImage = new PopupWithImage(".popup_type_image-view");
popupWithImage.setEventListeners();

const popupAddedCard = new PopupWithForm('.popup_type_profile-add', handleAddedFormSubmit);
popupAddedCard.setEventListeners();

const popupProfile = new PopupWithForm('.popup_type_profile-edit', handleProfileFormSubmit);
popupProfile.setEventListeners();

function handleAddedFormSubmit(data) {
    prependCard(data.InputPlace, data.InputLink);
    popupAddedCard.closePopup();
}

function handleProfileFormSubmit(data) {
    userInfo.setUserInfo(data.UserName, data.UserAbout);
    popupProfile.closePopup();
}

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

function handleCardClick(item) {
    popupWithImage.openPopup(item)
}

const cardList = new Section({
    items: cardsGallery,
    renderer: (item) => {
        prependCard(item.name, item.link);
    }
}, '.elements__cards');

cardList.renderItems();


const initFormAddedCard = new FormValidator(document.querySelector('.popup_type_profile-add .popup__form'), CONFIG);
initFormAddedCard.enableValidation();
buttonOpenPopupElement.addEventListener('click', () => {
    popupAddedCard.openPopup();
    initFormAddedCard.resetValidation();
});

const initFormProfile = new FormValidator(document.querySelector('.popup_type_profile-edit .popup__form'), CONFIG);
initFormProfile.enableValidation();

buttonOpenPopupProfile.addEventListener('click', () => {
    const user = userInfo.getUserInfo();
    popupProfile.setInputValues({
        UserName: user.profileName,
        UserAbout: user.profileInfo
    });
    popupProfile.openPopup();
    initFormProfile.resetValidation();
});