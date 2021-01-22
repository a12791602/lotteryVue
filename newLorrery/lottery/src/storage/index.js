export function setStorage (name, item) {
  if (name) {
    if (typeof name === 'object') {
      let objJson = JSON.stringify(item)
      localStorage.setItem(name, objJson)
    } else {
      localStorage.setItem(name, item)
    }
  }
}

export function getStorage (name) {
  if (name) {
    if (typeof localStorage.getItem(name) === 'object') {
      return JSON.parse(localStorage.getItem(name))
    } else {
      return localStorage.getItem(name)
    }
  }
}
export function clearStorage () {
  localStorage.clear()
}
