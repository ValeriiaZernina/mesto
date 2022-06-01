export class FormValidator {
    _form;
    _config;

    constructor(form, config) {
        this._form = form;
        this._config = config;
        this._inputList = form.querySelectorAll(config.inputSelector);
        this._submitButton = form.querySelector(config.submitButtonSelector);
    }

    _toggleButton() {
        this._submitButton.disabled = !this._form.checkValidity();
        this._submitButton.classList.toggle(this._config.inactiveButtonClass, !this._form.checkValidity())
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

    _handleFormInput(event) {
        const input = event.target;

        if (input.validity.valid) {
            this._hideInputError(input);
        } else {
            this._showInputError(input, input.validationMessage);
        }
        this._toggleButton();
    }

    resetValidation() {
        this._inputList.forEach((element) => {
            this._hideInputError(element);
        });

        this._toggleButton();
    }

    enableValidation() {
        this._inputList.forEach((element) => {
            element.addEventListener('input', (event) => this._handleFormInput(event))
        });
    };
}