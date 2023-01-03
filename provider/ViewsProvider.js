const {Views, sequelize, News, Authors} = require('../models')
const _ = require("lodash");
const { Op } = require("sequelize");

class ViewsProvider {
    constructor() {
    }

    async handleNewsViews({ip, newsId}) {
        const views =  await this.viewByIP(ip, newsId)

        if (views) return

        await Views.create({
                newsId: newsId,
                desktopIP: ip
            })
    }

    async viewByIP(ip, newsId) {
        return await Views.findOne({
            where: {
                newsId,
                desktopIP: ip
            }
        })
    }

    async filterViews(startedDate , endDate) {
        return await Views.findAll({
            attributes: ['newsId', [sequelize.fn('count', sequelize.col('newsId')), 'views']],
            group: ['newsId'],
            where : {
                createdAt : {
                    [Op.lt]: endDate,
                    [Op.gt]: startedDate
                }
            },
            order: [[sequelize.col("views"), "DESC"]],
            limit: 21,
            include: [{
                model: News,
                as: 'news',
                attributes: ['id', 'title', 'image', 'icon'],
                order: [
                    ['createdAt', 'DESC']
                ],
                include: {
                    model: Authors,
                    as: 'author',
                    attributes: [['author', 'name']]
                }
            }
            ]
        })
    }

    async getOlderNews(date) {
        return await Views.findAll({
            attributes: ['newsId'],
            group: ['newsId'],
            where : {
                createdAt : {
                    [Op.lt]: date
                }
            }
        })
    }
}

module.exports = ViewsProvider