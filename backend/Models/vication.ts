import { UploadedFile } from "express-fileupload";

class Vication{
   public id:number;
   public description:string;
   public destenation:string;
   public imageName:string;
   public image:UploadedFile;
   public start_date:Date=new Date();
   public end_date:Date=new Date();
   public price:number;
   public followers:number;

   public constructor(vication:Vication) {
    this.id = vication.id;
    this.description = vication.description;
    this.destenation = vication.destenation;
    this.imageName = vication.imageName;
    this.image = vication.image;
    this.start_date = vication.start_date;
    this.end_date = vication.end_date;
    this.price = vication.price;
    this.followers = vication.followers;
   }
}

export default Vication;