const host_name = 'http://localhost:4000'

export const loginRequest = async (login, passwd) => {
  const response = await fetch(host_name + '/login', {
    method: 'POST', 
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      login,
      passwd
    })
  })

  return await response.json();
}

export const registerRequest = async (login, email, passwd) => {
  const response = await fetch(host_name + '/register', {
    method: 'POST', 
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      login,
      email,
      passwd
    })
  })
  
  return await response.json();
}

export const fetchUserNotes = async (uid, numberOfNotes) => {
  const response = await fetch(host_name + '/notes', {
    method: 'POST',
    cache: 'no-cache',
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
  const response = await fetch(host_name + '/get-note', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nid
    })
  })
  return await response.json();
}

export const fetchNoteHeads = async () => {
  const response = await fetch(host_name + '/heads', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      
    })
  })
  return await response.json();
}

export const fetshAllTags = async () => {
  const response = await fetch(host_name + '/tags', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      
    })
  })
  return await response.json();
}