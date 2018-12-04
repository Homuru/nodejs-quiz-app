const Test = require('../models/Test');
const User = require('../models/User');
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const Result = require('../models/Result');

class AdminController {
    constructor() {
        this.testModel = new Test();
        this.resultModel = new Result();
        this.userModel = new User();
        this.answerModel = new Answer();
        this.questionModel = new Question();
    }

    async isAdmin(req, res, next) {
        let userID = req.session.passport.user;
        try {
            let adminStatus = await this.userModel.isAdmin(userID);
            if (adminStatus) {
                return next();
            } else {
                res.redirect('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    async getAdminPage(req, res, next) {
        try {
            let countUser = await this.userModel.countUser();
            let countTest = await this.testModel.countTest();
            countUser = countUser[0].number;
            countTest = countTest[0].number;
            res.render('Admin/index', {
                userNumber: countUser,
                testNumber: countTest
            });
        } catch (error) {
            console.log(error);
        }
    };
    // USER
    async getUserPage(req, res, next) {
        try {
            const users = await this.userModel.getAll();
            console.log(users);
            let data = [];
            for (let i = 0; i < users.length; ++i) {
                let tests = await this.testModel.getbyUserID(users[i].id);
                console.log(tests);
                data[i] = {
                    user: users[i],
                    test: tests,
                };
            }
            console.log(data);
            res.render('Admin/User/index', {
                userTable: data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    async getModifyUser(req, res, next) {
        try {
            const users = await this.userModel.getAll();
            let tests = await this.testModel.getAll();
            res.render('Admin/User/modify', {
                userTable: users,
                testTable: tests,
            });
        } catch (error) {
            console.log(error);
        }
    };

    async modifyUser(req, res, next) {
        try {
            let userList = req.body.userList;
            let testList = req.body.testList;
            console.log(userList,testList);
            for(let i = 0; i < userList.length; ++i) {
                for(let j = 0; j < testList.length; ++j) {
                    console.log(userList[i],testList[j]);
                    this.userModel.setPrivilege(userList[i],testList[j]);
                }
            }
            res.redirect('/admin/user/modify')
        } catch (error) {
            console.log(error);
        }
    }

    async getNewTest(req, res, next) {
        try {
            const questions = await this.questionModel.getAll();
            res.render('Admin/Test/create', {
                questionTable: questions,
            });
        } catch (error) {
            console.log(error);
        }
    };

    async createNewTest(req, res, next) {
        try {
            let test = req.body.test;
            let question = req.body.question;
            console.log(test, question);
            let rows = await this.testModel.insertTest(test.name, test.time, test.open);
            let testID = rows[0];
            for (let i = 0; i < question.length; ++i) {
                rows = await this.testModel.addQuestion(testID, question[i]);
            }
            res.redirect('/admin/test/create')

        } catch (error) {
            console.log(error);
        }
    };

    async getModifyTest(req, res, next) {
        try {
            res.render('Admin/Test/modify');
        } catch (error) {
            console.log(error);
        }
    };


    async getQuestionPage(req, res, next) {
        try {
            const questions = await this.questionModel.getAll();
            res.render('Admin/Question/index', {
                questionTable: questions,
            });
        } catch (error) {
            console.log(error);
        }
    };

    async getNewQuestion(req, res, next) {
        try {
            res.render('Admin/Question/create');
        } catch (error) {
            console.log(error);
        }
    };

    async createNewQuestion(req, res, next) {
        try {
            let answer = req.body.answer;
            let question = req.body.question;
            console.log(answer, question);
            let rows = await this.questionModel.insertQuestion(question.question, question.code, question.image);
            let questionID = rows[0];
            for (let i = 0; i < answer.length; ++i) {
                rows = await this.answerModel.insertAnswer(answer[i].answer, answer[i].correct, questionID);
            }
            res.redirect('/admin/question/create')
        } catch (error) {
            console.log(error);
        }
    };
}

module.exports = AdminController;