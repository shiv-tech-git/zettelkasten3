const host_name = 'http://localhost:4000'

const get = async (route, params) => {
  let paramsString = '?'
  for (const key in params) {
    paramsString += key + '=' + params[key] + '&';
  }
  paramsString = paramsString.substring(0, paramsString.length - 1);

  const requestUrl = host_name + route + paramsString;

  const response = await fetch(requestUrl, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json'},
  })
  return await response.json();
}

const bodyParamRequest = async (method, route, body) => {
  const response = await fetch((host_name + route), {
    method: method, 
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...body
    })
  })
  return await response.json();
}

const post = (route, body) => {
  return bodyParamRequest("POST", route, body)
}

const put = (route, body) => {
  return bodyParamRequest("PUT", route, body)
}

const del = (route, body) => {
  return bodyParamRequest("DELETE", route, body);
}

export const loginRequest = (username, passwd) => {
  return post('/login', {username, passwd})
}

export const registerRequest = (username, email, passwd) => {
  return post('/register', {username, email, passwd})
}

export const getNotesByUserId = (uid) => {
  return get('/notes/uid', {uid})
}

export const getNotesByTagId = (uid, tid) => {
  return get('/notes/uid/tid', {uid, tid})
}

export const getNote = (nid) => {
  return get('/note', {nid})
}

export const getNoteHeads = (uid) => {
  return get('/heads', {uid})
}

export const getUser = (uid) => {
  return get('/user', {uid})
}

export const postNote = (newNote) => {
  return post('/note', {...newNote})
}

export const putNote = (newNote) => {
  return put('/note', newNote);
}

export const deleteNote = (nid) => {
  return del('/note', nid);
}