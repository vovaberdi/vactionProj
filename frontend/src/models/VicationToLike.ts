
class VicationToLike{
    public id?: number | undefined;
    public user_name?:string | undefined;
    public vication_id:number | undefined;
 
    public constructor(userLike:VicationToLike) {
        this.id = userLike.id;
        this.user_name = userLike.user_name;
        this.vication_id = userLike.vication_id;

    }

    
}

export default VicationToLike;