const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/user');

const nodemailer= require('nodemailer');
const mailtrap= require('mailtrap');
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "475f75ddc8d554",
    pass: "4b4b876b51e200"
  }
});
exports.getLogin = (req, res, next) => {
  let message= req.flash('error');
  if(message.length > 0){
    message= message[0];
  }
  else {
    message= null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
   });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email and password!')
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user.save();
        })
        .then(result => {
          res.redirect('/login');
          return transporter.sendMail({
            to: email,
            from:'test@email.com',
            subject: 'testing email',
            html:'<h1> you have successfully joined!</h1>'
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getReset = (req,res,next)=>{
  let message= req.flash('error');
  if(message.length > 0){
    message= message[0];
  }
  else {
    message= null;
  }

  res.render('auth/reset',{
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMessage: message
  })
}

exports.postRest= (res,req,next) => {
  crypto.randomBytes(32,(err,buffer) =>{
    if(err){
      console.log(err);
      return res.redirect('/reset');
    }
    const token= buffer.toString('hex');
    User.findOne({ email: req.body.email})
    .then(user => {
      if(!user){
        req.flash('error', 'No account with that email!');
        return res.redirect('/reset');
      }
      user.resetToken= token;
      user.resetTokenExpiration= new Date.now() + 36 * 10000;
      return user.save();
    })
    .then(result => {
      res.redirect('/')
      return transporter.sendMail({
        to: req.body.email,
        from:'praveen@777kumar.com',
        subject: 'Password Reset',
        html:`
         <p> you requested a password reset.</p>
        <p> Click this <a href= "http://localhost:3000/reset/${token}"> link </a> to set a new passaword.</p>
        // `
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
    })

  });
}
