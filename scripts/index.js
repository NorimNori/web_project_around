let profileEditButton = document.querySelector(".profile__edit-button");
let profileEditPopup = document.querySelector(".popup");
let closeEditModalButton = document.querySelector(".popup__close");
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");
let nameInput = document.querySelector("#form-input-title");
let jobInput = document.querySelector("#form-input-description");
let formElement = profileEditPopup.querySelector(".popup__form");
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

function openPopup(popup) {
  popup.classList.add("popup_opened");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

closeImagePopupButton.addEventListener("click", () => closePopup(imagePopup));

profileEditButton.addEventListener("click", () => openPopup(profileEditPopup));

closeEditModalButton.addEventListener("click", () =>
  closePopup(profileEditPopup)
);

newCardButton.addEventListener("click", () => openPopup(newCardPopup));

closeNewCardPopupButton.addEventListener("click", () =>
  closePopup(newCardPopup)
);

function handleProfileFormSubmit(e) {
  e.preventDefault();

  let nameInput = document.querySelector("#form-input-title");
  let jobInput = document.querySelector("#form-input-description");

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

formElement.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
    popupTitle.textContent = cardData.name;

    openPopup(imagePopup);
  });

  return cardElement;
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const cardName = newCardPopup.querySelector("#card-name-input").value;
  const cardLink = newCardPopup.querySelector("#card-link-input").value;
  const newCard = getCardElement({ name: cardName, link: cardLink });
  cardsList.prepend(newCard);
  closePopup(newCardPopup);
  formElement.reset();
}

newCardPopup.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.prepend(cardElement);
});
