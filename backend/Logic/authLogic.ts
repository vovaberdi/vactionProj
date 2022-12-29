import { ClientError } from "../Models/client-errors";
import User from "../Models/user";
import dal from "../Utils/dal_mysql"



// async function registerAsync(user: User): Promise<User> {
    
//     const errors = user.validatePost();
//     if (errors) throw new ClientError(400, errors);

//     const users = await dal.execute()
// }