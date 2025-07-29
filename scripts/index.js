let profileEditButton = document.querySelector(".profile__edit-button");
let profileEditPopup = document.querySelector(".popup");
let closeEditModalButton = document.querySelector(".popup__close");
let profileTitle = document.querySelector(".profile__title");
let profileDescription = document.querySelector(".profile__description");
let nameInput = document.querySelector("#form-input-title");
let jobInput = document.querySelector("#form-input-description");
let formElement = profileEditPopup.querySelector(".popup__form");

function openPopup() {
  profileEditPopup.classList.add("popup_opened");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function closePopup() {
  profileEditPopup.classList.remove("popup_opened");
}

profileEditButton.addEventListener("click", openPopup);
closeEditModalButton.addEventListener("click", closePopup);

function handleProfileFormSubmit(e) {
  e.preventDefault();

  let nameInput = document.querySelector("#form-input-title");
  let jobInput = document.querySelector("#form-input-description");

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
