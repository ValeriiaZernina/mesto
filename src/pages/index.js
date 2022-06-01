import '../pages/index.css';
import {
    cardsGallery
} from "../components/cardsGallery.js";
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
} from "../components/utils/constants.js";

function createCard(name, link) {
    const card = new Card(name, link, '.elements__template', handleCardClick);
    const cardElement = card.getView();
    cardList.addItem(cardElement);
}

const popupWithImage = new PopupWithImage(".popup_type_image-view");
popupWithImage.setEventListeners();

const popupAddedCard = new PopupWithForm('.popup_type_profile-add', handleAddedFormSubmit);
popupAddedCard.setEventListeners();

const popupProfile = new PopupWithForm('.popup_type_profile-edit', handleProfileFormSubmit);
popupProfile.setEventListeners();

function handleAddedFormSubmit(data) {
    createCard(data.InputPlace, data.InputLink);
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
        createCard(item.name, item.link);
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
    popupProfile.openPopup();
    initFormProfile.resetValidation();
});