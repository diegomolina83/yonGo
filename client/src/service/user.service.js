import axios from 'axios'

export default class PlanService {

    constructor() {
        this.api = axios.create({
            //baseURL: 'http://localhost:5000/api/users',
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    getAllUsers = () => this.api.get('/users/getAllUsers')
    getOneUser = id => this.api.get(`/users/getOneUser/${id}`)
    editUser = (id, updatedUser) => this.api.put(`/edit/${id}`, updatedUser)

    getAllPlans = id => this.api.get(`/users/getAllPlans/${id}`)
    getAllPlansFast = id => this.api.get(`/users/getAllPlans/fast/${id}`)

    isFollowing = (followedUserId, followerUserId) => this.api.get(`/users/isFollowing/${followedUserId}/${followerUserId}`)
    handleFollow = (followedUserId, followerUserId, isFollowing) => this.api.put(`/users/handleFollow/${followedUserId}/${followerUserId}/${isFollowing}`)
}