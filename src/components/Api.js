export class Api {
  constructor(options) {
    this._token = options.baseUrl;
    this._authorization = options.headers.authorization;
    this._contentType = options.headers["Content-type"];
  }

  getInitialCards() {
    return fetch(`${this._token}/cards`, {
        method: 'GET',
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => console.log(`Error ${err}`));
  }

  addNewCard({
    name,
    link
  }) {
    return fetch(`${this._token}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._authorization,
          'Content-Type': `${this._contentType}`
        },
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => console.log(`Error ${err}`));
  }

  deleteCard(cardId) {
    return fetch(`${this._token}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
          'Content-Type': `${this._contentType}`
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => console.log(`Error ${err}`));
  }

  addLike(cardId) {
    return fetch(`${this._token}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this._authorization,
          'Content-Type': `${this._contentType}`
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => console.log(`Error ${err}`));

  }

  deleteLike(cardId) {
    return fetch(`${this._token}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._authorization,
          'Content-Type': `${this._contentType}`
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => console.log(`Error ${err}`));
  }

  getUserInfo() {
    return fetch(`${this._token}/users/me`, {
        method: 'GET',
        headers: {
          authorization: this._authorization
        }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => console.log(`Error ${err}`));
  }

  editProfile({
    name,
    description
  }) {
    return fetch(`${this._token}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-Type': `${this._contentType}`
        },
        body: JSON.stringify({
          name: name,
          about: description
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => console.log(`Error ${err}`));
  }

  editAvatar({
    link
  }) {
    return fetch(`${this._token}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._authorization,
          'Content-Type': `${this._contentType}`
        },
        body: JSON.stringify({
          avatar: `${link}`
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => console.log(`Error ${err}`));
  }
}
