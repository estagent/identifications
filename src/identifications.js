import {v4 as uuid4} from 'uuid'

let keyName = 'identifications'

export const setStorageKeyName = (key) => keyName = key;

const decodeIdentifications = str => {
  return JSON.parse(str)
}
const encodeIdentifications = data => {
  return JSON.stringify(data)
}
const saveIdentifications = (data = {}) => {
  data['updatedAt'] = Date.now()
  localStorage.setItem(keyName, encodeIdentifications(data))
}
const createIdentifications = () => {
  saveIdentifications({
    identifier: uuid4(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ua: {},
    ui: {},
  })
}
export const getIdentifier = () => {
  const data = getIdentifications()
  return data['identifier']
}
export const getIdentifications = () => {
  let str = localStorage.getItem(keyName)
  if (str) return decodeIdentifications(str)
  else {
    createIdentifications()
    return getIdentifications()
  }
}
export const updateIdentifications = (key, values) => {
  const data = getIdentifications()
  data[key] = values
  saveIdentifications(data)
}
