import axios from 'axios'

export default class PlanService {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5000/api/users',
            withCredentials: true
        })
    }

    getAllUsers = () => this.api.get('/getAllUsers')
    getOneUser = id => this.api.get(`/getOneUser/${id}`)
    getAllPlans = id => this.api.get(`/getAllPlans/${id}`)
}