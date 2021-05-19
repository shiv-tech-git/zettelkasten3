const host_name = 'http://localhost:4000'

export const loginRequest = async (username, passwd) => {
  const response = await fetch(host_name + '/login', {
    method: 'POST', 
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      passwd
    })
  })

  return await response.json();
}

export const registerRequest = async (username, email, passwd) => {
  const response = await fetch(host_name + '/register', {
    method: 'POST', 
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      email,
      passwd
    })
  })
  
  return await response.json();
}

export const getNotesByUserId = async (uid) => {
  const response = await fetch(`${host_name}/notes?uid=${uid}`, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  return await response.json();
}


export const getNote = async (nid) => {
  const response = await fetch(`${host_name}/note?nid=${nid}`, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  return await response.json();
}

export const getNoteHeads = async (uid) => {
  const response = await fetch(`${host_name}/heads?uid=${uid}`, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await response.json();
}

export const getUser = async (userId) => {
  const response = await fetch(`${host_name}/user?uid=${userId}`, {
    method: 'GET',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  return await response.json();
}

export const postNote = async (newNote) => {
  const response = await fetch(host_name + '/note', {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newNote)
  })
  return await response.json();
}