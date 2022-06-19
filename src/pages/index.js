import '../pages/index.css';
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
PopupWithConfirmation
} from "../components/PopupWithConfirmation.js"
import {
    buttonOpenPopupElement,
    buttonOpenPopupProfile,
    CONFIG,
    buttonOpenPopupUpdateAvatar,
} from "../utils/constants.js";
import { 
    Api    
} from "../components/Api.js";

const api = new Api({
    url: "nomoreparties.co/v1/cohort-43",
    headers: {
      authorization: "4c628538-281e-4966-940f-27dfe004ed12",
      "Content-Type": "application/json",
    },
  });

  api.getInitialUser()
  .then((userData) => {
      userInfo.setUserData(userData);
  })
  .catch((err) => alert(err))

let cardList = null;
  api.getInitialCards()
  .then((cards) => {
     cardList = new Section({
            items: cards,
            renderer: (item) => {
                prependCard(item.name, item.link);
            }
        }, '.elements__cards');
        
        cardList.renderItems();
  })
  .catch((err) => alert(err));


function createCard(name, link) {
    const card = new Card(name, link, '.elements__template', handleCardClick, handleDeleteCardClick);
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

const popupUpdateAvatar = new PopupWithForm('.popup_type_avatar-update', handleUpdateAvatar);
popupUpdateAvatar.setEventListeners();

const popupDeleteCard = new PopupWithConfirmation('.popup_type_image-delete', handleDeleteCard);
popupDeleteCard.setEventListeners();

function handleAddedFormSubmit(data) {
    prependCard(data.InputPlace, data.InputLink);
    popupAddedCard.closePopup();
}

function handleProfileFormSubmit(data) {
    userInfo.setUserInfo(data.UserName, data.UserAbout);
    popupProfile.closePopup();
}

function handleUpdateAvatar(data) {
    popupUpdateAvatar.renderLoading(true);
    api
    .patchAvatar(data.AvatarLink)
    .then(() => {
        userInfo.setAvatar(data.AvatarLink);
        popupUpdateAvatar.closePopup();
    })
    .catch((err) => alert(err))
    .finally(() => {
        popupUpdateAvatar.renderLoading(false)
      });
}

function handleDeleteCardClick() {
    popupDeleteCard.openPopup();
}

function handleDeleteCard() {
    popupDeleteCard.closePopup();
}

function handlerEditProfile(name, about) {
    popupProfile.renderLoading(true);
    api
    .patchUser(name, about)
    .then(() => {
    })
    .catch((err) => alert(err))
    .finally(() => {
    popupProfile.renderLoading(false);
    })
}

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar', handlerEditProfile);


function handleCardClick(item) {
    popupWithImage.openPopup(item)
}


const initFormAddedCard = new FormValidator(document.querySelector('.popup_type_profile-add .popup__form'), CONFIG);
initFormAddedCard.enableValidation();
buttonOpenPopupElement.addEventListener('click', () => {
    popupAddedCard.openPopup();
    initFormAddedCard.resetValidation();
});

const initFormProfile = new FormValidator(document.querySelector('.popup_type_profile-edit .popup__form'), CONFIG);
initFormProfile.enableValidation();

const initFormAvatarUpdate = new FormValidator(document.querySelector('.popup_type_avatar-update .popup__form'), CONFIG);
initFormAvatarUpdate.enableValidation();
buttonOpenPopupUpdateAvatar.addEventListener('click', () => {
    popupUpdateAvatar.openPopup();
    initFormAvatarUpdate.resetValidation();
});

buttonOpenPopupProfile.addEventListener('click', () => {
    const user = userInfo.getUserInfo();
    popupProfile.setInputValues({
        UserName: user.profileName,
        UserAbout: user.profileInfo
    });
    popupProfile.openPopup();
    initFormProfile.resetValidation();
});