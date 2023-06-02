const User= require('../models/user')

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
 
  User.findById('645357bfc282a8874da5bd9a')
  .then(user => {
    req.session.isLoggedIn = true;
    req.session.user= user;
    res.redirect('/');
  })
.catch(err => console.log(err));
};
