import express, {NextFunction, Request, Response} from 'express';
import vicationLogic from '../Logic/vcationLogic';
import path from "path"
import verifyToken from '../MiddleWare/verify_token';
import Vication from '../Models/vication';
import verifyAdmin from '../MiddleWare/verify_admin';
import VicationToLike from '../Models/VicationToLike';
import safeDelete from '../helpers/safe-delete';




const routerVication = express.Router();


routerVication.get("/all",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
  try{
     const vications = await vicationLogic.getAllVications();
     response.json(vications);
  }
  catch(err){next(err)}
});

routerVication.get("/:id",verifyToken, async (request: Request, response: Response, next: NextFunction) => {
  try{
     const id = +request.params.id;
     response.status(200).json( await vicationLogic.getSingleVication(id));
  }
  catch(err){next(err)}
})

routerVication.get("/images/:imageName", (request: Request, response: Response, next: NextFunction) => {
    const imageName = request.params.imageName;
    const fullPath = path.join(__dirname, "..", "images", imageName);
    response.sendFile(fullPath);
})

routerVication.post("/add",[verifyToken, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
  try{
     request.body.image = request.files?.image;
     const vicationToAdd = new Vication(request.body);
     const addVication = await vicationLogic.addVication(vicationToAdd);
     response.status(201).json(addVication);
  }
  catch (err) {next(err)}
})

routerVication.put("/:id", [verifyToken, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
  try{
    request.body.id = +request.params.id;
    request.body.image = request.files?.image;
    const victionToUpDate = new Vication(request.body);
    const updatedVication = await vicationLogic.updatedVication(victionToUpDate);
    response.json(updatedVication);
  }
  catch (err) {next(err)}
})

routerVication.post("/:id", [verifyToken, verifyAdmin], async (request: Request, response: Response, next: NextFunction) => {
  try{
  const id = +request.params.id;
  const imageName = request.body.imageName;
  // const user_name = request.body.user_name;
  safeDelete("./images/" + imageName);
  await vicationLogic.deleteLike(id);
  await vicationLogic.deleteVication(id);
  response.sendStatus(204)
  }
  catch(err){next(err)}
})


export default routerVication;