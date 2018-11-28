const knex = require('../config/database');

class Answer {
    getbyID(id) {
        return knex('answers').where('id', id);
    }

    insertAnswer(answer,correct,questionID) {
        return knex('answers').insert({
            answer: answer,
            correct: correct,
            questions_ID: questionID
        });
    }
};

module.exports = Answer;