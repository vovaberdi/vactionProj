import Role from "./Role";

class User{
  public id:number=0;
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
}

export default User;