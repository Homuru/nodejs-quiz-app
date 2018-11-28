const HomeController = require('../controllers/HomeController');
const AuthController = require('../controllers/AuthController');
const ExamController = require('../controllers/ExamController');
const FinishController = require('../controllers/FinishController');
const AdminController = require('../controllers/AdminController');
module.exports = function (app, passport) {

	// Adding Controller
	const homeCtrl = new HomeController();
	const examCtrl = new ExamController();
	const finishCtrl = new FinishController();
	const authCtrl = new AuthController();
	const adminCtrl = new AdminController();

	// Auth routes
	app.get('/', authCtrl.isLoggedIn, homeCtrl.getHomePage.bind(homeCtrl));
	app.get('/login', authCtrl.Login);
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/login', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));
	app.get('/signup', authCtrl.Login);
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile', // redirect to the secure profile section
		failureRedirect: '/signup', // redirect back to the signup page if there is an error
		failureFlash: true // allow flash messages
	}));
	app.get('/profile', authCtrl.isLoggedIn, homeCtrl.getHomePage.bind(homeCtrl))
	app.get('/logout', authCtrl.Logout);

	// Test routes
	app.get('/exam/:testID', [authCtrl.isLoggedIn, examCtrl.isActive.bind(examCtrl)], examCtrl.getExamPage.bind(examCtrl));
	app.get('/api/exam/:testID', examCtrl.getExam.bind(examCtrl));

	app.get('/finish', finishCtrl.getFinishPage.bind(finishCtrl));
	app.post('/finish/:testID', finishCtrl.getResult.bind(finishCtrl));

	// Admin routes
	app.get('/admin', [authCtrl.isLoggedIn, adminCtrl.isAdmin.bind(adminCtrl)], adminCtrl.getAdminPage.bind(adminCtrl));
	app.get('/admin/user', [authCtrl.isLoggedIn, adminCtrl.isAdmin.bind(adminCtrl)], adminCtrl.getUserPage.bind(adminCtrl));
	app.get('/admin/user/modify', [authCtrl.isLoggedIn, adminCtrl.isAdmin.bind(adminCtrl)], adminCtrl.getModifyUser.bind(adminCtrl));

	app.get('/admin/test/create', [authCtrl.isLoggedIn, adminCtrl.isAdmin.bind(adminCtrl)], adminCtrl.getNewTest.bind(adminCtrl));
	app.get('/admin/test/modify', [authCtrl.isLoggedIn, adminCtrl.isAdmin.bind(adminCtrl)], adminCtrl.getModifyTest.bind(adminCtrl));
	app.post('/admin/test/create', [authCtrl.isLoggedIn, adminCtrl.isAdmin.bind(adminCtrl)], adminCtrl.createNewTest.bind(adminCtrl));

	app.get('/admin/question', [authCtrl.isLoggedIn, adminCtrl.isAdmin.bind(adminCtrl)], adminCtrl.getQuestionPage.bind(adminCtrl));
	app.get('/admin/question/create', [authCtrl.isLoggedIn, adminCtrl.isAdmin.bind(adminCtrl)], adminCtrl.getNewQuestion.bind(adminCtrl));
	app.post('/admin/question/create', [authCtrl.isLoggedIn, adminCtrl.isAdmin.bind(adminCtrl)], adminCtrl.createNewQuestion.bind(adminCtrl));

}