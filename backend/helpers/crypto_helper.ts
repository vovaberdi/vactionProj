import crypto from 'crypto';

const salt = "108SunSunetaIons"

const hash = (plainText) =>{

    if(!plainText) return null;

    // return crypto.createHash('sha256').update(plainText).digest('hex'); // this is too easy...

    return crypto.createHmac('sha256', salt).update(plainText).digest('hex');

}

export default {
    hash
};

