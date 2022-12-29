const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport= require("passport");
require('dotenv').config();

const configPass = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
}

passport.use(new GoogleStrategy({
    clientID: configPass.CLIENT_ID,
    clientSecret: configPass.CLIENT_SECRET,
    callbackUrl: "http://localhost:3000/auth/google/callback"
},
function(accessToken, refreshToken, profile, done){
    console.log("Google profile", profile);
    done(null, profile)
}
));
passport.serializeUser((user,done)=>{
    done(null, user);
});
passport.deserializeUser((user,done)=>{
    done(null, user);
});
