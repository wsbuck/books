const host = '157.245.228.28';
// const host = 'localhost:8000'

function loginUser(credentials) {
  return new Promise((resolve, reject) => {
    const url = `http://${host}/api/v1/api-token-auth/`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        username: credentials.email,
        password: credentials.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          resolve(false);
        }
      })
      .then((data) => {
        localStorage.setItem('authtoken', data.token);
        resolve(true);
      })
      .catch(e => {
        resolve(false);
      });
  });
}

function logoutUser() {
  return new Promise((resolve, reject) => {
    localStorage.removeItem('authtoken');
    resolve(false);
  });
}

function signupUser(userData) {
  return new Promise((resolve, reject) => {
    const url = `http://${host}/api/v1/users/create/`;
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password: userData.password,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json()
        } else {
          resolve(false);
        }
      })
      .then((data) => {
        localStorage.setItem('authtoken', data.token);
        resolve(true);
      })
      .catch((e) => console.error(e));
  });
}

function getBookList(pageNum) {
  return new Promise((resolve, reject) => {
    const url = `http://${host}/api/v1/books/?page=${pageNum}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          reject();
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((e) => console.error(e));
  });
}

function createAuthor(formData) {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('authtoken');
    const url = `http://${host}/api/v1/authors/`;
    fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          resolve(false);
        }
      })
      .then((data) => {
        resolve(data.pk);
      })
      .catch((e) => console.error(e));
  });
}

function createGenre(data) {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('authtoken');
    const url = `http://${host}/api/v1/genres/`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        category: data.category
      })
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          resolve(false);
        }
      })
      .then((data) => {
        resolve(data.pk);
      })
      .catch((e) => console.error(e));
  });
}

function createBook(formData) {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('authtoken');
    const url = `http://${host}/api/v1/add/book/`;
    fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          resolve(false);
        }
      })
      .then((data) => {
        resolve(true);
      })
      .catch((e) => console.error(e));
  });
}

function fetchAddBookData() {
  return new Promise((resolve, reject) => {
    const url = `http://${host}/api/v1/add/book/`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        } else {
          resolve(false);
        }
      })
      .then((data) => {
        resolve(data)
      })
      .catch((e) => console.error(e))
  });
}

function fetchBookDetail(pk) {
  return new Promise((resolve, reject) => {
    const url = `http://${host}/api/v1/books/${pk}/`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          resolve(false);
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((e) => console.error(e))
  });
}

function fetchReviews(bookPk) {
  return new Promise((resolve, reject) => {
    const url = `http://${host}/api/v1/books/${bookPk}/reviews/`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          reject();
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((e) => console.error(e))
  });
}

function createReview(data) {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('authtoken');
    const url = `http://${host}/api/v1/books/${data.book}/reviews/`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        content: data.content,
        star_rating: String(data.rating),
        book: data.book
      })
    })
      .then((res) => {
        if (res.status === 201) {
          return res.json();
        } else {
          resolve(false);
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((e) => console.error(e));
  });
}

function updateRead(bookPk) {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('authtoken');
    const url = `http://${host}/api/v1/books/${bookPk}/read/`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({
        book: bookPk
      })
    })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          return res.json();
          // resolve(true);
        } else {
          reject();
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((e) => console.error(e))
  });
}

function fetchReadStatus(bookPk) {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('authtoken');
    const url = `http://${host}/api/v1/books/${bookPk}/read/`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((e) => console.error())
  })
}

function getReadList(pageNum) {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem('authtoken');
    const url = `http://${host}/api/v1/books/read/?page=${pageNum}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          reject();
        }
      })
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((e) => console.error(e));
  });
}


export {
  loginUser,
  logoutUser,
  signupUser,
  getBookList,
  createAuthor,
  fetchAddBookData,
  createGenre,
  createBook,
  fetchBookDetail,
  fetchReviews,
  createReview,
  updateRead,
  fetchReadStatus,
  getReadList,
};