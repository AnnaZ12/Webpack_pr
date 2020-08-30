export default class Card {
  like(event) {
    // переключает значок лайка
    if (event.target.closest(".place-card__like-icon")) {
      event.target.classList.toggle("place-card__like-icon_liked");
    }

  }
  remove() {
    // удаляет карточку
    if (event.target.closest(".place-card__delete-icon")) {
      event.target.parentNode
        .closest(".places-list")
        .removeChild(event.target.closest(".place-card"));
    }

  }
  createElementsList(name, link) {

    /* 
    Альтернативный способ создания карточки. При нем не требуется создавать вручную все
    элементы с помощью createElement и пользовательские данные не вставляются через innerHTML
    const placeCard = document.createElement("div");
    placeCard.classList.add("place-card");
    placeCard.innerHTML = `
     <div class="place-card__image">
     <button class="place-card__delete-icon"></button>
     </div>
     <div class="place-card__description">
     <h3 class="place-card__name"></h3>
     <button class="place-card__like-icon"></button>
     </div>`;
    placeCard.querySelector(".place-card__name").textContent = place.name;
    placeCard.querySelector(".place-card__image").style.backgroundImage = `url(${place.link
    })`;
   */

    const placeCard = document.createElement("div");
    const placeCardImage = document.createElement("div");
    const placeCardDeleteIcon = document.createElement("button");
    const placeCardDescription = document.createElement("div");
    const placeCardName = document.createElement("h3");
    const placeCardLikeIcon = document.createElement("button");

    placeCard.classList.add("place-card");
    placeCardImage.classList.add("place-card__image");
    placeCardImage.style.backgroundImage = `url(${link})`;
    placeCardDeleteIcon.classList.add("place-card__delete-icon");
    placeCardDescription.classList.add("place-card__description");
    placeCardName.classList.add("place-card__name");
    placeCardName.textContent = name;
    placeCardLikeIcon.classList.add("place-card__like-icon");

    placeCard.appendChild(placeCardImage);
    placeCardImage.appendChild(placeCardDeleteIcon);
    placeCard.appendChild(placeCardDescription);
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardLikeIcon);

    return placeCard;
  }
}