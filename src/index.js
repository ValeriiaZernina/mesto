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
  UserInfo
} from "./UserInfo.js";


const cardsContainer = document.querySelector('.elements__cards');
const popupViewImage = document.querySelector(".popup__pic");
const popupNamePlace = document.querySelector(".popup__name-place");
const popupShowImage = document.querySelector(".popup_type_image-view");
const buttonOpenPopupElement = document.querySelector('.profile__add-button');
const popupAddedCard = document.querySelector('.popup_type_profile-add');
const formElementAdded = popupAddedCard.querySelector('.popup__form');
const placeInput = document.querySelector('.popup__input_enter_place');
const linkInput = document.querySelector('.popup__input_enter_link');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile-edit');
const profileForm = document.querySelector('.popup__form'); 
const nameInput = document.querySelector('.popup__input_enter_name');
const jobInput = document.querySelector('.popup__input_enter_data');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');

const CONFIG = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  errorClass: '.popup__input-error',
  inputErrorClass: 'popup__input_type-error'
}

const popupWithImage = new PopupWithImage(".popup_type_image-view");
popupWithImage.setEventListeners();

// const previewPicHandler = (link, name) => {
//   popupViewImage.src = link;
//   popupViewImage.alt = name;
//   popupNamePlace.textContent = name;
//   openPopup(popupShowImage);
// }

// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', handleEscClose);
// }

// function handleEscClose(evt) {
//   if (evt.key === 'Escape') {
//       closePopup();
//   }
// }

function openPopupAddedCard(formValidator) {
  formElementAdded.reset();
  openPopup(popupAddedCard);
  formValidator.reset();
};

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

function openProfileForm(formValidator) {
  const profile = userInfo.getUserInfo();
  nameInput.value = profile.profileName;
  jobInput.value = profile.profileInfo;
  openPopup(popupProfile);
  formValidator.reset();
}

function submitProfileForm(evt) { 
  evt.preventDefault(); 
  userInfo.setUserInfo(nameInput.value, jobInput.value);
  closePopup(); 
  } 
  profileForm.addEventListener('submit', submitProfileForm);

  
  // function createCard(name, link) {
  //   const card = new Card(name, link, '.elements__template', previewPicHandler);
  // cardsContainer.prepend(card.getView());
  // }

function handleAddImage(evt) {
  evt.preventDefault();

  createCard(placeInput.value, linkInput.value);
  closePopup(popupAddedCard);
}
formElementAdded.addEventListener('submit', handleAddImage);


// function onOverlayClick(evt) {
//   if (evt.target === evt.currentTarget) {
//       closePopup();
//   }
// }

// function addActionClose() {
//   const formList = Array.from(document.querySelectorAll('.popup'));
//   formList.forEach((form) => {
//       form.addEventListener('mousedown', onOverlayClick);
//       form.querySelector('.popup__btn-close').addEventListener('click', function() {
//           closePopup();
//       });
//   });
// }

// function closePopup() {
//   document.querySelector('.popup_opened').classList.remove('popup_opened');
//   document.removeEventListener('keydown', handleEscClose);
// }


const cardList = new Section({
  items: cardsGallery,
  renderer: (item) => {
    const card = new Card(item.name, item.link, '.elements__template', popupWithImage.openPopup(item));
    const cardElement = card.getView();
    cardList.addItem(cardElement);
  }
},'.elements__cards');

  cardList.renderItems();

function init() {
  const initFormAddedCard = new FormValidator(popupAddedCard.querySelector('.popup__form'), CONFIG);
  initFormAddedCard.enableValidation();
  buttonOpenPopupElement.addEventListener('click', () => openPopupAddedCard(initFormAddedCard));

  const initFormProfile = new FormValidator(popupProfile.querySelector('.popup__form'), CONFIG);
  initFormProfile.enableValidation();

  buttonOpenPopupProfile.addEventListener('click', () => openProfileForm(initFormProfile));

  // addActionClose();
}

init();