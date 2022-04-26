// const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
//     const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//     inputElement.classList.add(`${inputErrorClass}`);
//     errorElement.textContent = errorMessage;
//     errorElement.classList.add(`${errorClass}`);
//   };

// const enableValidation = function (object) {
//     showInputError(object.formSelector, object.inputSelector, object.inputErrorClass, object.errorClass, object.inputSelector.validationMessage);
//   };

function enableValidation(config) {
    const form = document.querySelector(config.formSelector);
    const inputs = form.querySelectorAll(config.inputSelector);

    inputs.forEach((element) => {
element.addEventListener('change', (event) => handleFormInput(event , form, config))
    });

    form.addEventListener('submit', (event) => handleFormSubmit(event , form));

    toggleButton(form, config);
};

function toggleButton(form, config) {
const button = document.querySelector(config.submitButtonSelector);
button.disabled = !form.checkValidity();

button.classList.toggle('popup__btn-save_disabled', !form.checkValidity())
}

function handleFormSubmit(event, form) {
    event.preventDefault();

    if (form.checkValidity()) {
        alert('validiti');
    } else {
        alert('not validiti');
        }
    };
    
function handleFormInput(event, form, config) {
const input = event.target;
const errorNode = document.querySelector(`#${input.id}-error`);

if (input.validity.valid) {
    errorNode.textContent = ''
} else {
        errorNode.textContent = input.validationMessage;
    }
    toggleButton(form, config);
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save'
});


// объект настроек с селекторами и классами формы
// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled', //серая кнопка
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible' });