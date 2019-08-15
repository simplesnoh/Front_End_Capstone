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
      console.log("API", id, entity)
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

getMonthRound: {
  value: function (teamId, entity) {
  return fetch(`${remoteURL}/${entity}?teamId=${teamId}`)
  .then(data => data.json())
}
},

getTeam: {
  value: function (teamName, entity) {
  return fetch(`${remoteURL}/${entity}?name=${teamName}`)
  .then(data => data.json())
}
},

getFromTeamRelationship: {
  value: function (teamId) {
  return fetch(`${remoteURL}/teamRelationship?teamId=${teamId}&_expand=user`)
  .then(data => data.json())
}
},

getWheelUsingTeamId: {
  value: function (teamId) {
  return fetch(`${remoteURL}/wheel?teamId=${teamId}&completed=false`)
  .then(data => data.json())
}
},

getTaskByName: {
  value: function (name, wheelId) {
  return fetch(`${remoteURL}/tasks?name=${name}&wheelId=${wheelId}`)
  .then(data => data.json())
}
},

getNewWheel: {
  value: function (entity, teamId) {
  return fetch(`${remoteURL}/${entity}?gameEnded=false&teamId=${teamId}`)
  .then(data => data.json())
}
},

getUserPointsNewWheel: {
  value: function (entity, teamId) {
  return fetch(`${remoteURL}/${entity}?wheelId=0&teamId=${teamId}`)
  .then(data => data.json())
}
}


})

