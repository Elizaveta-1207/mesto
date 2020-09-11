export class Api {
  constructor(options) {
    // тело конструктора
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-15/cards', {
        method: 'GET',
        headers: {
          authorization: '36046fe7-1e8e-4a22-8e60-7f2eb2d5b2d8'
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
    return fetch('https://mesto.nomoreparties.co/v1/cohort-15/cards', {
        method: 'POST',
        headers: {
          authorization: '36046fe7-1e8e-4a22-8e60-7f2eb2d5b2d8',
          'Content-Type': 'application/json'
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
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-15/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: '36046fe7-1e8e-4a22-8e60-7f2eb2d5b2d8',
          'Content-Type': 'application/json'
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
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-15/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: '36046fe7-1e8e-4a22-8e60-7f2eb2d5b2d8',
          'Content-Type': 'application/json'
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
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-15/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: '36046fe7-1e8e-4a22-8e60-7f2eb2d5b2d8',
          'Content-Type': 'application/json'
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
    return fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me', {
        method: 'GET',
        headers: {
          authorization: '36046fe7-1e8e-4a22-8e60-7f2eb2d5b2d8'
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
    return fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me', {
        method: 'PATCH',
        headers: {
          authorization: '36046fe7-1e8e-4a22-8e60-7f2eb2d5b2d8',
          'Content-Type': 'application/json'
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
    return fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me/avatar', {
        method: 'PATCH',
        headers: {
          authorization: '36046fe7-1e8e-4a22-8e60-7f2eb2d5b2d8',
          'Content-Type': 'application/json'
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
