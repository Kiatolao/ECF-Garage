import CryptoJS from 'crypto-js';

// création d'une clé secrète random
export const secretKey = CryptoJS.lib.WordArray.random(256/8).toString();