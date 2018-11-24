const db = require('../config/database');

class Question {
    getbyID(id) {
        return knex('questions').where('id', id);
    }
};

module.exports = Question;