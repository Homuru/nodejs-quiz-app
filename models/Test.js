const moment = require('moment');
const knex = require('../config/database')

class Test {

    getAll() {
        return knex.select().table('tests');
    }

    getbyID(id) {
        return knex('tests').where('id', id);
    }


    getbyUserID(id) {
        return knex.select('id', 'time', 'open', 'active', 'name')
            .table('accounts_has_tests').innerJoin('tests', 'accounts_has_tests.tests_id', '=', 'tests.id')
            .where('accounts_id', id);
    }

    getTestContent(id) {
        return knex.select('*').table('tests_has_questions')
            .innerJoin('questions', 'questions.id', '=', 'tests_has_questions.questions_id')
            .innerJoin('answers', 'answers.questions_id', '=', 'questions.id')
            .where('tests_id', id);
    }

    async checkStatus(id) {
        try {
            const rows = await this.getbyID(id);
            let open = moment(rows[0].open);
            let now = moment();
            let re = await now.isBefore(open);
            console.log(re);
            return re;
        } catch (error) {
            console.log(error)
        }
    }

    async checkAvailability(testID, userID) {
        try {
            const rows = await knex('accounts_has_tests').where({
                accounts_id: userID,
                tests_id: testID
            })
            console.log(rows);
            return rows[0].active;
        } catch (err) {
            console.log(err);
        }
    }

    async changeStatus(testID, userID) {
        try {
            let check = await this.checkAvailability(testID, userID);
            console.log(check);
            if (check == 1) {
                knex('accounts_has_tests').where({
                    accounts_id: userID,
                    tests_id: testID
                }).update({
                    active: '0'
                }).then(console.log(`Changed Status!`));
            } else {
                knex('accounts_has_tests').where({
                    accounts_id: userID,
                    tests_id: testID
                }).update({
                    active: '1'
                }).then(console.log(`Changed Status!`));
            }
        } catch (error) {
            console.log(error);
        }
    }

    countTest() {
        return knex('tests').count('id as number');
    }

    insertTest(name, time, open) {
        return knex('tests').insert({
            name: name,
            time: time,
            open: open
        });
    }

    addQuestion(testID, questionID) {
        return knex('tests_has_questions').insert({
            tests_id: testID,
            questions_id: questionID
        });
    }

};

module.exports = Test;