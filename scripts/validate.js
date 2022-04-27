function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    for (const form of forms){
        const inputs = form.querySelectorAll(config.inputSelector);

    inputs.forEach((element) => {
element.addEventListener('change', (event) => handleFormInput(event , form, config))
    });

    //form.addEventListener('submit', (event) => handleFormSubmit(event , form));

    // toggleButton(form, config); 
    }
   
};

function toggleButton(form, config) {
const button = form.querySelector(config.submitButtonSelector);
button.disabled = !form.checkValidity();

button.classList.toggle('popup__btn-save_disabled', !form.checkValidity())
}

// function handleFormSubmit(event, form) {
//     event.preventDefault();

//     if (form.checkValidity()) {
//         alert('validiti');
//     } else {
//         alert('not validiti');
//         }
//     };
    
function handleFormInput(event, form, config) {
const input = event.target;
const errorNode = document.querySelector(`#${input.id}-error`);

const showInputError = (element, validationMessage) => {
    element.classList.add('popup__input_type-error');
    errorNode.textContent = validationMessage;
  };
  
  const hideInputError = (element) => {
    element.classList.remove('popup__input_type-error');
    errorNode.textContent = ''
  };

if (input.validity.valid) {
    hideInputError(input);
} else { 
    showInputError(input, input.validationMessage);
    }
    toggleButton(form, config);
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
});