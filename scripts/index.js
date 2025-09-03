import {
  enableValidation,
  validationConfig,
  resetValidation,
} from "./validate.js";
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup");
const closeEditPopupButton = document.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector("#form-input-title");
const jobInput = document.querySelector("#form-input-description");
const formElement = profileEditPopup.querySelector(".popup__form");
const newCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const closeNewCardPopupButton = newCardPopup.querySelector(
  "#new-card-popup-close-button"
);
const cardsList = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const imagePopup = document.querySelector(".popup__preview");
const popupImage = imagePopup.querySelector(".popup__image-preview");
const popupTitle = document.querySelector(".popup__image-title");
const closeImagePopupButton = document.querySelector(
  ".popup__close_image-preview"
);

const initialCards = [
  {
    name: "Silent Hill, Toluca Lake",
    link: "https://plus.unsplash.com/premium_photo-1669689972709-c4a9a9a4cbbe?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "3600 Prospect Street",
    link: "https://plus.unsplash.com/premium_photo-1676657955502-405b78e1e900?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Wizard Island",
    link: "https://images.unsplash.com/photo-1706195015965-9ba2e20b5837?q=80&w=1631&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Black Hills Forest",
    link: "https://plus.unsplash.com/premium_photo-1698501025921-53646a4279c2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Raccon City, police station",
    link: "https://images.unsplash.com/photo-1730492109404-bf4ad0a78f3b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Hotel Timberline",
    link: "https://images.unsplash.com/photo-1714237570574-bffa98593a68?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

initialCards.forEach((cardData) => {
  cardsList.prepend(createCard(cardData));
});

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

function enablePopupOverlayClose() {
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    popup.addEventListener("mousedown", handleOverlayClick);
  });
}

function handleProfileFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();

  const cardName = e.target.querySelector("#card-name-input").value;
  const cardLink = e.target.querySelector("#card-link-input").value;

  cardsList.prepend(createCard({ name: cardName, link: cardLink }));

  closePopup(newCardPopup);
  e.target.reset();
}

function createCard({ name, link }) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__like-button_active")
  );

  deleteButton.addEventListener("click", () => cardElement.remove());

  cardImage.addEventListener("click", () => {
    popupImage.src = link;
    popupImage.alt = name;
    popupTitle.textContent = name;
    openPopup(imagePopup);
  });

  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  resetValidation(formElement, validationConfig);
  openPopup(profileEditPopup);
});

closeEditPopupButton.addEventListener("click", () =>
  closePopup(profileEditPopup)
);
formElement.addEventListener("submit", handleProfileFormSubmit);

newCardButton.addEventListener("click", () => {
  const newCardForm = newCardPopup.querySelector(".popup__form");

  resetValidation(newCardForm, validationConfig);

  openPopup(newCardPopup);
});
closeNewCardPopupButton.addEventListener("click", () =>
  closePopup(newCardPopup)
);
newCardPopup.addEventListener("submit", handleAddCardFormSubmit);

closeImagePopupButton.addEventListener("click", () => closePopup(imagePopup));

enableValidation(validationConfig);
enablePopupOverlayClose();
