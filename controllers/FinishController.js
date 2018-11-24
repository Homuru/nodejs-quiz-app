const Test = require('../models/Test');
const Result = require('../models/Result');

class FinishController {

    constructor() {
        this.testModel = new Test();
        this.resultModel = new Result();
    }

    getFinishPage(req, res, next) {
        res.render('finish');
    };

    async getResult(req, res, next) {
        var j = 0;
        var current;
        var currentAnswer;
        var questions = [];
        let testID = req.params.testID;
        let userID = req.session.passport.user;
        var answer = req.body.answer;
        var result = [];
        try {
            let results = await this.testModel.getTestContent(testID);
            var q = results.map(result => result.questions_id);
            questions = q.filter((q, index, self) => {
                return self.indexOf(q) == index;
            });
            var all = results;
            for (var j = 0; j < questions.length; j++) {
                current = questions[j];
                currentAnswer = {
                    answer: all.filter(item => item.questions_id == current).map(item => item.answer),
                    correct: all.filter(item => item.questions_id == current).map(item => item.correct)
                };
                if (answer[j] == -1)
                    result[j] = 0;
                else if (currentAnswer.correct[answer[j]] == 1)
                    result[j] = 1;
                else result[j] = 0;
            }
            await this.resultModel.insertResult(testID,userID,result);
            this.testModel.changeStatus(testID, userID);
        } catch (error) {
            console.log(error);
        }
    };
}

module.exports = FinishController;