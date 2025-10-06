import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import { initialCards, validationConfig } from "./validate.js";

const cardsContainerSelector = ".cards__list";
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const profilePopupSelector = "#profile-edit-popup";
const addCardPopupSelector = "#new-card-popup";
const imagePopupSelector = ".popup__preview";

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

function createCard(data) {
  const card = new Card(data, "#card-template", (name, link) => {
    imagePopup.open({ name, link });
  });
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  cardsContainerSelector
);
console.log(initialCards);

cardSection.renderItems();

const editProfilePopup = new PopupWithForm(profilePopupSelector, () => {
  const { name, job } = userInfo.getUserInfo();

  const nameInput = document.querySelector("#form-input-title");
  const jobInput = document.querySelector("#form-input-description");

  userInfo.setUserInfo({
    name: nameInput.value,
    job: jobInput.value,
  });

  editProfilePopup.close();
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(addCardPopupSelector, () => {
  const nameInput = document.querySelector("#card-name-input");
  const linkInput = document.querySelector("#card-link-input");

  const newCard = createCard({
    name: nameInput.value,
    link: linkInput.value,
  });

  cardSection.addItem(newCard);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

const formList = Array.from(document.querySelectorAll(".popup__form"));
formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);
  formValidator.enableValidation();
});

profileEditButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();

  const nameInput = document.querySelector("#form-input-title");
  const jobInput = document.querySelector("#form-input-description");

  nameInput.value = name;
  jobInput.value = job;

  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open();
});
