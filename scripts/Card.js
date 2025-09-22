export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLike());
    this._deleteButton.addEventListener("click", () => this._handleDelete());
    this._image.addEventListener("click", () => this._handlePreview());
  }

  _handleLike() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  _handlePreview() {
    const popupImage = document.querySelector(".popup__preview");
    const popupImgElement = popupImage.querySelector(".popup__image-preview");
    const popupCaption = popupImage.querySelector(".popup__image-title");

    popupImgElement.src = this._link;
    popupImgElement.alt = this._name;
    popupCaption.textContent = this._name;

    import("./utils.js").then(({ openPopup }) => {
      openPopup(popupImage);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".card__image");
    this._title = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
