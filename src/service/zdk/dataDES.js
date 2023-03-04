import {Encrypt, Decrypt} from './aes';
import rsa from './rsa';

/**
 * 数据解密
 * @param data 加密数据
 * @param key 密钥
 * @returns {any}
 */
export function decryptData(data, key) {
  let decodeKey = rsa.rsaPrivateData(key);
  let deData = Decrypt(data, decodeKey, decodeKey);
  return JSON.parse(deData);
}

/**
 * 数据加密
 * @param data 数据体
 * @returns {{data, key: *}}
 */
export function encryptData(data) {
  let dataString = JSON.stringify(data);
  let key = RandomId(16);
  let sig = rsa.addSignature(dataString);
  let dataSign = JSON.stringify({sign: sig, data: dataString});
  let enData = Encrypt(dataSign, key, key);
  let encryptionKey = rsa.rsaPublicData(key);
  return {data: enData, key: encryptionKey};
}

/**
 * 随机16位数
 * @param n 位数
 * @returns 16位随机数
 * @constructor
 */
function RandomId(n) {
  let str = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let res = '';
  for (let i = 0; i < n; i++) {
    res += str[Math.ceil(Math.random() * (str.length - 1))];
  }
  return res;
};
