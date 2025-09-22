import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup, setPopupEventListeners } from "./utils.js";
import { initialCards, validationConfig } from "./validate.js";

const cardsContainer = document.querySelector(".cards__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const profilePopup = document.querySelector("#profile-edit-popup");
const addCardPopup = document.querySelector("#new-card-popup");
const imagePopup = document.querySelector(".popup__preview");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileForm = profilePopup.querySelector(".popup__form");
const nameInput = profileForm.querySelector("#form-input-title");
const jobInput = profileForm.querySelector("#form-input-description");

const addCardForm = addCardPopup.querySelector(".popup__form");
const cardNameInput = addCardForm.querySelector("#card-name-input");
const cardLinkInput = addCardForm.querySelector("#card-link-input");

setPopupEventListeners(profilePopup);
setPopupEventListeners(addCardPopup);
setPopupEventListeners(imagePopup);

initialCards.forEach((item) => {
  const card = new Card(item, "#card-template");
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
});

const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
});

addCardButton.addEventListener("click", () => openPopup(addCardPopup));

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
});

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const newCard = new Card(
    { name: cardNameInput.value, link: cardLinkInput.value },
    "#card-template"
  );

  cardsContainer.prepend(newCard.generateCard());
  addCardForm.reset();
  closePopup(addCardPopup);
});
