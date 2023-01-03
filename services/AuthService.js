const BaseService = require("./BaseService");
const {createToken} = require("../helpers/token");

class AuthService extends BaseService {

    constructor() {
        super()
    }

    async signIn(req) {
        try {
            const { email, password } = req.body;

            if (!email) {
                return this.response({
                    status: false,
                    statusCode: 400,
                    message: "Email is required"
                })
            }

            if (!password) {
                return this.response({
                    status: false,
                    statusCode: 400,
                    message: "Password is required"
                })
            }

            if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                const token = createToken({
                    payload: {
                        email
                    },
                    options: {
                        expiresIn: '24h'
                    }   
                });

                return this.response({
                    data: token
                })
            }

            return this.response({
                status: false,
                statusCode: 401,
                message: "Incorrect email and/or  password"
            })
        } catch(error) {
            return this.serverErrorResponse();
        }
    }
}

module.exports = AuthService