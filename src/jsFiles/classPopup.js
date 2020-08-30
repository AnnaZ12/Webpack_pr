export default class Popup {
    // класс для всплывающего окна
    constructor(element, openClassName, closeElement, api) {
      this.element = element;
      this.openClassName = openClassName;
      this.api = api;
      closeElement.addEventListener("click", () => this.close());
    }
  
    open() {
      this.element.classList.add(this.openClassName);
    }
  
    close() {
      this.element.classList.remove(this.openClassName);
    }
  }