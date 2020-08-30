import {popupButton } from '../index';
// Валидация
export const errorMessages = {
  emptyField: "Это обязательное поле",
  wrongLength: "Должно быть от 2 до 30 символов",
  notUrl: "Здесь должна быть ссылка"
};

export const popupInputAddCardForm = document.querySelectorAll(
  ".popup__input_add-card"
);
export const popupInputEditCardForm = document.querySelectorAll(
  ".popup-edit__input-profile"
);
export const saveButton = document.querySelector(".popup-edit__button");

// проверка поля на валидность
export function checkValidate(input) {
  if (input.validity.valueMissing) {
    // если введенный элемент пустой
    setInvalid(input, errorMessages.emptyField); // невалидно + сообщение об ошибке
    return false;
  }
  if (input.type === "text" && !input.validity.valid) {
    // если вводится значение в поле с атрибутом текст и есть проблемы с валидностью
    setInvalid(input, errorMessages.wrongLength); // невалидно + другое сообщение об ошибке
    return false;
  }
  if (input.type === "url" && !input.validity.valid) {
    // если вводится значение в поле с атрибутом ссылка и есть проблемы с валидностью
    setInvalid(input, errorMessages.notUrl); // невалидно +  третье сообщение об ошибке
    return false;
  }
  setValid(input); // в иных случаях введенные значения валидны
  return true;
}

// функция, которая срабатывает если поле невалидно
export function setInvalid(input, message) {
  input.classList.add("popup__input_invalid"); // добавляем новый класс "невалидно"
  input.nextElementSibling.textContent = message; // устанавливаем сообщение соседу инпута, то есть классу "невалидно"
  input.nextElementSibling.classList.add("popup__error_active"); // устанавливаем этому же полю активацию ошибки
}

// функция, которая срабатывает если поле валидно
export function setValid(input) {
  input.classList.remove("popup__input_invalid"); // удаляем класс "невалидно"
  input.nextElementSibling.textContent = ""; // соседнее поле пустое
}

// получение доступа к формам
export const newForm = document.forms.new;
export const editForm = document.forms.editProfile;

// проверка формы добавления карточки
export function checkFildsAddForm() {
  const newFormName = newForm.elements.name; // проверка элемента имени в форме добавления
  const newFormLink = newForm.elements.link; // проверка элемента ссылки
  //let popupButton = rootMasterContainer.querySelector(".popup__button");

  // можно так сделать   if (checkValidate(newFormName)  && checkValidate(newFormLink))
  if (
    checkValidate(newFormName) === true &&
    checkValidate(newFormLink) === true
  ) {
    // если функция валидности имени и ссылки true
    switchOnButton(popupButton); // кнопка добавления активна
  } else {
    switchOffButton(popupButton); // кнопка добавления неактивна
  }
}

// проверка формы редактирования
export function checkFildsEditForm() {
  const editFormName = editForm.elements.userName; // проверка имени в форме редактирования
  const editFormAbout = editForm.elements.userAbout; // проверка инфо

  if (
    checkValidate(editFormName) === true &&
    checkValidate(editFormAbout) === true
  ) {
    // если функция валидности имени и инфо true
    switchOnButton(saveButton); // кнопка редактирования активна
  } else {
    switchOffButton(saveButton); // кнопка редактирования неактивна
  }
}

// выключение кнопки формы
export function switchOffButton(button) {
  // механизм активации кнопки выключения
  button.setAttribute("disabled", true); // на кнопку устаналивает атрибут блокировки формы
  button.classList.add("popup__button_disabled"); // добавляет на кнопку класс блокировки
}

// включение кнопки формы
export function switchOnButton(button) {
  // механизм активации кнопки включения
  button.removeAttribute("disabled", true); // с кнопки удаляет атрибут блокировки формы
  button.classList.remove("popup__button_disabled"); // удаляет класс блокировки
}

// вешаем слушатели на все инпуты формы Add
popupInputAddCardForm.forEach(input => {
  // в новом классе инпутов в форме добавления перебираем
  input.addEventListener("input", () => {
    // все что введено
    checkValidate(input); // проверяем поле на валидность спец.функцией
    checkFildsAddForm(); // проверяем форму добавления
  });
});

// вешаем слушатели на все инпуты формы Edit
popupInputEditCardForm.forEach(input => {
  // в новом классе инпутов в форме редактирования перебираем
  input.addEventListener("input", () => {
    checkValidate(input);
    checkFildsEditForm();
  });
});