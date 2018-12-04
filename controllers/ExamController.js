const Test = require('../models/Test');
const db = require('../config/database');
const testModel = new Test();

class ExamController {

    constructor() {
        this.testModel = new Test();
    }

    async isActive(req, res, next) {
        let testID = req.params.testID;
        let userID = req.session.passport.user;
        try {
            let status = await this.testModel.checkStatus(testID);
            let active = await this.testModel.checkAvailability(testID, userID);
            if (status && active) {
                return next()
            } else {
                res.redirect('/');
            }
        } catch (error) {
            res.redirect('/');
        }

    };


    async getExam(req, res, next) {
        var j = 0;
        var data = [];
        var current;
        var currentQuestion, currentAnswer;
        var questions = [];
        let testID = req.params.testID;
        try {
            let results = await this.testModel.getTestContent(testID);
            var q = results.map(result => result.questions_id); // Lay cac question id
            questions = q.filter((q, index, self) => {
                return self.indexOf(q) == index;
            }); // Remove duplicates
            var all = results;
            for (var j = 0; j < questions.length; j++) {
                current = questions[j];
                currentQuestion = {
                    question: all.filter(item => item.questions_id == current)[0]['question'],
                    code: all.filter(item => item.questions_id == current)[0]['code'],
                    image: all.filter(item => item.questions_id == current)[0]['image'],
                };
                currentAnswer = {
                    answer: all.filter(item => item.questions_id == current).map(item => item.answer),
                    correct: all.filter(item => item.questions_id == current).map(item => item.correct)
                };
                data[j] = {
                    question: currentQuestion,
                    answer: currentAnswer
                };
            }
            let rows = await this.testModel.getbyID(testID);
            res.send({
                data: data,
                time: rows[0].time
            });
        } catch (error) {
            console.log(err);
        }
    };

    getExamPage(req, res, next) {
        res.render('exam');
    };

}

module.exports = ExamController;