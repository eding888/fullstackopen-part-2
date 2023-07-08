import axios from 'axios';
const dataURL = 'http://localhost:3001/persons';

const extractRequestData = request=> {
    return request.then(response => response.data);
}
const create = newPerson => {
    const request = axios.post(dataURL, newPerson);
    return extractRequestData(request);
}
const remove = id => {
    const request = axios.delete(`${dataURL}/${id}`);
    return extractRequestData(request);
}

const update = (id, newPerson) => {
    const request = axios.put(`${dataURL}/${id}`, newPerson);
    return extractRequestData(request);
}
export default{ create, remove, update };