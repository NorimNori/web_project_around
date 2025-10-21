import Popup from "./Popup.js";

export default class PopupWithAvatar extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._input = this._form.querySelector(".popup__input");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._input.value);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
