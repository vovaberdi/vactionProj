import express, {NextFunction, Request, Response} from 'express';
const passport = require('passport');



const authRouter = express.Router();
const CLIENT_URL = 'http://localhost:3000/';

authRouter.get('/login/success', (req, res) => {
  if(res.user){
    res.status(200).json({
    success: true,
    message: "successfully logged in",
    user: req.user,
    // cookies: req.cookies,
    });
  }
});
authRouter.get('/login/failed',(req, res) => {
    res.status(401).json({
    success: false,
    message: "failure",
  });
});

authRouter.get('/google', passport.authenticate("google", {scope: ["profile"] }));

authRouter.get('/google/callback', passport.authenticate("google",{
  successRedirect: CLIENT_URL,
  failureRedirect: "/login/failed",
})
);

authRouter.get('logout', (req,res)=>{
//   req.logout();
  res.redirect(CLIENT_URL);
});

export default authRouter;