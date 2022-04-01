// Всплывающее окно редактирования профиля
const formEditProfile = document.querySelector('.profile__edit-button');
const modalWindow = document.querySelector('.popup');
const modalCloseBtn = document.querySelector('.popup__btn-close');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_data');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
function OpenCloseModalWindow() {
modalWindow.classList.add('popup_opened');
nameInput.value = profileName.textContent;
jobInput.value = profileInfo.textContent;
}
formEditProfile.addEventListener('click' , OpenCloseModalWindow); 
modalCloseBtn.addEventListener('click' , function() {
    modalWindow.classList.remove('popup_opened');
}); 
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;
    OpenCloseModalWindow();
}
formElement.addEventListener('submit' , formSubmitHandler);



