const formEditProfile = document.querySelector('.profile__edit-button');
const formAddCard = document.querySelector('.profile__add-button');
const modalWindow = document.querySelector('.popup');
const modalCloseBtn = document.querySelector('.popup__btn-close');
const profileForm = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_enter_name');
const jobInput = document.querySelector('.popup__input_enter_data');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
const placeInput = document.querySelector('.popup__input_enter_place');
const linkInput = document.querySelector('.popup__input_enter_link');
const modalWindowAddedCard = document.querySelector('.popup_type_profile-add');
const modalCloseBtnAdded = modalWindowAddedCard.querySelector('.popup__btn-close');
const formElementAdded = modalWindowAddedCard.querySelector('.popup__form');
const modalWindowViewImage = document.querySelector(".popup_type_image-view");
const popupViewImage = document.querySelector(".popup__pic");
const popupNamePlace = document.querySelector(".popup__name-place");
const modalCloseBtnImage = modalWindowViewImage.querySelector('.popup__btn-close');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup() {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
}

// Всплывающее окно редактирования профиля
function openProfileForm() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
    openPopup(modalWindow);
}

formEditProfile.addEventListener('click', openProfileForm);
modalCloseBtn.addEventListener('click', function() {
    closePopup();
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;
    closePopup();
}
profileForm.addEventListener('submit', formSubmitHandler);

function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        closePopup();
    }
} 
document.addEventListener('keydown', handleEscClose);

function onOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup();
    }
}
modalWindow.addEventListener('click', onOverlayClick);
modalWindowAddedCard.addEventListener('click', onOverlayClick);
modalWindowViewImage.addEventListener('click', onOverlayClick);

// Всплывающее окно добавления карточки

formAddCard.addEventListener('click', function() {
    openPopup(modalWindowAddedCard);
});
modalCloseBtnAdded.addEventListener('click', function() {
    closePopup(modalWindowAddedCard);
});

function formSubmitHandlerAdded(evt) {
    evt.preventDefault();
    closePopup(modalWindowAddedCard);
}
formElementAdded.addEventListener('submit', formSubmitHandlerAdded);


// Карточки
const cardsGallery = [{
    name: "Карачаевск",
    link: "./images/photo-karach-cher.png"
}, {
    name: "Гора Эльбрус",
    link: "./images/photo-mountain.png"
}, {
    name: "Домбай",
    link: "./images/photo-dombay.png"
}, {
    name: "Карачаевск",
    link: "./images/photo-karach-cher.png"
}, {
    name: "Гора Эльбрус",
    link: "./images/photo-dombay.png"
}, {
    name: "Домбай",
    link: "./images/photo-mountain.png"
}, ];
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
        openPopup(modalWindowViewImage);
    });

    return cardsElement;
}

modalCloseBtnImage.addEventListener('click', function() {
    closePopup(modalWindowViewImage);
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
    closePopup(modalWindowAddedCard);
}
formElementAdded.addEventListener("submit", handleAddImage);
addCardsGallery();

