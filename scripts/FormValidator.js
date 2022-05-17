export class FormValidator {
  _form;
  _config;

  constructor(form, config) {
    this._form = form;
    this._config = config;
  }

  
  _toggleButton(form) {
    const button = form.querySelector(this._config.submitButtonSelector);
    button.disabled = !form.checkValidity();
    button.classList.toggle(this._config.inactiveButtonClass, !form.checkValidity())
  }
  
  _hideInputError(element) {
    element.classList.remove(this._config.inputErrorClass);
    const errorNode = this._form.querySelector(`#${element.id}-error`);
    errorNode.textContent = ''
  };
  
  _showInputError(element, validationMessage) {
    const errorNode = this._form.querySelector(`#${element.id}-error`);
    element.classList.add(this._config.inputErrorClass);
    errorNode.textContent = validationMessage;
  };
  
  _handleFormInput(event, form) {
    const input = event.target;
  
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input, input.validationMessage);
    }
    this._toggleButton(form);
  }

  reset() {
    const inputs = this._form.querySelectorAll(this._config.inputSelector);
    inputs.forEach((element) => {
      this._hideInputError(element);
    });
   
    this._toggleButton(this._form);
  }

  enableValidation() {
      const inputs = this._form.querySelectorAll(this._config.inputSelector);
  
      inputs.forEach((element) => {
        element.addEventListener('input', (event) => this._handleFormInput(event, this._form))
      });
    };
}