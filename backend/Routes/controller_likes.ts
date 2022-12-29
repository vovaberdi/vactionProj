import express, {NextFunction, Request, Response} from 'express';
import vicationLogic from '../Logic/vcationLogic';
import VicationToLike from '../Models/VicationToLike';



const routerLikes = express.Router();


routerLikes.post("/addLike", async (request: Request, response: Response, next: NextFunction) => {
    try{
       const likeToAdd = new VicationToLike(request.body);
       const addVication = await vicationLogic.addLike(likeToAdd);
       response.status(201).json(addVication);
    }
    catch (err) {next(err)}
  })
  
  routerLikes.delete("/delLike/:id", async (request: Request, response: Response, next: NextFunction) => {
    try{
    const id = +request.params.id;
    await vicationLogic.deleteLike(id);
    response.sendStatus(204)
    }
    catch(err){next(err)}
  })
  
  routerLikes.get("/allLikes/:user", async (request: Request, response: Response, next: NextFunction) => {
    try{
      const user:any = request.params.user;
      const vicationsLikes = await vicationLogic.getAllLikes(user);
       response.json(vicationsLikes);
    }
    catch(err){next(err)}
  });
  
  
  export default routerLikes;