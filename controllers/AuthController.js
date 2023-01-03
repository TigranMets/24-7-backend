const AuthService = require('../services/AuthService')

class AuthController {
    constructor() {
        this.authService = new AuthService()
    }

    async signIn(req, res) {
        const data = await this.authService.signIn(req);
        res.status(data.statusCode).json(data);
    }
}

module.exports = AuthController