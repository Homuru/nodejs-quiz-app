const knex = require('../config/database');

class Result {

    insertResult(testID, userID, result, time) {
        return knex('results').insert({
            accounts_id: userID,
            tests_id: testID,
            result: `[${result}]`,
            time: time
        });
    }

    getAll() {
        return knex.select('results.id', 'username', 'name', 'results.time', 'result')
            .table('results')
            .innerJoin('tests', 'results.tests_id', '=', 'tests.id')
            .innerJoin('accounts', 'results.accounts_id', '=', 'accounts.id');
    }

    getbyID(id) {
        return knex('results').where('id', id);
    }
}

module.exports = Result;