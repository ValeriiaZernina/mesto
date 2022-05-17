const CONFIG = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__btn-save',
    inactiveButtonClass: 'popup__btn-save_disabled',
    errorClass: '.popup__input-error',
    inputErrorClass: 'popup__input_type-error'
  }
  
  function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    for (const form of forms) {
      const inputs = form.querySelectorAll(config.inputSelector);
  
      inputs.forEach((element) => {
        element.addEventListener('input', (event) => handleFormInput(event,
          form, config))
      });
    }
  };
  
  function toggleButton(form, config) {
    const button = form.querySelector(config.submitButtonSelector);
    button.disabled = !form.checkValidity();
    button.classList.toggle(config.inactiveButtonClass, !form.checkValidity())
  }
  
  function hideInputError(element, config) {
    element.classList.remove(config.inputErrorClass);
    const errorNode = document.querySelector(`#${element.id}-error`);
    errorNode.textContent = ''
  };
  
  function showInputError(element, config, validationMessage) {
    const errorNode = document.querySelector(`#${element.id}-error`);
    element.classList.add(config.inputErrorClass);
    errorNode.textContent = validationMessage;
  };
  
  function handleFormInput(event, form, config) {
    const input = event.target;
  
    if (input.validity.valid) {
      hideInputError(input, config);
    } else {
      showInputError(input, config, input.validationMessage);
    }
    toggleButton(form, config);
  }
  
  //сброс валидации и инпутов для повторного открытия спанов
  function resetFormValidation(modalWindow, config) {
    const inputsModal = Array.from(modalWindow.querySelectorAll(config
      .inputSelector));
    inputsModal.forEach((element) => {
      hideInputError(element, config);
    });
    const form = modalWindow.querySelector(config.formSelector);
    toggleButton(form, config);
  }
  
  enableValidation(CONFIG);
  
  