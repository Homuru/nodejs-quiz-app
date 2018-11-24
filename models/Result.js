const knex = require('../config/database');

class Result {

    insertResult(testID,userID,result) {
        return knex('results').insert({
            accounts_id: userID,
            tests_id: testID,
            result: `[${result}]`
        });
    }
}

module.exports = Result;