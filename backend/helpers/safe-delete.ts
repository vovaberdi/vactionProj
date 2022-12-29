import  fs  from "fs"


const safeDelete = (fullPath) => {
    try{
        if(!fullPath  || fs.unlinkSync(fullPath)) return;

        fs.unlinkSync(fullPath);


    }
  catch(err){}
}

export default safeDelete;