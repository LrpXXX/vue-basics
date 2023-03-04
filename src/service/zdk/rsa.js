import JSEncrypt from 'jsencrypt'
import Encrypt from 'encryptlong'
import jsrsasign from "jsrsasign";

let Base64 = require('js-base64').Base64;

/**
 * 服务端公共密钥
 * @type {string}
 */
const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApmj6if9NeM+cJDQ52UCxGfyT3bOtsCQVUEj4ZZiuGAgc8i9/GjMVcuBC5VXt87xjvbyheoeq9OyML+3MFgfB9vOp6iPNSQCq0DgpOhtPSDG9+DqvdR8yBiGFcZwdfff8z66vcAO1OEw5x/mVCb+TYZYmm6MvRM/xh86m5PKzNaoTXWewUPTxBMAKFLvTme4PPMcKu+KgCCoN9Wkdq26BnBQmDdh0lXabN6CXSYVnLyazY7jLVaJIknwCzcV8ePuJv+3bmArLXvF3/1egFeU4fhKR02usu5LCqii+qoFd5YJVoizljlwoy3Nf3hZOXpLFd3yy9Gb/RHTbBwq1u4dZdQIDAQAB'

/**
 * 客户端私钥
 * @type {string}
 */
const privateKey = 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCA6MgIDFgJ4/3fKCjRpJt4pXKBFBOlOl1gzir/Lfe2C3WCvov1WEBsCzEX55XGYypPWhZe7FdDol5LBJPkARBhdZvLmrnUbLXOBZYEicGvvn2SlFrS1MCDjpna2chDsUGEGVtUa4TDYafUUhVccxjVSIvd9awla2Zjw0MUeXQzoQFP4sJvziYBPyV1zCnw8cLXsNX6Ahf8n4EiRXlHc0MJz0w2PoiJlmVXaSxmuVAP8Fl4Y/dSHtybWKbnOlRPhmnF89GIT16FNNZA4CHkaGjen9MWB2qOVxMfh9/ds8uaCri3s+j4DPJqBpdH3F/bqSVkW1gcnUzVvTg2+688QynvAgMBAAECggEABM8qb0pummfcF9A6vZ+DgVvCytgB558mzq7CYeTIIg2JY8hSFmQleyJrwXWNW+plMLKutPniQ46yL+BK2C3F+6zUlCMAndE0cyw4LZEqHbFgo/BO9yCi0gWm7chENWpOhGwhwSOFv3hMN5qcW2eb3JEpTq2Ur4yzNDObtA7X6/kfKuol+cLX65Q95Ck2Epa3lTobfXPcIVStQa+smL223GUtNlWNBLQOiQTn1Pfh8MXMS51+GCp2HrP3WbHw461N1poA/ov1J1nspghBf3GHMaLAMMEjA7u3hJDl9rsVIgdeZTyONW8VeFYVa98AqcbahU5rWWpMU5+hHGaIyT/aMQKBgQDB/TuJsGd+Pkd+wyiGNp2dATaTsvwoGI+SZiSxsnd8j8emsjH66wchiIc6uRIAK5BUQ+aT9QcvcB4/PHNVo8HSl8LjU9MRsQYBhF/pAQQDnjIZS3rWqABF632svNyzJzGwUaJcSXcSYpXJIlzmYUM63OOSBo0JxHnWfloMZ8kPaQKBgQCqHdl9putZFcVYIMbLpAyDPTlfU40MWaoZandxyU18Vcxs7CYrK+bFoessbiDh4oSOAlvp1rMhlPg6DUXVkABSgTzN5hFTFCYJMoL+Y/cfgINQF65rz9se16XWm/d2kL2OWxRvQutti08dudGBkDoecgKKvJQ3I7IUwtMkKVMblwKBgGf/GDICjhkRzkZY3ZrGIM0Q329jHudn82AqvjU9Ve1DL2dgVIcOBK6ngMese8f3ktJ57F0ZmRaHZs/D2pjox3ncvjAcuiTb4Dpj+v7w+nPuFTGWU25MdokFbER0o2Sv+GVr/jy3bcw/acmAUIl5Tw95Z87bEDVSTXb+GcxYv2MxAoGAdh5twmphJaURNqTjg8hvi7y6Fm+ME1Q64JTlRNOygq+MVuENi5JbFUTdZyc8m7tNsNEAgvg5vwqR5LUMlUH8h00HLCwgQWBPHLm+7OX6VBxGkRkwWdmkWuD/XGlFRUUw6SRipvJ/R7uf/pLkXqMHR9Z/31cbTsHxR6sTMhujghcCgYABorP8ZWXT5zPjDNGbwYYwLsSvI3xBSks2Jzqxj7qbMT8SUlJoSfnPlM3byhueacjC6WxFB/YSYdT66E+0+xVnzYb8cBZnDCIValwJy7s4FJekBVz4FWP0BZpr+s5ZDtnPZAH3wvspAT/8WbTwTmsofzANbLepdjHgQ/09UeZejA=='

/**
 * RSA
 */
export default {

  /**
   * RSA  加密
   * @param data  数据
   * @returns {*}
   */
  rsaPublicData(data) {
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(publicKey)
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    const result = jsEncrypt.encrypt(data);
    return Base64.encode(result)
  },

  /**
   * RSA 解密
   * @param data  加密数据体
   * @returns {string | false}
   */
  rsaPrivateData(data) {
    const jsEncrypt = new JSEncrypt();
    // 根据【前端】publicKey的密钥，通过【前端】privateKey解密
    jsEncrypt.setPrivateKey(privateKey)
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    let decodeData = Base64.decode(data);
    const result = jsEncrypt.decrypt(decodeData);
    return result
  },

  /* 加密 */
  encrypt(data) {
    const PUBLIC_KEY = publicKey
    const encryptor = new Encrypt();
    encryptor.setPublicKey(PUBLIC_KEY)
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    const result = encryptor.encryptLong(data)
    return result
  },
  /* 解密 - PRIVATE_KEY - 验证 */
  decrypt(data) {
    const PRIVATE_KEY = privateKey
    const encryptor = new Encrypt();
    encryptor.setPrivateKey(PRIVATE_KEY)
    // 如果是对象/数组的话，需要先JSON.stringify转换成字符串
    const result = encryptor.decryptLong(data);
    return result
  },

  /**
   * 新增签名
   * @param signData  数据
   * @returns {string}
   */
  addSignature(signData) {
    const pk = '-----BEGIN PRIVATE KEY-----' + privateKey + '-----END PRIVATE KEY-----';
    // //初始化RSAKey
    let rsa = new jsrsasign.RSAKey();
    // 读取解析pem格式的秘钥, 生成秘钥实例 (RSAKey)
    rsa = jsrsasign.KEYUTIL.getKey(pk);
    // var sig = new jsrsasign.Signature({"alg":"SHA256WithRSA", "prvkeypem": pk})
    const sig = new jsrsasign.Signature({"alg": "SHA256withRSA"});
    // 初始化
    sig.init(rsa)
    // 传入待加密字符串
    sig.updateString(signData)
    // 生成密文
    let sign = jsrsasign.hextob64(sig.sign());
    return sign;
  }


}
