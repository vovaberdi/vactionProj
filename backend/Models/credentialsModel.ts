import Joi from "../node_modules/joi/lib/index";

class userCredentials{
   public user_name:string;
   public password:string;

   public constructor(credentials:userCredentials) {
    this.user_name = credentials.user_name;
    this.password = credentials.password;
   }

public validatePost() {
    const result = userCredentials.postValidationSchema.validate(this);
    return result.error?.message;
}


private static postValidationSchema = Joi.object({
    user_name: Joi.string().required().min(3).max(100),
    password: Joi.string().required().min(4).max(100),
})

}
export default userCredentials;