import axios from 'axios'

export default class CoasterService {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5000/api/files',
            // baseURL: 'http://yongo-server.herokuapp.com/api',
            withCredentials: true
        })
    }

    uploadImage = imageForm => this.api.post('/upload', imageForm)
}