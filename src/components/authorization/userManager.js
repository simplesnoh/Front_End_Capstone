import * as firebase from 'firebase/app';
import 'firebase/auth'

const url = "http://localhost:5002";

const setUserInLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
}

export const saveUserToJsonServer = (user) => {
    return fetch(`${url}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }).then(data => data.json())
    .then(newUser => {
      setUserInLocalStorage(newUser);
        return newUser;
    });
}



export const getUser = (userId) => {
  return fetch(`${url}/users/${userId}`)
    .then(res => res.json());
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