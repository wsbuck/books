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

export { loginUser, logoutUser };