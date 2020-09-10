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
      });
    // .then((result) => {
    //   console.log(result);
    //   // return result;
    // });
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
          // name: 'Петухи',
          // link: 'https://www.igrushki-rukami-svoimi.ru/wp-content/uploads/2016/10/Kartinki-i-foto-petuha-7.jpg'
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
      });
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
      });
  }

  addLike(card) {
    fetch(`https://mesto.nomoreparties.co/v1/cohort-15/cards/${card._id}`, {
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
      .then((result) => {
        console.log(result);
      });

  }

  deleteLike(card) {
    fetch(`https://mesto.nomoreparties.co/v1/cohort-15/cards/${card._id}`, {
      method: 'DELETE',
      headers: {
        authorization: '36046fe7-1e8e-4a22-8e60-7f2eb2d5b2d8',
        'Content-Type': 'application/json'
      }
    });
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
      });
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
          // name: 'Elizaveta Timonina',
          // about: 'Master of science'
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
      });
  }

  editAvatar() {
    fetch('https://mesto.nomoreparties.co/v1/cohort-15/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: '36046fe7-1e8e-4a22-8e60-7f2eb2d5b2d8',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: '../images/profile-avatar-me.jpg'
      })
    });
  }

  // другие методы работы с API
}
