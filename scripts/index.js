import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import PopupWithAvatar from "./PopupWithAvatar.js";
import UserInfo from "./UserInfo.js";
import { validationConfig } from "./validate.js";
import { api } from "../scripts/Api.js";

const cardsContainerSelector = ".cards__list";
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const profileImage = document.querySelector(".profile__image");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const avatarEditButton = document.querySelector(".profile__image-edit");
const profilePopupSelector = "#profile-edit-popup";
const addCardPopupSelector = "#new-card-popup";
const imagePopupSelector = ".popup__preview";

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage(imagePopupSelector);
imagePopup.setEventListeners();

const popupConfirmation = new PopupWithConfirmation("#popup-confirmation");
popupConfirmation.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open({ name, link });
}

const popupAvatar = new PopupWithAvatar("#popup-avatar", (newAvatarLink) => {
  popupAvatar.renderLoading(true);

  api
    .updateAvatar(newAvatarLink)
    .then(() => {
      profileAvatar.src = newAvatarLink;
      popupAvatar.close();
    })
    .finally(() => popupAvatar.renderLoading(false));
});

popupAvatar.setEventListeners();

avatarEditButton.addEventListener("click", () => popupAvatar.open());

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleCardClick,
    (cardInstance) => {
      popupConfirmation.open();
      popupConfirmation.setSubmitAction(() => {
        popupConfirmation.renderLoading(true);
        api
          .deleteCard(cardInstance.getId())
          .then(() => {
            cardInstance.deleteCard();
            popupConfirmation.close();
          })
          .finally(() => popupConfirmation.renderLoading(false));
      });
    },
    (cardId) => {
      api.addLike(cardId).then((updatedCard) => {
        card.updateLikes(updatedCard);
      });
    },
    (cardId) => {
      api.removeLike(cardId).then((updatedCard) => {
        card.updateLikes(updatedCard);
      });
    }
  );

  return card.generateCard();
}

const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  cardsContainerSelector
);

cardSection.renderItems();

function handleProfileFormUpdate() {
  editProfilePopup.renderLoading(true);

  const nameInput = document.querySelector("#form-input-title");
  const aboutInput = document.querySelector("#form-input-description");

  api
    .updateUserInfo(nameInput.value, aboutInput.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      profileImage.src = data.avatar;

      editProfilePopup.close();
    })
    .finally(() => {
      editProfilePopup.renderLoading(false);
    });
}

const editProfilePopup = new PopupWithForm(
  profilePopupSelector,
  handleProfileFormUpdate
);

editProfilePopup.setEventListeners();

function handleAddNewCard() {
  const nameInput = document.querySelector("#card-name-input");
  const linkInput = document.querySelector("#card-link-input");

  addCardPopup.renderLoading(true);

  api
    .addNewCard({
      name: nameInput.value,
      link: linkInput.value,
    })
    .then((newCardData) => {
      const cardElement = createCard(newCardData);
      cardSection.addItem(cardElement);
      addCardPopup.close();
    })
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
}

const addCardPopup = new PopupWithForm(addCardPopupSelector, handleAddNewCard);

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

api.getUserInfo().then((userData) => {
  profileImage.src = userData.avatar;
  profileImage.alt = `Imágen de perfil de ${userData.name}`;
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
});

api.getInitialCards().then((cards) => {
  const cardSection = new Section(
    {
      items: cards,
      renderer: (item) => {
        const cardElement = createCard(item);
        cardSection.addItem(cardElement);
      },
    },
    cardsContainerSelector
  );

  cardSection.renderItems();
});
