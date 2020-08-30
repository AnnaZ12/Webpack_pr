export default class Api {
  constructor(options) {
    this.options = options;
  }
  getProfile() {
    // 1. Загрузка информации о пользователе с сервера

    return fetch(this.options.baseUrl + '/users/me', {
      headers: this.options.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(this.showErr);
}

  getInitialCards() {
    // 2. Загрузка первоначальных карточек с сервера

    return fetch(this.options.baseUrl + '/cards', {
      headers: this.options.headers
    }) 
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(this.showErr);
  }

  saveProfile(userName, userJob) {
    // 3. Редактирование профиля

    return fetch(this.options.baseUrl + '/users/me', {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        name: userName,
        about: userJob
     })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(this.showErr);
  }

  showErr(err) {
      return console.log(err);
    }
};