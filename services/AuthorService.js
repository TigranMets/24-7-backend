const BaseService = require('./BaseService')
const AuthorProvider = require('../provider/AuthorProvider')
const { Sequelize, News, Categories, Authors, News_Category } = require('../models')

class AuthorService extends BaseService {
    constructor() {
        super();
        this.authorProvider = new AuthorProvider()
        this.authorModel = Authors
    }

   async getAuthor(req) {
        try {
            const { id } = req.params
            const { limit, page } = req.query

            if (!id) {
                return this.response({
                    status: false,
                    statusCode: 400,
                    message: "Missing author id"
                })
            }

            const author = await this.authorModel.findOne({
                where: { id }
            })

            if (!author) return this.response({
                status: false,
                statusCode: 404,
                message: "News not found"
            })

            const news = await this.authorProvider.getAuthorAndNews({
                page,
                limit,
                id
            })

            return this.response({ data: news })
        } catch (err) {
            return this.serverErrorResponse()
        }
    }
}

module.exports = AuthorService