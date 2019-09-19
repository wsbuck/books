function loginUser(credentials) {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:8000/api/v1/api-token-auth/';
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
        // console.log(data);
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
    const url = 'http://localhost:8000/api/v1/users/create/';
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
    const url = `http://localhost:8000/api/v1/books/?page=${pageNum}`;
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
    const url = 'http://localhost:8000/api/v1/authors/';
    fetch(url, {
      method: 'POST',
      body: formData
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
    const url = 'http://localhost:8000/api/v1/genres/';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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

function fetchAddBookData() {
  return new Promise((resolve, reject) => {
    const url = 'http://localhost:8000/api/v1/add/book/';
    fetch (url, {
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


export { 
  loginUser,
  logoutUser,
  signupUser,
  getBookList,
  createAuthor,
  fetchAddBookData,
  createGenre,
};