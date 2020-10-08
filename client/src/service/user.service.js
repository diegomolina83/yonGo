import axios from 'axios'

export default class PlanService {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }

    getAllUsers = () => this.api.get('/users/getAllUsers')
    getOneUser = id => this.api.get(`/users/getOneUser/${id}`)
}