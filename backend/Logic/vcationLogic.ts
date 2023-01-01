import fs from 'fs';    
import {v4 as uuid} from "uuid";
import dal from "../Utils/dal_mysql"
import { OkPacket } from "mysql";
import Vication from "../Models/vication";
import safeDelete from '../helpers/safe-delete';
import VicationToLike from '../Models/VicationToLike';


const getAllVications = async (): Promise<Vication[]> => {
    const sql = `SELECT * FROM vication ORDER BY start_date`;
    const vication = await dal.execute(sql);
    return vication;
}



const addVication = async (vication:Vication): Promise<Vication> => {
    console.log(vication);
    const extension = vication.image.name.substring(vication.image.name.lastIndexOf('.'));
    vication.imageName = uuid() + extension;
    await vication.image.mv("./images/" + vication.imageName);
    delete vication.image;
  
    const sql = `
    INSERT INTO vication VALUES
    (DEFAULT,
    '${vication.description}',
    '${vication.destenation}',
    '${vication.imageName}',
    '${vication.start_date}',
    '${vication.end_date}',
    '${vication.price}',
    ${vication.followers}
    )`;
    

    const response: OkPacket = await dal.execute(sql);
    vication.id = response.insertId;
    return vication;
}


const deleteVication= async (id: number): Promise<void> => {
    const sql = `
    DELETE FROM vication WHERE id=${id}`
    const response = await dal.execute(sql);
}

const updatedVication = async (vication: Vication) => {

    if(vication.image){

        safeDelete("./images/" + vication.imageName);
        const extension = vication.image.name.substring(vication.image.name.lastIndexOf('.'));
        vication.imageName = uuid() + extension;
        await vication.image.mv("./images/" + vication.imageName);
    }

        const sql = 
        `UPDATE vication.vication SET description = '${vication.description}', 
         destenation = '${vication.destenation}', imageName = '${vication.imageName}',
         start_date = '${vication.start_date}', end_date = '${vication.end_date}', price = 
         '${vication.price}' WHERE id = ${vication.id}`;

         delete vication.image;
    
    await dal.execute(sql);
    return vication;
  };


const getSingleVication = async (id:number): Promise<Vication[]> => {
    const sql = `
    SELECT * FROM vication WHERE vication.id=${id}
        `;

    const user = await dal.execute(sql);
    return user;
}

const addLike = async (like:VicationToLike): Promise<VicationToLike> => {
    const sql = `
    INSERT INTO vication.vication_likes VALUES
    (DEFAULT,
    '${like.user_name}',
     ${like.vication_id}
    )`;

    const response: OkPacket = await dal.execute(sql);
    like.id = response.insertId;
    return like;
}

const deleteLike= async (id: number): Promise<void> => {
    const sql = `
    DELETE FROM vication.vication_likes WHERE vication_id=${id}`
    const response = await dal.execute(sql);
}

const getAllLikes = async (user): Promise<VicationToLike[]> => {
    const sql = `SELECT vication_id FROM vication.vication_likes WHERE user_name='${user}'`;
    const vicationsLikes = await dal.execute(sql);
    return vicationsLikes;
}

const addFollower = async (vication_id:VicationToLike): Promise<VicationToLike> => {
    const sql = 
    `UPDATE vication.vication SET followers = + 1 WHERE id = ${vication_id}`;
    await dal.execute(sql);
    return vication_id;
}


export default{
getAllVications,
getSingleVication,
addVication,
deleteVication,
updatedVication,
addLike,
deleteLike,
getAllLikes,
addFollower
}
