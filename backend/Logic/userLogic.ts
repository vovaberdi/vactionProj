import dal from "../Utils/dal_mysql"
import { v4 as uuid } from "uuid";
import { OkPacket } from "mysql";
import User from "../Models/user";
import { response } from "express";
import { ClientError } from "../Models/client-errors";
import userCredentials from "../Models/credentialsModel";
import jwt_helper from "../helpers/jwt_helper";
import crypto_helper from "../helpers/crypto_helper";



const addUser = async (user:User): Promise<string> => {
    
    // const errors = user.validatePost();
    // if (errors) throw new ClientError(400, errors);

    const isTaken = await isUsernameTaken(user.user_name);
    if (isTaken) {
        throw new ClientError(400, `Username ${user.user_name} already taken`);
    }

    user.password = crypto_helper.hash(user.password);
    user.id_ = uuid();

    const sql = `
    INSERT INTO user VALUES
    (DEFAULT,
    '${user.id_}',
    '${user.f_name}',
    '${user.l_name}',
    '${user.user_name}',
    '${user.password}',
     ${user.role}
    )`;

    const response: OkPacket = await dal.execute(sql);
    user.id = response.insertId;

    // delete(user[0].password);

    const token = jwt_helper.getNewToken(user);
    return token;
}


const deleteUser = async (id: number): Promise<void> => {
    const sql = `
    DELETE FROM user WHERE user.id=${id}`
    const response = await dal.execute(sql);
}

const getAllUsers = async (): Promise<User[]> => {

    const sql = `
     SELECT * FROM user
    `;
    const users = await dal.execute(sql);
    return users;
}



const loginAsync = async (credentials:userCredentials): Promise<string> => {

    const errors = credentials.validatePost();
    if (errors) throw new ClientError(400, errors);

    credentials.password = crypto_helper.hash(credentials.password);

    const sql = `
    SELECT * FROM vication.user WHERE user.password='${credentials.password}' AND user_name='${credentials.user_name}'
    `;
    const user = await dal.execute(sql)
    if(!user) throw new ClientError(401, "Incorrect username or password.");
    delete user[0].password;

    const token = jwt_helper.getNewToken(user);

    return token;
}




const getSingleUser = async (id_:string): Promise<User> => {
    const sql = `
    SELECT user FROM vication.user WHERE user.id_='${id_}'
    `;
    const user = await dal.execute(sql)
    if(!user) throw new ClientError(401, "Incorrect username");
    delete user.password;
    return user;
}

async function isUsernameTaken(username: string): Promise<boolean> {
    const sql = `SELECT COUNT(*) AS count FROM user WHERE user_name = '${username}'`;
    const table = await dal.execute(sql);
    const row = table[0];
    const count = row.count;
    return count > 0;
}

export default{
    addUser,
    getAllUsers,
    deleteUser,
    loginAsync,
    getSingleUser
}

