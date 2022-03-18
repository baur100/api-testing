// import { Request, Response, NextFunction } from 'express';
import { KJUR } from 'jsrsasign';
// import users from '../users';
// import { devPrivateKey, devPublicKey } from '../routes/keys_dev';
// import { qaPrivateKey, qaPublicKey } from '../routes/keys_qa';

const createToken = (opts, env) => {
    const header = {
        alg: 'RS256',
        typ: 'JWT',
    };
    const sHeader = JSON.stringify(header);
    const sData = JSON.stringify(opts);
    const privateKey = env === 'qa' ? qaPrivateKey : devPrivateKey;

    return KJUR.jws.JWS.sign(header.alg, sHeader, sData, privateKey);
};

const checkToken = (token, env) => {
    const publicKey = env === 'qa' ? qaPublicKey : devPublicKey;
    return KJUR.jws.JWS.verify(token, publicKey, ['RS256']);
};

const generateToken = async (req, res) => {
    return res.status(200).json({ message: 'ok' });
};
const validateToken = async (req, res) => {

    return res.status(200).json({ message: 'ok' });
};
export default { generateToken, validateToken };