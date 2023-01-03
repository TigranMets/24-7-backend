const AuthorService = require('../services/AuthorService')

class AuthorController {
    constructor() {
        this.authorService = new AuthorService()
    }

    async getAuthor(req, res) {
        const data = await this.authorService.getAuthor(req);
        res.status(data.statusCode).json(data);
    }
}

module.exports = AuthorController