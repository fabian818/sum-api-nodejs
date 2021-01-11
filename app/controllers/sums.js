const Sum = require('../models').Sum;

module.exports = class Sums {
    static async create (first_number, second_number, user_id) {
        const sum = await Sum.create({
            first_number: first_number,
            second_number: second_number,
            user_id: user_id
        })
        return sum;
    }

    static async filter (params) {
        const sums = await Sum.findAll({where: params})
        return sums;
    }
}
