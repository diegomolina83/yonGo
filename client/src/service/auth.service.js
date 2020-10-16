import axios from 'axios'

export default class AuthService {

    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5000/api',
            // baseURL: 'http://yongo-server.herokuapp.com/api',
            withCredentials: true
        })
    }

    signup = user => this.api.post('/signup', user)
    login = user => this.api.post('/login', user)
    logout = () => this.api.post('/logout')
    isLoggedIn = () => this.api.get('/loggedin')
}