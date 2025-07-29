const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup");
const closeEditModalButton = document.querySelector(".popup__close");

function openPopup() {
  profileEditPopup.classList.add("popup_opened");
}

function closePopup() {
  profileEditPopup.classList.remove("popup_opened");
}

profileEditButton.addEventListener("click", openPopup);
profileEditPopup.addEventListener("click", closePopup);
