const formEditProfile = document.querySelector('.profile__edit-button');
const formAddCard = document.querySelector('.profile__add-button');
const modalWindow = document.querySelector('.popup');
const modalCloseBtn = document.querySelector('.popup__btn-close');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_enter_name');
const jobInput = document.querySelector('.popup__input_enter_data');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');

const placeInput = document.querySelector('.popup__input_enter_place');
const linkInput = document.querySelector('.popup__input_enter_link');
const modalWindowAddedCard = document.querySelector('.popup_cards-add');
const modalCloseBtnAdded = modalWindowAddedCard.querySelector('.popup__btn-close');
const formElementAdded = modalWindowAddedCard.querySelector('.popup__form');

const modalWindowViewImage = document.querySelector(".popup_image");
const popupViewImage = document.querySelector(".popup__pic");
const popupNamePlace = document.querySelector(".popup__name-place");
const modalCloseBtnImage = modalWindowViewImage.querySelector('.popup__btn-close');

// Всплывающее окно редактирования профиля
function openCloseModalWindow() {
modalWindow.classList.add('popup_opened');
nameInput.value = profileName.textContent;
jobInput.value = profileInfo.textContent;
}

function closeModalWindow() {
    modalWindow.classList.remove('popup_opened');
}

formEditProfile.addEventListener('click' , openCloseModalWindow); 
modalCloseBtn.addEventListener('click' , closeModalWindow); 
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;
    closeModalWindow();
}

formElement.addEventListener('submit' , formSubmitHandler);

// Всплывающее окно добавления карточки

function openModalWindowAdded() {
    modalWindowAddedCard.classList.add('popup_opened');
    }
function closeModalWindowAdded() {
    modalWindowAddedCard.classList.remove('popup_opened');
    }

formAddCard.addEventListener('click' , openModalWindowAdded); 
modalCloseBtnAdded.addEventListener('click' , closeModalWindowAdded); 
function formSubmitHandlerAdded (evt) {
    evt.preventDefault();
    closeModalWindowAdded();
}

 formElementAdded.addEventListener('submit' , formSubmitHandlerAdded);

// Карточки
const CARDS_GALLERY = [ 
    { name: "Карачаевск" , link: "./images/photo-karach-cher.png" },
    { name: "Гора Эльбрус" , link: "./images/photo-mountain.png" },
    { name: "Домбай" , link: "./images/photo-dombay.png" },
    { name: "Карачаевск", link: "./images/photo-karach-cher.png" },
    { name: "Гора Эльбрус" , link: "./images/photo-dombay.png" },
    { name: "Домбай", link: "./images/photo-mountain.png" },
];
const cardsContainer = document.querySelector('.elements__cards');
const template = document.querySelector('.elements__template');

function addCardsGallery() {
  const html = CARDS_GALLERY.map(getElement);
  cardsContainer.append(...html);
}

 function getElement(item) {
  const cardsElement = template.content.cloneNode(true);
  const locationCards = cardsElement.querySelector(".elements__location");
  const imageCards = cardsElement.querySelector(".elements__image");
  const removeButton = cardsElement.querySelector(".elements__trash-icon");
  const likeButton = cardsElement.querySelector(".elements__btn");

  locationCards.textContent = item.name;
  imageCards.alt = item.name;
  imageCards.src = item.link;

  likeButton.addEventListener('click' , handleAddLike);
  removeButton.addEventListener('click' , handleRemoveCard);
 imageCards.addEventListener("click", function (evt) {
      const el = evt.target;
      popupViewImage.src = el.getAttribute("src");
      popupViewImage.alt = el.getAttribute("alt");
      popupNamePlace.textContent = el.getAttribute("alt");
    openCloseModalWindowImage();
  });
  
  return cardsElement;
 }

 function closeModalWindowImage() {
    modalWindowViewImage.classList.remove('popup_opened');
}
 modalCloseBtnImage.addEventListener('click' , closeModalWindowImage); 

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
const newImageOnPage = getElement({
    name: placeInput.value,
    link: linkInput.value,
});
cardsContainer.prepend(newImageOnPage);
closeModalWindow(modalWindowAddedCard);
}
formElementAdded.addEventListener("submit", handleAddImage);
 
//Окно просмотра картинки
function openCloseModalWindowImage() {
modalWindowViewImage.classList.add('popup_opened');
}
 addCardsGallery();