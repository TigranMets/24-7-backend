const {Sequelize, News, Categories, Authors, News_Category} = require('../models')
const _ = require("lodash");
const {paginate} = require("../helpers");

class AuthorProvider {

    constructor() {
    }

    async getAuthorAndNews({page, limit, id}) { //todo pagination
        const response = await Authors.findAll({
            where: {id},
            include: [{
                model: News,
                as: 'news',
                ...paginate({
                    currentPage: page,
                    pageSize: limit
                }),
                attributes: ['id', 'title', 'text', 'image', 'createdAt'],
                order: [
                    ['createdAt', 'DESC']
                ],
            }]
        })

        response.data = _.head(response?.rows)
        delete response?.rows

        return response || []
    }
}

module.exports = AuthorProvider