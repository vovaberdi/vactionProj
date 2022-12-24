class userCredentials{
    public user_name:string;
    public password:string;
    public token?:string;
 
    public constructor(credentials:userCredentials) {
     this.user_name = credentials.user_name;
     this.password = credentials.password;
     this.token = credentials.token;

    }

    
}

export default userCredentials;