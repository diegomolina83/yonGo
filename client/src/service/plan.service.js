import axios from 'axios'

export default class PlanService {

    constructor() {
        this.api = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    createPlan = newPlan => this.api.post('/plans/create', newPlan)
    getAllPlans = () => this.api.get('/getAllPlans')
    getOnePlan = id => this.api.get(`/getOnePlan/${id}`)
}