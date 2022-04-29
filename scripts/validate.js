const CONFIG = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    errorClass: '.popup__input-error',
    inputErrorClass:'popup__input_type-error'
}

function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    for (const form of forms){
        const inputs = form.querySelectorAll(config.inputSelector);

    inputs.forEach((element) => {
element.addEventListener('change', (event) => handleFormInput(event , form, config))
    });
    }
   
};

function toggleButton(form, config) {
const button = form.querySelector(config.submitButtonSelector);
button.disabled = !form.checkValidity();

button.classList.toggle('popup__btn-save_disabled', !form.checkValidity())
}

function hideInputError(element) {
    element.classList.remove(CONFIG.inputErrorClass);
    const errorNode = document.querySelector(`#${element.id}-error`);
    errorNode.textContent = ''
  };
  
function handleFormInput(event, form, config) {
const input = event.target;
const errorNode = document.querySelector(`#${input.id}-error`);

const showInputError = (element, validationMessage) => {
    element.classList.add(config.inputErrorClass);
    errorNode.textContent = validationMessage;
  };
  
  

if (input.validity.valid) {
    hideInputError(input);
} else { 
    showInputError(input, input.validationMessage);
    }
    toggleButton(form, config);
}

//сброс валидации и инпутов для повторного открытия спанов
function resetFormValidation(modalWindow) 
{
    const inputsModal = Array.from(modalWindow.querySelectorAll(CONFIG.inputSelector));
    inputsModal.forEach((element) => {
        hideInputError(element);
      });
    }

    
enableValidation(CONFIG);