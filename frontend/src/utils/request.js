const host_name = 'http://localhost:4000'

const get = async (route, params) => {
  let paramsString = '?'
  for (const key in params) {
    paramsString += key + '=' + params[key] + '&';
  }
  paramsString = paramsString.substring(0, paramsString.length - 1);

  const requestUrl = host_name + route + paramsString;
  console.log(requestUrl)

  const response = await fetch((host_name + route + paramsString), {
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


export const loginRequest = async (username, passwd) => {
  return post('/login', {username, passwd})
}

export const registerRequest = async (username, email, passwd) => {
  return post('/register', {username, email, passwd})
}

export const getNotesByUserId = async (uid) => {
  return get('/notes/uid', {uid})
}

export const getNotesByTagId = async (tid) => {
  return get('/notes/tid', {tid})
}

export const getNote = async (nid) => {
  return get('/note', {nid})
}

export const getNoteHeads = async (uid) => {
  return get('/heads', {uid})
}

export const getUser = async (uid) => {
  return get('/user', {uid})
}

export const postNote = async (newNote) => {
  return post('/note', {...newNote})
}

export const putNote = async (newNote) => {
  return put('/note', newNote);
}