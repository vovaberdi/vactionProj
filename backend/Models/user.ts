import Joi from "../node_modules/joi/lib/index";
import Role from "./Role";

class User{
   public id:number;
   public id_:string;
   public f_name:string;
   public l_name:string;
   public user_name:string;
   public password:string;
   public role : Role;

   public constructor(user:User) {
    this.id = user.id;
    this.id_ = user.id_;
    this.f_name = user.f_name;
    this.l_name = user.l_name;
    this.user_name = user.user_name;
    this.password = user.password;
    this.role = user.role;
   }

public validatePost() {
    const result = User.postValidationSchema.validate(this);
    return result.error?.message;
}

public validatePut() {
    const result = User.putValidationSchema.validate(this);
    return result.error?.message;
}

private static postValidationSchema = Joi.object({
    id: Joi.number().required().integer().positive(),
    f_name: Joi.string().required().min(2).max(100),
    l_name: Joi.string().required().min(2).max(100),
    user_name: Joi.string().required().min(3).max(100),
    password: Joi.string().required().min(4).max(100),
    role: Joi.number().required().integer().min(Role.User).max(Role.Admin),
})

private static putValidationSchema = Joi.object({
    id: Joi.number().required().integer().positive(),
    f_name: Joi.string().required().min(2).max(100),
    l_name: Joi.string().required().min(2).max(100),
    user_name: Joi.string().required().min(2).max(100),
    password: Joi.string().required().min(2).max(100),
    role: Joi.number().required().integer().min(Role.User).max(Role.Admin)
});
}
export default User;