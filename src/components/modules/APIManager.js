const remoteURL = "http://localhost:5002";

export default Object.create(null, {
  get: {
    value: function(entity, id) {
      return fetch(`${remoteURL}/${entity}/${id}`).then(e => e.json());
    }
  },
  all: {
    value: function(entity) {
      return fetch(`${remoteURL}/${entity}`).then(e => e.json());
    }
  },
  delete: {
    value: function(id, entity) {
      return fetch(`${remoteURL}/${entity}/${id}`, {
        method: "DELETE"
      })
        .then(e => e.json())
        .then(() => fetch(`${remoteURL}/${entity}`))
        .then(e => e.json());
    }
  },
  post: {
    value: function(newObj, entity){
        return fetch(`${remoteURL}/${entity}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newObj)
    }).then(data => data.json())
  }
},
  put: {
    value: function(editedObj, entity){
    return fetch(`${remoteURL}/${entity}/${editedObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedObj)
    }).then(data => data.json());
  }
},

  getWheelFromAPI: function(wheel) {

  }

})