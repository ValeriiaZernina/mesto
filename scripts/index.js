// Всплывающее окно редактирования профиля
const formEditProfile = document.querySelector('.profile__edit-button');
const modalWindow = document.querySelector('.popup');
const modalCloseBtn = document.querySelector('.popup__btn-close');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_enter_name');
const jobInput = document.querySelector('.popup__input_enter_data');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
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



