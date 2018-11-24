const Test = require('../models/Test');

class HomeController {

    constructor() {
        this.testModel = new Test();
    }
    async getHomePage(req, res, next) {
        try {
            const rows = await this.testModel.getbyUserID(req.user.id);
            console.log(req.user);
            res.render('home.ejs', {
                user: req.user, // get the user out of session and pass to template
                TestList: rows
            });
        } catch (error) {
            console.log(error)
        }

    }
}

module.exports = HomeController;


//