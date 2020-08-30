export default class CardList {
  // класс для хранения и отрисовки карточек
  constructor(container, cardTemplate, api) {
    this.container = container;
    this.cardTemplate = cardTemplate;
    this.api = api;
  }
  addCard(name, link) {
    //  добавление новых карточек
    const card = this.cardTemplate.createElementsList(name, link);
    this.container.insertAdjacentElement("beforeend", card);
  }
  render() {

    this.api
      .getInitialCards()
      .then(res => {
        res.forEach(card => {
          this.addCard(
            card.name,
            card.link,
          );
        });
      })
  }
};