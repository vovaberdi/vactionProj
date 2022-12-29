
class VicationToLike{
    public id:number;
    public user_name:string;
    public vication_id:string;
 
    public constructor(userLike:VicationToLike) {
        this.id = userLike.id;
     this.user_name = userLike.user_name;
     this.vication_id = userLike.vication_id;

    }

    
}

export default VicationToLike;