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

    async isAdmin(req,res,next) {
        let userID = req.session.passport.user;
        try {
            let adminStatus = await this.userModel.isAdmin(userID);
            console.log(adminStatus);
            if (adminStatus) {
                return next();
            } else {
                res.redirect('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getAdminPage(req,res,next) {
        try {
            let countUser = await this.userModel.countUser();
            let countTest = await this.testModel.countTest();
            countUser = countUser[0].number;
            countTest = countTest[0].number;
            res.render('Admin/index',{
                userNumber: countUser,
                testNumber: countTest
            });
        } catch (error) {
            console.log(error);
        }
    }

    async getUserPage(req,res,next) {
        res.render('Admin/User/index');
    }
}

module.exports = AdminController

