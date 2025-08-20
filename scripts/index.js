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

function openPopup(popup) {
  popup.classList.add("popup_opened");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

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
