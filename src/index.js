import "./style.css";
import './jsFiles/validation';
import Api from "./jsFiles/classApi";
import Card from "./jsFiles/classCard";
import CardList from './jsFiles/classCardList';
import Popup from './jsFiles/classPopup';



// Переменные
const rootMasterContainer = document.querySelector(".root");
const placesList = rootMasterContainer.querySelector(".places-list");
const form = document.forms.new;
const mainPopup = document.querySelector(".popup");
const popupClose = rootMasterContainer.querySelector(".popup__close");
const popupEdit = document.querySelector(".popup-edit");
const infoButton = rootMasterContainer.querySelector(".user-info__button");
const userEditButton = rootMasterContainer.querySelector(".user-info__edit-button");
const popupEditName = popupEdit.querySelector(".popup-edit__input_type_name");
const userJob = rootMasterContainer.querySelector(".user-info__job");
const userName = rootMasterContainer.querySelector(".user-info__name");
const popupForm = mainPopup.querySelector(".popup__form");
// const popupEditForm = popupEdit.querySelector(".popup-edit__form");
// popupEditForm заменили на editForm
const editForm = popupEdit.querySelector(".popup-edit__form");
export const popupButton = rootMasterContainer.querySelector(".popup__button");
const closeEditPopup = popupEdit.querySelector(".popup-edit__close");
const popupEditAbout = popupEdit.querySelector(".popup-edit__input_type_about");
const popUpImage = rootMasterContainer.querySelector(".popup-image");
const popUpAddImage = popUpImage.querySelector(".popup-image__big");
const popUpImageClose = popUpImage.querySelector(".popup-image__close");
// const editFormName = editForm.elements.userName;
// const editFormAbout = editForm.elements.userAbout;
const serverUrl =
  NODE_ENV === "development"
  // ? "http://praktikum.tk/cohort6"
   ? "https://nomoreparties.co/cohort6"
   : "https://praktikum.tk/cohort6";


const api = new Api({
  baseUrl: serverUrl,
  headers: {
    authorization: "7bf3f005-9eee-4302-adf3-c4d9b2b0ed3a",
    "Content-Type": "application/json"
  }
});

// экземпляр карточки
const сard = new Card();
// создаем контейнер для карточек с использованием класса CardList
const cardList = new CardList(placesList, сard, api);
// открытие/закрытие карточек с использованием класса Popup
const newPopup = new Popup(mainPopup, "popup_is-opened", popupClose, api);
const newEditPopup = new Popup(popupEdit, "popup-edit_is-opened", closeEditPopup, api);
const newPicPopup = new Popup(popUpImage, "popup-image_is-opened", popUpImageClose, api);


// получение и отображение информации пользователя с сервера
api
  .getProfile()
  .then(res => {
    userName.textContent = res.name;
    userJob.textContent = res.about;
  })
cardList.render();


// функция редактирования профиля, с привязкой к серверу
// !!!!!!!! было  popupEditForm
editForm.addEventListener("submit", function (event) {
  // Правильно что используете  event.preventDefault();
  event.preventDefault();

  api
    .saveProfile(popupEditName.value, popupEditAbout.value)
    .then(res => {
      // Правильно что используете строгое сравнение в проекте '==='
      if (res.name === popupEditName.value && res.about === popupEditAbout.value)
        userName.textContent = popupEditName.value;
      userJob.textContent = popupEditAbout.value;
      // привязка форм ввода к DOM-элементам
    }
    )
  popupEdit.classList.remove("popup-edit_is-opened"); // автоматичесое закрытие окна формы ввода
}
);


//функция добавления карточки
popupForm.addEventListener("submit", function (event) {
  //отправка формы на сервер
  event.preventDefault();
  let name = form.elements.name.value;
  let link = form.elements.link.value;
  cardList.addCard(name, link);

  popupButton.disabled = true;
  popupForm.reset(); //сброс  полей ввода
  mainPopup.classList.remove("popup_is-opened"); // автоматическое закрытие формы создания карточки
});


// слушатели лайк, удаление
placesList.addEventListener("click", function (event) {
  сard.like(event);
});
placesList.addEventListener("click", function (event) {
  сard.remove(event);
});


// слушатель на открытие попапа "Новое место"
infoButton.addEventListener("click", () => {
  newPopup.open();
});
// слушатель на открытие попапа "Редактировать профиль"
userEditButton.addEventListener("click", () => {
  newEditPopup.open();
});

// слушатель на открытие попапа "картинка"
placesList.addEventListener("click", (event) => {
  if (event.target.classList.contains("place-card__image")) {
    popUpAddImage.src = event.target.style.backgroundImage.slice(5, -2);
    newPicPopup.open();
  }
});