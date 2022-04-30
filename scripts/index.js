// переменные каждого popup окна
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupElement = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_type_profile-edit');
const popupProfileCloseBtn = popupProfile.querySelector('.popup__btn-close');
const profileForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_enter_name');
const jobInput = document.querySelector('.popup__input_enter_data');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
const placeInput = document.querySelector('.popup__input_enter_place');
const linkInput = document.querySelector('.popup__input_enter_link');
const popupAddedCard = document.querySelector('.popup_type_profile-add');
const popupCloseBtnAddedCard = popupAddedCard.querySelector(
'.popup__btn-close');
const formElementAdded = popupAddedCard.querySelector('.popup__form');
const popupShowImage = document.querySelector(".popup_type_image-view");
const popupCloseBtnImage = popupShowImage.querySelector('.popup__btn-close');
const popupViewImage = document.querySelector(".popup__pic");
const popupNamePlace = document.querySelector(".popup__name-place");

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

function closePopup() {
  document.querySelector('.popup_opened').classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Всплывающее окно редактирования профиля
function openProfileForm() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
  openPopup(popupProfile);
  resetFormValidation(popupProfile, CONFIG);
}

buttonOpenPopupProfile.addEventListener('click', openProfileForm);
popupProfileCloseBtn.addEventListener('click', function() {
  closePopup();
});

function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileInfo.textContent = jobInput.value;
  closePopup();
}
profileForm.addEventListener('submit', submitProfileForm);

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function onOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
}
popupProfile.addEventListener('mousedown', onOverlayClick);
popupAddedCard.addEventListener('mousedown', onOverlayClick);
popupShowImage.addEventListener('mousedown', onOverlayClick);

// Всплывающее окно добавления карточки

buttonOpenPopupElement.addEventListener('click', function() {
  formElementAdded.reset();
  openPopup(popupAddedCard);
  resetFormValidation(popupAddedCard, CONFIG);
});
popupCloseBtnAddedCard.addEventListener('click', function() {
  closePopup(popupAddedCard);
});

function formSubmitHandlerAdded(evt) {
  evt.preventDefault();
  closePopup(popupAddedCard);
}

formElementAdded.addEventListener('submit', () => {
    handleAddImage();
});

// Карточки
const cardsContainer = document.querySelector('.elements__cards');
const template = document.querySelector('.elements__template');

function addCardsGallery() {
  cardsGallery.forEach(item => renderCard(createElement(item)));
}

function renderCard(card) {
  cardsContainer.prepend(card);
}

function createElement(item) {
  const cardsElement = template.content.cloneNode(true);
  const locationCards = cardsElement.querySelector(".elements__location");
  const imageCards = cardsElement.querySelector(".elements__image");
  const removeButton = cardsElement.querySelector(".elements__trash-icon");
  const likeButton = cardsElement.querySelector(".elements__btn");
  locationCards.textContent = item.name;
  imageCards.alt = item.name;
  imageCards.src = item.link;
  likeButton.addEventListener('click', handleAddLike);
  removeButton.addEventListener('click', handleRemoveCard);
  imageCards.addEventListener("click", function(evt) {
    const el = evt.target;
    popupViewImage.src = el.getAttribute("src");
    popupViewImage.alt = el.getAttribute("alt");
    popupNamePlace.textContent = el.getAttribute("alt");
    openPopup(popupShowImage);
  });
  return cardsElement;
}

popupCloseBtnImage.addEventListener('click', function() {
  closePopup(popupShowImage);
});

//  Удаление карточки
function handleRemoveCard(evt) {
  const deleteCard = evt.target.closest('.elements__card');
  deleteCard.remove();
}
// Лайк
function handleAddLike(evt) {
  evt.target.classList.toggle('elements__btn_active');
}
// Добавление картинки
function handleAddImage(evt) {
  evt.preventDefault();
  const card = createElement({
    name: placeInput.value,
    link: linkInput.value,
  });
  renderCard(card);
  closePopup(popupAddedCard);
}

addCardsGallery();

