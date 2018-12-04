const knex = require('../config/database');

class Question {

    getAll() {
        return knex.select().table('questions');
    }

    getbyID(id) {
        return knex('questions').where('id', id);
    }

    getbyTestID(testID) {
        return knex.select('*').table('tests_has_questions')
            .innerJoin('questions', 'questions.id', '=', 'tests_has_questions.questions_id')
            .where('tests_id', testID);
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