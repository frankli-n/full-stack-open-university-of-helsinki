import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
    .catch(error => {
      console.log('error',error.response.data.error)
      throw error
    });
}

const update = (id, newObject) => {
  console.log('id',id);
  console.log('newobject', newObject);
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const dlt = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update, 
  dlt: dlt
}