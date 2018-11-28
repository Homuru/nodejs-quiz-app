const knex = require('../config/database');

class Question {

    getAll() {
        return knex.select().table('questions');
    }

    getbyID(id) {
        return knex('questions').where('id', id);
    }

    insertQuestion(question, code, image) {
        return knex('questions').insert({
            question: question,
            code: code,
            image: image
        });
    }
};

module.exports = Question;