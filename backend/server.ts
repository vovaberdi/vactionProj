import cors from "cors";
import express, { response } from "express";
import ErrorHandler from "./MiddleWare/route-not-found";
import config from "./Utils/config";
import dal_mysql from "./Utils/dal_mysql";
import router from './Routes/controller';
import fileUpload from "express-fileupload";
import { createUser, createVication, createVicationFollowers } from "./Utils/init";
import routerVication from "./Routes/controller_vications";
import passport from "passport";
import routerLikes from "./Routes/controller_likes";
// const helmet = require("helmet");
const expressRateLimit = require("express-rate-limit");
// import authRouter from "./Routes/auth";




const server = express();

// server.use(passport.initialize());
// server.use(passport.session());

// const currentPort = config.port;
dal_mysql.execute(createVication);
dal_mysql.execute(createUser);
dal_mysql.execute(createVicationFollowers);


server.use(expressRateLimit({ windowMs: 1000, max: 10, message:"Are you fucking around?"}));
// server.use(helmet());

server.use(cors({
    "exposedHeaders" : "authorization" 
    // origin: 'http://localhost:3000',
    // methods: 'GET,POST,PUT,DELETE',
    // credentials: true
}));



server.use(fileUpload());
server.use(express.json());

// server.use("auth/google", passport.authenticate("google",{
//     scope: ["email"],
// }));
// server.use("auth/google/callback",
//     passport.authenticate("google",{
//     failureRedirect: "/failure",
//     successRedirect: "/",
//     session: false,

// }), (req, res)=>{console.log("Google calld us back")});

// server.get("/failure",(req, res)=> {
//     return response.send("failure to log in ")
// });

// server.use("/auth/register",router);
server.use("/user",router);
server.use("/vication",routerVication);
server.use("/vicationLike",routerLikes);
server.use("*", ErrorHandler);

server.listen(process.env.PORT || 3001, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port. server.settings.env);
})
// server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )