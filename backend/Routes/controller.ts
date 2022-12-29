import express, {NextFunction, Request, Response} from 'express';
import userLogic from '../Logic/userLogic';
import verifyToken from '../MiddleWare/verify_token';
import userCredentials from '../Models/credentialsModel';
import Role from '../Models/Role';
import User from '../Models/user';


const router = express.Router();

// router.get("/all", async (request: Request, response: Response, next: NextFunction) => {
//   response.status(200).json( await userLogic.getAllUsers());
// })

router.post("/auth/register", async (request: Request, response: Response, next: NextFunction) => {
  try{
      console.log(request.body)
      const userToAdd = new User(request.body);
      userToAdd.role = Role.User;
      const token = await userLogic.addUser(userToAdd)
      response.set("authorization",token);
      response.status(200).json(userToAdd.user_name);
      // response.status(201).json(token)
  }
catch (err) {next(err)}
})

router.post("/auth/login", async (request: Request, response: Response, next: NextFunction) => {
  try{
     const credentials = new userCredentials(request.body);
     const token = await userLogic.loginAsync(credentials);
     response.set("authorization",token);
     response.status(200).json(credentials.user_name);
    //  response.json(token);
  } 
  catch(err) { next(err)
}});



router.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
  const id = +request.params.id;
  response.status(204).json( await userLogic.deleteUser(id))
})


export default router;