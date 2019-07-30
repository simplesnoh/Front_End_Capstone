import * as firebase from 'firebase/app';
import 'firebase/auth'

const url = 'http://localhost:8088/users';

const setUserInLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
}

export const saveUserToJsonServer = (user) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .then(newUser => {
      setUserInLocalStorage(newUser);
      return newUser;
    });
}


export const getUser = (userId) => {
  return fetch(`${url}/${userId}`)
    .then(res => res.json());
}

export const login = (email) => {
  // NOTE: json-server will return an array, but we only expect one or none users to come back so we just take the first one
  return fetch(`${url}?email=${email}`)
    .then(res => res.json())
    .then(matchingUsers => {
      if (!matchingUsers.length) {
        alert('No user exists with that email address');
        return;
      }
      const user = matchingUsers[0];
      setUserInLocalStorage(user);
      return user;
    });
}

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');

  if (!user) return null;

  return JSON.parse(user);
}

export const logout = () => {
  localStorage.removeItem('user');
}

export const register = (userForm) => {
  return firebase.auth().createUserWithEmailAndPassword(userForm.email, userForm.password)
  .then(data => data.user.uid)
  .then(userId => {
    userForm.id = userId
    delete userForm.password
    return saveUserToJsonServer(userForm)
  })
}

export const loginUser = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then(data => data.user.uid)
  .then(userId => getUser(userId))
  .then(user => {
    setUserInLocalStorage(user)
    return user
  })
}