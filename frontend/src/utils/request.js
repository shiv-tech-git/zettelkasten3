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

export const fetchNotes = async (uid, numberOfNotes) => {
  const response = await fetch(host_name + '/notes', {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      uid,
      numberOfNotes,
    })
  })
  return await response.json();
}


export const fetchNote = async (nid) => {
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

export const fetchNoteHeads = async () => {
  const response = await fetch(host_name + '/heads', {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      
    })
  })
  return await response.json();
}

export const fetchAllTags = async () => {
  const response = await fetch(host_name + '/tags', {
    method: 'POST',
    cache: 'no-cache',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      
    })
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